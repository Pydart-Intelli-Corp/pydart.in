# Career Screen API Working Structure Analysis

## Overview
The Career screen implements a job application system with file upload capabilities for resume submissions. The API structure follows a hybrid approach using both external email services and local API endpoints.

## API Architecture

### 1. Configuration Layer (`lib/api/config.ts`)

#### API Endpoints
```typescript
export const API_CONFIG = {
  // External Email API (Primary)
  emailApiUrl: "https://lactosure.azurewebsites.net/api",
  
  // Local APIs (Fallback/Development)
  baseUrl: "",
  domainUrl: "https://pydart.in",
  
  endpoints: {
    careers: "/Email/CareerMail",  // External email service
    // ... other endpoints
  }
}
```

#### Helper Functions
- **`postEmailRequest()`** - For JSON requests to external email API
- **`postRequestWithFile()`** - For multipart form data with file uploads
- **`validation`** - Input validation utilities
- **`parseResponse()`** - Response parsing utilities

### 2. Frontend Implementation (`app/components/Career.tsx`)

#### Form Structure
The career form collects:
- **Personal Info**: Name, Email, Phone
- **Job Selection**: Position from predefined job openings
- **Resume Upload**: PDF/DOC files (max 5MB)

#### Job Openings Data
```typescript
const jobOpenings = [
  {
    title: 'Flutter Developer',
    location: 'Kochi',
    type: 'Full-time',
    description: 'Develop mobile applications using the Flutter framework.',
    requirements: ['Proficiency in Flutter & Dart', '1+ years experience'],
    salary: 'Competitive'
  },
  // ... 5 more positions
];
```

#### API Call Flow
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // 1. Validation
  if (!validateForm()) return;
  
  // 2. Prepare Query Parameters
  const queryParams = new URLSearchParams({
    recipientName: name,
    recipientEmail: email,
    mobile: phone,
    selectedService: job,
    purpose: "Application Submission"
  });
  
  // 3. Construct API URL
  const apiUrl = `${API_CONFIG.emailApiUrl}${API_CONFIG.endpoints.careers}?${queryParams.toString()}`;
  
  // 4. Create FormData for File Upload
  const formDataToSend = new FormData();
  formDataToSend.append('pdfFile', resumeFile, resumeFile.name);
  
  // 5. Make API Call
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formDataToSend,
  });
  
  // 6. Handle Response
  if (response.status === 200) {
    // Success handling
  } else {
    // Error handling
  }
};
```

### 3. Backend API Routes (`app/api/careers/apply/route.ts`)

#### Local API Endpoint (Fallback)
- **Endpoint**: `/api/careers/apply`
- **Method**: POST
- **Purpose**: Local processing and validation

#### Validation Pipeline
```typescript
// 1. Extract FormData
const name = formData.get('name') as string;
const email = formData.get('email') as string;
const phone = formData.get('phone') as string;
const position = formData.get('position') as string;
const resume = formData.get('resume') as File;

// 2. Field Validation
if (!name || !email || !phone || !position || !resume) {
  return NextResponse.json({ message: 'All fields required' }, { status: 400 });
}

// 3. Email Format Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 4. File Type Validation
const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// 5. File Size Validation (5MB max)
if (resume.size > 5 * 1024 * 1024) { /* error */ }
```

## Data Flow Architecture

### Primary Flow (External Email API)
1. **Frontend Form** → Validates input locally
2. **API Call** → `https://lactosure.azurewebsites.net/api/Email/CareerMail`
3. **Query Parameters** → User details passed as URL params
4. **FormData Body** → Resume file as multipart upload
5. **Email Service** → Processes application and sends notifications

### Fallback Flow (Local API)
1. **Frontend Form** → Same validation
2. **Local Route** → `/api/careers/apply`
3. **Processing** → Local validation and logging
4. **Response** → Success/error feedback

## Error Handling Strategy

### Frontend Error States
```typescript
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
const [errorMessage, setErrorMessage] = useState('');
const [formErrors, setFormErrors] = useState({
  name: '', email: '', phone: '', job: '', resume: ''
});
```

### Validation Layers
1. **Real-time Validation**: As user types
2. **Form Submission Validation**: Before API call
3. **Server-side Validation**: In API endpoints
4. **File Validation**: Type, size, format checks

## File Upload Implementation

### Frontend File Handling
```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  
  if (file) {
    if (validation.file(file)) {
      setResumeFile(file);
      // Clear errors
    } else {
      // Set error and clear file
      setFormErrors(prev => ({ 
        ...prev, 
        resume: 'Please upload a PDF or DOC file (max 5MB)' 
      }));
    }
  }
};
```

### File Validation Rules
- **Allowed Types**: PDF, DOC, DOCX
- **Max Size**: 5MB
- **Validation**: MIME type and size checking

## Security Considerations

### Input Sanitization
- Email format validation with regex
- Phone number validation
- File type verification
- Size limits enforcement

### API Security
- CORS handling
- Input validation on both client and server
- Error message sanitization
- File upload restrictions

## User Experience Features

### Loading States
- Submit button shows spinner during API calls
- Form fields disabled during submission
- Clear error messages and success feedback

### Success/Error Feedback
- **Success**: Green banner with checkmark
- **Error**: Red banner with error details
- **Form Reset**: Clears all fields on successful submission

### Responsive Design
- Mobile-friendly form layout
- Touch-friendly file upload interface
- Proper spacing and typography

## Integration Points

### Email Service Integration
- External API at `lactosure.azurewebsites.net`
- Handles email notifications
- Manages resume file processing

### Career Data Management
- Static job openings array
- Position selection integration
- Application tracking (via userKey)

## Development & Debugging

### Console Logging
Comprehensive logging at each step:
```typescript
console.log('🚀 Making API call to:', apiUrl);
console.log('📝 Form data being sent:', formDetails);
console.log("Response status:", response.status);
console.log("Response body:", responseBody);
```

### Error Tracking
- Detailed error information
- Stack trace logging
- User-friendly error messages

## Future Improvements

### Potential Enhancements
1. **Database Integration**: Store applications locally
2. **File Storage**: Cloud storage for resumes
3. **Admin Dashboard**: Application management interface
4. **Email Templates**: Customized notification emails
5. **Application Status**: Tracking and updates
6. **Interview Scheduling**: Calendar integration

### Performance Optimizations
1. **File Compression**: Optimize resume uploads
2. **Caching**: API response caching
3. **Progressive Enhancement**: Offline capabilities
4. **Image Optimization**: Career page assets

This analysis provides a comprehensive understanding of how the Career screen's API structure works, from frontend form handling to backend processing and error management.
