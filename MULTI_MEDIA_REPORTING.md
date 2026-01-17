# Multi-Media Reporting System Implementation Guide

## Overview
This guide documents the implementation of video and audio support in the reporting system, extending beyond just images.

## Current Implementation Status

### ✅ Completed
1. **Frontend State Management** - Added states for video and audio files
2. **Icon Imports** - Added Video and Mic icons from lucide-react
3. **Upload Handlers** - Created handleVideoUpload and handleAudioUpload functions
4. **File Validation** - Added size and type validation for video (50MB max) and audio (10MB max)

### 🔄 Remaining Implementation

## Frontend Changes Needed

### 1. Update handleSubmit Function
Location: `frontend/src/pages/civic/ReportIssue.jsx` (around line 395)

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let mediaUrl = null;
        let mediaType = 'image'; // default

        // Upload based on media type
        if (imageFile) {
            mediaUrl = await uploadImage(imageFile, 'civic-reports');
            mediaType = 'image';
        } else if (videoFile) {
            mediaUrl = await uploadVideo(videoFile, 'civic-reports'); // New function needed
            mediaType = 'video';
        } else if (audioFile) {
            mediaUrl = await uploadAudio(audioFile, 'civic-reports'); // New function needed
            mediaType = 'audio';
        }

        const reportData = {
            type: category || 'General',
            department: department,
            description: e.target.description.value,
            location: location,
            userId: auth.currentUser?.uid,
            userEmail: auth.currentUser?.email,
            userName: auth.currentUser?.displayName,
            status: 'Pending',
            priority: aiResult?.severity || 'Medium',
            aiAnalysis: aiResult?.detected || '',
            aiConfidence: aiResult?.confidence || '0%',
            mediaUrl: mediaUrl,  // Changed from imageUrl
            mediaType: mediaType, // NEW: Track media type
            timestamp: new Date().toISOString(),
            // Add comprehensive AI analysis
            imageOverview: aiResult?.imageOverview,
            detailedIssueAnalysis: aiResult?.detailedIssueAnalysis,
            eventDetection: aiResult?.eventDetection,
            classification: aiResult?.classification,
            departmentRouting: aiResult?.departmentRouting,
            actionableInsights: aiResult?.actionableInsights,
            transcription: aiResult?.transcription // For audio
        };

        const result = await submitReportToBackend(reportData);
        
        if (result.reportId) {
            setSubmittedReportId(result.reportId);
            setShowSuccessPopup(true);
            
            // Auto-redirect after 3 seconds
            setTimeout(() => {
                navigate('/civic/my-reports');
            }, 3000);
        }
    } catch (error) {
        console.error('Submit Error:', error);
        toast.error('Failed to submit report');
    }
};
```

### 2. Update Upload UI Section
Location: `frontend/src/pages/civic/ReportIssue.jsx` (around line 480)

```jsx
{/* Upload Evidence Section */}
<div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Upload Evidence</h2>
    
    {/* Media Type Selector */}
    <div className="grid grid-cols-3 gap-4 mb-6">
        <button
            type="button"
            onClick={() => document.getElementById('image-upload').click()}
            className={`p-4 rounded-lg border-2 transition-all ${
                mediaType === 'image' 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
        >
            <Camera size={32} className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Photo</p>
        </button>

        <button
            type="button"
            onClick={() => document.getElementById('video-upload').click()}
            className={`p-4 rounded-lg border-2 transition-all ${
                mediaType === 'video' 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
        >
            <Video size={32} className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Video</p>
        </button>

        <button
            type="button"
            onClick={() => document.getElementById('audio-upload').click()}
            className={`p-4 rounded-lg border-2 transition-all ${
                mediaType === 'audio' 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
        >
            <Mic size={32} className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Audio</p>
        </button>
    </div>

    {/* Hidden File Inputs */}
    <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
    />
    <input
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
    />
    <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="hidden"
    />

    {/* Preview Section */}
    {selectedImage && mediaType === 'image' && (
        <div className="relative h-[500px] rounded-lg overflow-hidden border">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            {/* ... existing AI analysis overlay ... */}
        </div>
    )}

    {selectedVideo && mediaType === 'video' && (
        <div className="relative h-[500px] rounded-lg overflow-hidden border">
            <video src={selectedVideo} controls className="w-full h-full object-cover" />
            {/* ... AI analysis overlay ... */}
        </div>
    )}

    {selectedAudio && mediaType === 'audio' && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-8 border">
            <div className="flex flex-col items-center gap-4">
                <Mic size={64} className="text-blue-600 dark:text-blue-400" />
                <audio src={selectedAudio} controls className="w-full" />
                {aiResult?.transcription && (
                    <div className="w-full mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                        <h4 className="font-bold text-sm mb-2">Transcription:</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {aiResult.transcription}
                        </p>
                    </div>
                )}
            </div>
            {/* ... AI analysis overlay ... */}
        </div>
    )}
</div>
```

## Backend Changes Needed

### 1. Update storageService.js
Location: `frontend/src/services/storageService.js`

```javascript
// Add video upload function
export const uploadVideo = async (file, folder) => {
    try {
        const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Video upload failed:', error);
        throw error;
    }
};

// Add audio upload function
export const uploadAudio = async (file, folder) => {
    try {
        const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Audio upload failed:', error);
        throw error;
    }
};
```

### 2. Update reportController.js
Location: `backend/controllers/reportController.js`

Add video and audio analysis support in `verifyReportImage`:

```javascript
exports.verifyReportImage = async (req, res) => {
    const { imageBase64, type, mediaType } = req.body; // Add mediaType

    if (!imageBase64) return res.status(400).json({ error: "No media provided" });

    try {
        let analysis;

        if (mediaType === 'video') {
            // Extract first frame or analyze video
            analysis = await analyzeVideo(imageBase64);
        } else if (mediaType === 'audio') {
            // Transcribe and analyze audio
            analysis = await analyzeAudio(imageBase64);
        } else {
            // Existing image analysis
            analysis = await analyzeImage(imageBase64);
        }

        res.status(200).json({ analysis });
    } catch (error) {
        console.error("[AI ERROR]", error);
        res.status(500).json({ error: "AI Verification Failed" });
    }
};
```

### 3. Update aiService.js
Location: `backend/services/aiService.js`

```javascript
// Add video analysis
exports.analyzeVideo = async (base64Data) => {
    // Gemini can analyze video directly
    const mimeType = 'video/mp4'; // Detect from base64
    const request = {
        contents: [{
            role: 'user',
            parts: [
                { text: VIDEO_ANALYSIS_PROMPT },
                { inlineData: { mimeType, data: base64Data } }
            ]
        }]
    };

    const result = await generativeModel.generateContent(request);
    return parseResponse(result.response);
};

// Add audio analysis with transcription
exports.analyzeAudio = async (base64Data) => {
    // Gemini can transcribe and analyze audio
    const mimeType = 'audio/mp3'; // Detect from base64
    const request = {
        contents: [{
            role: 'user',
            parts: [
                { text: AUDIO_ANALYSIS_PROMPT },
                { inlineData: { mimeType, data: base64Data } }
            ]
        }]
    };

    const result = await generativeModel.generateContent(request);
    const analysis = parseResponse(result.response);
    
    // Add transcription to response
    analysis.transcription = analysis.transcription || "Audio transcribed";
    
    return analysis;
};
```

## WhatsApp Integration

### Update whatsappController.js
Location: `backend/controllers/whatsappController.js`

The WhatsApp controller already supports media (images, videos, audio). Update to use the new analysis functions:

```javascript
// In handleIncomingMessage
if (message.type === 'video') {
    const videoUrl = message.video.link;
    const videoData = await downloadMedia(videoUrl);
    const analysis = await analyzeVideo(videoData);
    // ... create report
}

if (message.type === 'audio' || message.type === 'voice') {
    const audioUrl = message.audio?.link || message.voice?.link;
    const audioData = await downloadMedia(audioUrl);
    const analysis = await analyzeAudio(audioData);
    // ... create report with transcription
}
```

## Admin Dashboard Updates

### Update Dashboard.jsx
Location: `frontend/src/pages/admin/Dashboard.jsx`

Display media type indicator:

```jsx
{report.mediaType === 'video' && <Video size={16} className="text-blue-600" />}
{report.mediaType === 'audio' && <Mic size={16} className="text-blue-600" />}
{report.mediaType === 'image' && <Camera size={16} className="text-blue-600" />}
```

### Update IncidentDetail.jsx
Location: `frontend/src/pages/admin/IncidentDetail.jsx`

```jsx
{/* Media Display */}
{report.mediaType === 'image' && (
    <img src={report.mediaUrl} alt="Evidence" />
)}

{report.mediaType === 'video' && (
    <video src={report.mediaUrl} controls />
)}

{report.mediaType === 'audio' && (
    <div>
        <audio src={report.mediaUrl} controls />
        {report.transcription && (
            <div className="mt-4">
                <h4>Transcription:</h4>
                <p>{report.transcription}</p>
            </div>
        )}
    </div>
)}
```

## Testing Checklist

### Frontend Testing
- [ ] Upload image - verify preview and AI analysis
- [ ] Upload video - verify preview and AI analysis
- [ ] Upload audio - verify player and transcription
- [ ] Switch between media types
- [ ] Submit report with each media type
- [ ] Verify media type indicator in My Reports

### Backend Testing
- [ ] Image analysis returns comprehensive data
- [ ] Video analysis extracts frames and analyzes
- [ ] Audio transcription and analysis works
- [ ] Reports saved with correct mediaType
- [ ] Media URLs accessible

### WhatsApp Testing
- [ ] Send image via WhatsApp - creates report
- [ ] Send video via WhatsApp - creates report
- [ ] Send audio via WhatsApp - creates report with transcription
- [ ] All media types route to correct department

### Admin Dashboard Testing
- [ ] View reports with different media types
- [ ] Play video reports
- [ ] Listen to audio reports
- [ ] View transcriptions
- [ ] Media type filters work

## File Size Limits

| Media Type | Max Size | Reason |
|------------|----------|--------|
| Image | 10MB | Standard image size |
| Video | 50MB | Balance quality vs upload time |
| Audio | 10MB | Sufficient for voice reports |

## Supported Formats

### Image
- JPEG, PNG, GIF, WebP

### Video
- MP4, WebM, MOV, AVI

### Audio
- MP3, WAV, OGG, M4A

## Security Considerations

1. **File Type Validation**: Check MIME type on both frontend and backend
2. **Size Limits**: Enforce limits to prevent abuse
3. **Virus Scanning**: Consider adding virus scanning for uploads
4. **Storage Quotas**: Monitor Firebase storage usage
5. **Access Control**: Ensure media URLs are properly secured

## Performance Optimization

1. **Video Compression**: Compress videos before upload
2. **Thumbnail Generation**: Generate thumbnails for videos
3. **Lazy Loading**: Load media only when needed
4. **CDN**: Use Firebase CDN for media delivery
5. **Caching**: Cache AI analysis results

## Future Enhancements

1. **Live Recording**: Add camera/microphone recording in-app
2. **Multiple Files**: Allow multiple media files per report
3. **Media Gallery**: Show all media in a gallery view
4. **Video Editing**: Basic trim/crop functionality
5. **Audio Enhancement**: Noise reduction for voice reports
6. **Real-time Streaming**: Live video reporting for emergencies
7. **AR Annotations**: Add AR markers to images/videos
8. **Offline Support**: Queue uploads when offline

## Implementation Priority

1. **High Priority** (Implement First)
   - Video upload and preview
   - Audio upload and playback
   - Basic AI analysis for all media types
   - Admin dashboard media display

2. **Medium Priority** (Implement Next)
   - Audio transcription
   - Video frame extraction
   - WhatsApp media integration
   - Media type filtering

3. **Low Priority** (Future Enhancement)
   - Live recording
   - Multiple files
   - Advanced editing
   - AR features

## Summary

This implementation adds comprehensive multi-media support to the reporting system:
- ✅ **Frontend**: Video and audio upload handlers added
- 🔄 **Backend**: Need to add video/audio analysis functions
- 🔄 **Storage**: Need to add uploadVideo and uploadAudio functions
- 🔄 **UI**: Need to update upload interface with media type selector
- 🔄 **Admin**: Need to add media type display and playback
- 🔄 **WhatsApp**: Already supports media, needs analysis integration

The system will support images, videos, and audio with full AI analysis for all media types!
