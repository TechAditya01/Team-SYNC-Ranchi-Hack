# Department-Specific Report Filtering

## Overview
The system now correctly filters reports by department, ensuring that each department (Fire & Safety, Roads & Transport, Municipal/Waste, etc.) only sees reports assigned to their specific department.

## How It Works

### **1. Report Submission**
When a report is submitted (via website or WhatsApp):
- AI automatically analyzes the image/video/audio
- AI determines the appropriate department based on the issue type
- Report is saved to:
  - Main reports node: `/reports/{reportId}`
  - Department-specific node: `/reports/by_department/{department}/{reportId}`

### **2. Department Assignment**
The AI classifies issues and assigns departments:

| Issue Type | Department |
|------------|-----------|
| Fire, Smoke, Burning | **Fire & Safety** |
| Pothole, Road Damage | **Roads & Transport** |
| Garbage, Waste | **Municipal/Waste** |
| Water Leak, Pipe Burst | **Water Supply** |
| Power Outage, Broken Light | **Electricity Board** |
| Traffic Jam, Accident | **Traffic** |
| Medical Emergency | **Medical/Ambulance** |
| Crime, Safety Issue | **Police** |

### **3. Admin Dashboard Filtering**

#### **Frontend (Dashboard.jsx)**
```javascript
// Lines 55-59
const sanitizedDept = sanitizeKey(currentUser.department);
const deptReportsRef = ref(db, `reports/by_department/${sanitizedDept}`);

// Lines 65-67
const res = await fetch(
  `${API_BASE_URL}/api/reports/department/${encodeURIComponent(currentUser.department)}`
);
```

#### **Backend (reportController.js)**
```javascript
// Lines 283-297
exports.getDepartmentReports = async (req, res) => {
    const { department } = req.params;
    const sanitizedDept = sanitizeKey(department);
    const deptRef = db.ref(`reports/by_department/${sanitizedDept}`);
    // Returns only reports for this department
};
```

### **4. Real-Time Updates**
- **Firebase Realtime Database**: Listens to department-specific path
- **API Fallback**: Fetches department-specific reports if RTDB is blocked
- **Automatic Sync**: New reports automatically appear in correct department dashboard

## Example Scenario

### **Fire & Safety Report**
1. User uploads image of building fire
2. AI analyzes: "Fire detected with High severity"
3. AI assigns: `department: "Fire & Safety"`
4. Report saved to:
   - `/reports/abc123`
   - `/reports/by_department/Fire___Safety/abc123`
5. **Fire & Safety dashboard** sees this report
6. **Other departments** (Roads, Municipal, etc.) do NOT see this report

### **Roads & Transport Report**
1. User uploads image of pothole
2. AI analyzes: "Pothole detected with Medium severity"
3. AI assigns: `department: "Roads & Transport"`
4. Report saved to:
   - `/reports/xyz789`
   - `/reports/by_department/Roads___Transport/xyz789`
5. **Roads & Transport dashboard** sees this report
6. **Other departments** (Fire, Municipal, etc.) do NOT see this report

## Database Structure

```
reports/
├── abc123/                          # Main report node
│   ├── id: "abc123"
│   ├── type: "Fire"
│   ├── department: "Fire & Safety"
│   ├── status: "Pending"
│   └── ...
│
├── xyz789/                          # Main report node
│   ├── id: "xyz789"
│   ├── type: "Pothole"
│   ├── department: "Roads & Transport"
│   ├── status: "Pending"
│   └── ...
│
└── by_department/
    ├── Fire___Safety/               # Fire & Safety reports only
    │   └── abc123/
    │       ├── id: "abc123"
    │       ├── type: "Fire"
    │       └── ...
    │
    └── Roads___Transport/           # Roads & Transport reports only
        └── xyz789/
            ├── id: "xyz789"
            ├── type: "Pothole"
            └── ...
```

## Key Functions

### **sanitizeKey()**
Converts department names to Firebase-safe keys:
- `"Fire & Safety"` → `"Fire___Safety"`
- `"Roads & Transport"` → `"Roads___Transport"`
- `"Municipal/Waste"` → `"Municipal_Waste"`

### **Department Filtering Logic**
```javascript
// Frontend: Only listen to department-specific path
const deptReportsRef = ref(db, `reports/by_department/${sanitizedDept}`);

// Backend: Only fetch department-specific reports
const deptRef = db.ref(`reports/by_department/${sanitizedDept}`);
```

## Benefits

1. **Data Isolation**: Each department only sees relevant reports
2. **Performance**: Smaller dataset = faster loading
3. **Security**: Departments can't access other departments' data
4. **Scalability**: Easy to add new departments
5. **Real-Time**: Instant updates for new reports
6. **Accurate Stats**: Dashboard stats reflect only department-specific data

## Testing

To verify department filtering:

1. **Submit Fire Report**:
   - Upload image of fire
   - Check Fire & Safety dashboard → Should appear
   - Check Roads dashboard → Should NOT appear

2. **Submit Pothole Report**:
   - Upload image of pothole
   - Check Roads & Transport dashboard → Should appear
   - Check Fire & Safety dashboard → Should NOT appear

3. **Check Console Logs**:
   ```
   [ADMIN DASHBOARD] Listening to department: Fire & Safety (Fire___Safety)
   [ADMIN DASHBOARD] Fetching from API for department: Fire & Safety
   [ADMIN DASHBOARD] Received 5 reports for Fire & Safety
   ```

## Troubleshooting

### **Issue: Department seeing all reports**
**Solution**: Check that:
- `currentUser.department` is correctly set
- API endpoint uses `/department/{dept}` not `/reports`
- Firebase path uses `by_department/{dept}` not `reports`

### **Issue: No reports showing**
**Solution**: Check that:
- Reports are being saved to `by_department` node
- Department name matches exactly (case-sensitive)
- `sanitizeKey()` is applied consistently

## Future Enhancements

1. **Multi-Department Reports**: Some issues may need multiple departments
2. **Department Hierarchy**: Sub-departments or teams
3. **Cross-Department Collaboration**: Share specific reports
4. **Department Analytics**: Track performance per department
