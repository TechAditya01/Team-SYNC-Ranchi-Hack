# Enhanced AI Event Detection & Image Analysis System

## Overview
The system now features **comprehensive automatic event detection and detailed image analysis** using Vertex AI and Gemini 2.0 Flash for both website and WhatsApp submissions. This goes beyond simple issue detection to provide a complete visual overview and contextual understanding of every submission.

## Key Features

### 1. **Comprehensive Image Overview & Visual Analysis**

#### **Scene Description**
- Complete description of the entire scene
- Background, foreground, and surrounding elements
- Contextual understanding of the environment

#### **Visual Composition Analysis**
- **Framing**: Close-up, Medium, or Wide shot
- **Angle**: Eye-level, High angle, or Low angle
- **Perspective**: Straight-on, Angled, or Bird's eye view
- **Focal Point**: What draws attention in the image

#### **Colors & Lighting Assessment**
- **Dominant Colors**: Array of main colors visible
- **Lighting Condition**: Bright, Dim, Natural, or Artificial
- **Shadows**: Present/Absent, Harsh/Soft
- **Overall Brightness**: Dark, Normal, Bright, or Overexposed

#### **Environmental Context**
- **Setting**: Urban, Suburban, or Rural
- **Location Type**: Street, Highway, Residential, Commercial, Industrial, Park
- **Indoor/Outdoor**: Classification
- **Weather Condition**: Clear, Cloudy, Rainy, Foggy, or Unknown

#### **Time & Location Characteristics**
- **Time Estimation**: Morning, Afternoon, Evening, Night, Dawn, or Dusk
- **Location Characteristics**: Detailed description of area type
- **Visible Text/Signs**: Any text, signs, landmarks, or identifiable markers
- **People & Vehicles**: Presence detection, movement, crowd level

#### **Media Quality Assessment**
- **Resolution**: Low, Medium, or High
- **Clarity**: Blurry, Acceptable, or Sharp
- **Noise Level**: High, Medium, Low, or None
- **Camera Quality**: Poor, Average, Good, or Professional

### 2. **Detailed Issue Analysis**

#### **Issue Visibility & Scale**
- **Visibility Score**: 0-100% how clearly the problem is visible
- **Issue Size**: Approximate dimensions or extent
- **Severity Indicators**: Visual cues showing severity (cracks, damage extent, etc.)
- **Surrounding Impact**: How the issue affects the surrounding area

#### **Temporal Analysis**
- **Age of Issue**: Recent, Days old, Weeks old, or Long-standing
- **Before/After Indicators**: Signs of recent damage or deterioration
- **Comparative Context**: Size relative to known objects (person, vehicle, etc.)

#### **Visual Evidence**
- Array of specific visual evidence points
- Detailed documentation of damage indicators
- Contextual markers for verification

### 3. **Automatic Event Detection**
- **Primary Event Identification**: Detects the main civic issue
- **Event Type Classification**: Infrastructure Damage, Public Safety, Environmental, Health Hazard, Emergency
- **Secondary Issue Detection**: Identifies additional problems visible
- **Root Cause Analysis**: Possible causes (wear, accident, weather, etc.)
- **Comprehensive Description**: Detailed analysis of what is detected

### 4. **Advanced Classification System**

#### **Authenticity Verification**
- Rejects stock photos, staged scenes, AI-generated content
- Validates genuine citizen-captured media
- Assesses photo metadata (camera artifacts, compression, natural lighting)
- Quality assessment and timestamp estimation

#### **Detailed Categorization**
- **Primary Category**: Road, Garbage, Water, Electricity, Noise, Traffic, Fire, Medical, Police, Other
- **Sub-Category**: Specific issue type (Pothole, Broken Streetlight, Water Leak, etc.)
- **Severity Levels**: Low, Medium, High, Critical
- **Urgency Classification**: Immediate, Within 24hrs, Within Week, Routine
- **Infrastructure Assessment**: Identifies damaged/affected infrastructure
- **Risk Analysis**: Safety hazards, health risks, environmental impact
- **Impact Estimation**: Area and number of people affected

### 5. **Smart Department Routing**
- **Primary Department Assignment**: Automatically routes to correct department
- **Secondary Department**: Identifies if multiple departments needed
- **Escalation Logic**: Determines if immediate escalation required with reasoning

### 6. **Actionable Insights**
- **Immediate Actions**: Recommended steps to take
- **Resolution Time Estimate**: Predicted time to resolve
- **Required Resources**: Equipment and personnel needed
- **Priority Scoring**: 1-5 scale for prioritization

### 7. **Confidence Metrics**
- **Overall Confidence**: 0-100 score
- **Detection Accuracy**: How accurate the detection is
- **Classification Reliability**: Confidence in categorization

## Implementation

### **For Website Submissions**
- Endpoint: `POST /api/reports/verify-image`
- Uses enhanced `verifyReportImage` function in `reportController.js`
- Returns comprehensive JSON with all detection and visual analysis details

### **For WhatsApp Submissions**
- Uses enhanced `analyzeMedia` function in `aiService.js`
- Supports images, videos, and audio
- Automatic processing when media is received

## Complete Response Structure

```json
{
  "verified": true,
  "imageOverview": {
    "sceneDescription": "Urban street scene showing a damaged road surface in the center of the frame. Background shows residential buildings and parked vehicles. Foreground shows asphalt with visible cracks.",
    "primaryObjects": [
      "Damaged road surface",
      "Asphalt pavement",
      "Residential buildings",
      "Parked cars",
      "Street markings"
    ],
    "visualComposition": {
      "framing": "Medium shot",
      "angle": "Eye-level",
      "perspective": "Straight-on",
      "focalPoint": "Large pothole in center of road"
    },
    "colorsAndLighting": {
      "dominantColors": ["Gray", "Black", "Brown", "White"],
      "lightingCondition": "Natural",
      "shadows": "Present",
      "overallBrightness": "Normal"
    },
    "environmentalContext": {
      "setting": "Urban",
      "locationType": "Residential Street",
      "indoorOutdoor": "Outdoor",
      "weatherCondition": "Clear"
    },
    "timeEstimation": "Afternoon",
    "locationCharacteristics": "Residential area with moderate traffic, lined with multi-story buildings and street parking",
    "visibleTextSigns": ["Street name sign", "No parking zone marking"],
    "peopleVehicles": {
      "peoplePresent": false,
      "vehiclesPresent": true,
      "movementDetected": false,
      "crowdLevel": "None"
    },
    "mediaQuality": {
      "resolution": "Medium",
      "clarity": "Acceptable",
      "noise": "Low",
      "cameraQuality": "Average"
    }
  },
  "detailedIssueAnalysis": {
    "issueVisibility": 95,
    "issueSize": "Approximately 2 feet wide, 6 inches deep",
    "severityIndicators": [
      "Deep crater in road surface",
      "Exposed base layer",
      "Cracked edges extending outward",
      "Debris accumulation"
    ],
    "surroundingImpact": "Forces vehicles to swerve, creating traffic hazard. Adjacent asphalt showing stress cracks.",
    "ageOfIssue": "Weeks old",
    "comparativeContext": "Pothole is roughly the size of a car tire, deep enough to cause vehicle damage",
    "visualEvidence": [
      "Visible depth of crater",
      "Weathered edges indicating age",
      "Accumulated water/debris",
      "Surrounding pavement deterioration"
    ]
  },
  "authenticity": {
    "isReal": true,
    "rejectionReason": null,
    "imageQuality": "Medium",
    "timestamp": "Day/Recent",
    "photoMetadata": "Natural"
  },
  "eventDetection": {
    "primaryEvent": "Large pothole on residential street",
    "eventType": "Infrastructure",
    "secondaryIssues": ["Surrounding pavement cracks", "Road marking damage"],
    "eventDescription": "Deep pothole approximately 2 feet wide causing significant traffic hazard on residential street",
    "rootCauseAnalysis": "Likely caused by water infiltration and freeze-thaw cycles, exacerbated by heavy traffic"
  },
  "classification": {
    "category": "Road",
    "subCategory": "Pothole",
    "severity": "High",
    "urgency": "Within 24hrs",
    "affectedInfrastructure": "Main road surface",
    "potentialRisks": [
      "Vehicle damage",
      "Accident risk",
      "Traffic congestion",
      "Further pavement deterioration"
    ],
    "estimatedImpact": "Major residential road affecting 500+ vehicles daily"
  },
  "departmentRouting": {
    "primaryDepartment": "Roads & Transport",
    "secondaryDepartment": null,
    "escalationRequired": false,
    "escalationReason": null
  },
  "actionableInsights": {
    "immediateActions": [
      "Place warning signs around pothole",
      "Barricade affected lane",
      "Schedule emergency repair crew",
      "Notify traffic management"
    ],
    "estimatedResolutionTime": "24-48 hours",
    "requiredResources": [
      "Road repair crew (3-4 workers)",
      "Asphalt mix (2-3 bags)",
      "Traffic cones and barriers",
      "Compaction equipment"
    ],
    "priority": 4
  },
  "confidence": {
    "overall": 95,
    "detectionAccuracy": 98,
    "classificationReliability": 92
  },
  "detected_issue": "Large Pothole - Residential Street",
  "explanation": "ACCEPTED: Genuine photograph showing significant road damage requiring immediate attention. Clear visual evidence of deep pothole with surrounding pavement deterioration.",
  "department": "Roads & Transport",
  "ai_confidence": 95
}
```

## Benefits

1. **Complete Visual Understanding**: Not just issue detection, but full scene comprehension
2. **Better Context**: Environmental and temporal context helps prioritize and plan
3. **Quality Verification**: Detailed quality assessment ensures genuine reports
4. **Enhanced Documentation**: Rich visual data for records and analytics
5. **Improved Routing**: Better department assignment with full context
6. **Resource Planning**: Detailed analysis helps departments prepare accurately
7. **Faster Response**: Comprehensive data enables quicker decision-making
8. **Data Insights**: Rich metadata enables advanced analytics and pattern recognition

## AI Model
- **Model**: Gemini 2.0 Flash (gemini-2.0-flash-001)
- **Provider**: Google Vertex AI
- **Capabilities**: Multimodal (Image, Video, Audio, Text) with advanced visual understanding
- **Speed**: Optimized for fast response times
- **Accuracy**: High confidence scoring with detailed reliability metrics

## Logging
The system logs comprehensive analysis details:
```
[AI EVENT DETECTION]: {
  verified: true,
  event: 'Large pothole on residential street',
  category: 'Road',
  severity: 'High',
  department: 'Roads & Transport',
  urgency: 'Within 24hrs',
  sceneDescription: 'Urban street scene showing damaged road...',
  issueVisibility: 95
}
```

## Use Cases

### **For Citizens**
- Automatic detailed analysis of their submissions
- No need to describe the issue in detail
- Faster processing and response

### **For Administrators**
- Complete visual context for decision-making
- Better understanding of issue severity and impact
- Improved resource allocation

### **For Departments**
- Detailed information for planning repairs
- Visual evidence for verification
- Context for prioritization

## Future Enhancements
- Historical pattern recognition using visual data
- Similar incident detection based on visual similarity
- Predictive maintenance using visual deterioration analysis
- Multi-language support for text/sign detection
- Real-time video stream analysis with frame-by-frame tracking
- 3D reconstruction from multiple angles
- Damage progression tracking over time
