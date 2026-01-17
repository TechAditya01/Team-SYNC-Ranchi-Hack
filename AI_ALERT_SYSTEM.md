# AI Alert System Documentation

## Overview
The AI Alert System automatically generates concise, actionable civic alerts using Gemini AI and displays them prominently in the citizen dashboard.

## Features

### 1. **AI-Generated Alerts**
- Uses Gemini 2.0 Flash to create short, clear civic alerts
- Automatically selects appropriate emojis (🚧 🔥 💧 🗑️ ⚠️)
- Includes location, time estimates, and action words
- Maximum 100 characters for quick reading

### 2. **Automatic Alert Creation**
- Triggered when admin accepts a report
- No human intervention required
- Analyzes report data and generates relevant alert

### 3. **Manual Broadcast**
- Admins can create custom alerts
- Option to use AI-generated message or write custom
- Broadcast to all citizens instantly

### 4. **Smart Display**
- Urgency-based color coding (High: Red, Medium: Orange, Low: Blue)
- Dismissible by users
- Auto-polls for new alerts every 30 seconds
- Tracks view counts

## Architecture

### Backend Components

#### 1. Alert Service (`backend/services/alertService.js`)
```javascript
exports.generateCivicAlert(reportData)
```
- Generates AI alert from report data
- Returns: emoji, title, message, urgency, category, affectedArea, estimatedTime

#### 2. Alert Controller (`backend/controllers/alertController.js`)
- `createAutoAlert()` - Automatic alert when report accepted
- `createManualAlert()` - Admin broadcast
- `getActiveAlerts()` - Fetch all active alerts
- `dismissAlert()` - User dismisses alert
- `incrementViewCount()` - Track views

#### 3. Alert Routes (`backend/routes/alertRoutes.js`)
- `POST /api/alerts/auto` - Create automatic alert
- `POST /api/alerts/broadcast` - Manual broadcast
- `GET /api/alerts/active` - Get active alerts
- `POST /api/alerts/dismiss` - Dismiss alert
- `POST /api/alerts/view` - Track view

### Frontend Components

#### 1. Alert Banner (`frontend/src/components/AlertBanner.jsx`)
- Displays active alerts at top of dashboard
- Urgency-based styling
- Dismiss functionality
- Auto-refresh every 30 seconds

## Database Structure

### Firebase Realtime Database
```
alerts/
  ├── {alertId}/
  │   ├── id: string
  │   ├── reportId: string
  │   ├── emoji: string
  │   ├── title: string
  │   ├── message: string
  │   ├── urgency: "high" | "medium" | "low"
  │   ├── category: string
  │   ├── affectedArea: string
  │   ├── estimatedTime: string | null
  │   ├── department: string
  │   ├── location: object
  │   ├── createdAt: ISO string
  │   ├── createdBy: "system" | "admin" | userId
  │   ├── status: "active" | "inactive"
  │   ├── viewCount: number
  │   └── dismissedBy: [userId1, userId2, ...]
```

## Usage Examples

### Automatic Alert Creation
```javascript
// Triggered when admin accepts report
POST /api/alerts/auto
{
  "reportId": "report123"
}

// Response
{
  "message": "Alert created successfully",
  "alert": {
    "id": "alert456",
    "emoji": "🚧",
    "title": "Road Closure",
    "message": "🚧 Road closed near MG Road till 6 PM - Use alternate route",
    "urgency": "high",
    ...
  }
}
```

### Manual Broadcast
```javascript
// Admin creates custom alert
POST /api/alerts/broadcast
{
  "reportId": "report123",
  "customMessage": "🔥 Emergency: Fire at Sector 5 - Stay away",
  "adminId": "admin789"
}
```

### Fetch Active Alerts
```javascript
GET /api/alerts/active

// Response
{
  "alerts": [
    {
      "id": "alert456",
      "emoji": "🚧",
      "title": "Road Closure",
      "message": "🚧 Road closed near MG Road till 6 PM",
      ...
    }
  ]
}
```

## AI Prompt Structure

```
REPORT DATA:
- Issue Type: Pothole
- Location: MG Road, Sector 12
- Severity: High
- Description: Large pothole causing traffic jam
- Department: Roads & Transport
- Status: Accepted

RULES:
1. Keep alert under 100 characters
2. Start with relevant emoji
3. Include location name (short form)
4. Include time estimate if applicable
5. Use action words
6. Be specific but concise

EXAMPLES:
- "🚧 Road closed near MG Road till 6 PM - Use alternate route"
- "🔥 Fire reported at Sector 5 - Emergency services on site"

RETURN JSON:
{
  "emoji": "🚧",
  "title": "Road Closure",
  "message": "🚧 Road closed near MG Road till 6 PM - Use alternate route",
  "urgency": "high",
  "category": "roads",
  "affectedArea": "MG Road",
  "estimatedTime": "6 PM"
}
```

## Alert Examples

### High Urgency (Red)
```
🔥 Fire at Sector 5 - Emergency services on site
⚠️ Gas leak reported near Mall Road - Evacuate area
🚨 Accident on Highway 12 - Expect delays
```

### Medium Urgency (Orange)
```
🚧 Road closed near MG Road till 6 PM - Use alternate route
💧 Water supply disrupted in Block A - Restoration by 8 PM
🗑️ Garbage collection delayed in Zone 3 - Rescheduled to tomorrow
```

### Low Urgency (Blue)
```
ℹ️ Scheduled maintenance at Park Street tomorrow 9 AM - 12 PM
📢 Community meeting on Saturday 5 PM at Town Hall
🔧 Streetlight repair in progress - Completion by evening
```

## Integration Points

### 1. Report Acceptance Flow
```
Admin accepts report
  ↓
Trigger automatic alert creation
  ↓
AI generates alert message
  ↓
Save to Firebase
  ↓
Citizens see alert on dashboard
```

### 2. Manual Broadcast Flow
```
Admin clicks "Broadcast Alert"
  ↓
Enters custom message (optional)
  ↓
AI generates or uses custom message
  ↓
Save to Firebase
  ↓
Citizens see alert immediately
```

### 3. Citizen View Flow
```
Citizen opens dashboard
  ↓
AlertBanner fetches active alerts
  ↓
Displays alerts with urgency styling
  ↓
Citizen can dismiss or view details
  ↓
View count incremented
```

## Styling

### Urgency Colors
- **High**: Red background, red border, red icon
- **Medium**: Orange background, orange border, orange icon
- **Low**: Blue background, blue border, blue icon

### Dark Mode Support
- All colors have dark mode variants
- Proper contrast for accessibility

## Future Enhancements

1. **Push Notifications**: Send browser/mobile notifications
2. **Location-Based Filtering**: Show alerts only for user's area
3. **Alert Categories**: Filter by department/category
4. **Alert History**: View past alerts
5. **Alert Analytics**: Track engagement metrics
6. **Multi-language Support**: Alerts in local languages
7. **Voice Alerts**: Text-to-speech for accessibility
8. **SMS Integration**: Send critical alerts via SMS

## Testing

### Test Automatic Alert
1. Create a report
2. Admin accepts the report
3. Call `POST /api/alerts/auto` with reportId
4. Check citizen dashboard for alert

### Test Manual Broadcast
1. Admin opens report details
2. Clicks "Broadcast Alert"
3. Enters custom message or uses AI
4. Alert appears on all citizen dashboards

### Test Dismiss
1. Citizen sees alert
2. Clicks X button
3. Alert disappears
4. Alert doesn't reappear on refresh

## Troubleshooting

### Alerts not showing
- Check if alerts exist in Firebase
- Verify API endpoint is accessible
- Check browser console for errors
- Ensure AlertBanner is imported in Dashboard

### AI generation failing
- Check Vertex AI credentials
- Verify GCP_PROJECT_ID in .env
- Check backend logs for AI errors
- Fallback alert should still be created

### Dismiss not working
- Check userId is being sent
- Verify Firebase write permissions
- Check network tab for API call

## API Reference

See individual endpoint documentation in:
- `backend/controllers/alertController.js`
- `backend/routes/alertRoutes.js`
