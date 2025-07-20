# Internship API Integration - PoornasreeAPI

## Overview
This document describes the integration between the PyDart Next.js frontend and the PoornasreeAPI backend for internship registration functionality.

## API Endpoints Added

### 1. Create Razorpay Order
**Endpoint:** `POST /api/Email/CreateRazorpayOrder`
**Purpose:** Creates a payment order with Razorpay for internship registration

**Request Body:**
```json
{
  "amount": 10.0,
  "collegeName": "Example College",
  "email": "college@example.com",
  "numberOfStudents": 5
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "order_abc123",
  "amount": 10.0,
  "currency": "INR",
  "keyId": "rzp_live_xxx",
  "message": "Order created successfully"
}
```

### 2. Verify Razorpay Payment
**Endpoint:** `POST /api/Email/VerifyRazorpayPayment`
**Purpose:** Verifies the payment signature from Razorpay

**Request Body:**
```json
{
  "razorpayOrderId": "order_abc123",
  "razorpayPaymentId": "pay_xyz789",
  "razorpaySignature": "signature_hash",
  "amount": 10.0,
  "email": "college@example.com",
  "collegeName": "Example College"
}
```

### 3. Internship Registration with Payment
**Endpoint:** `POST /api/Email/InternshipRegistrationWithPayment`
**Purpose:** Completes the internship registration after successful payment

**Request Body:**
```json
{
  "email": "college@example.com",
  "collegeName": "Example College",
  "batch": "2024-25",
  "collegeDistrict": "Test District",
  "pincode": "123456",
  "numberOfStudents": 2,
  "students": [
    {
      "studentName": "John Doe",
      "studentEmail": "john@example.com",
      "studentPhone": "9876543210",
      "rollNumber": "CS001",
      "department": "Computer Science",
      "year": "3rd",
      "internshipName": "App Development",
      "skills": "JavaScript, React"
    }
  ],
  "phoneNumber": "9876543210",
  "internshipDays": 30,
  "internshipStartDate": "2025-08-01T00:00:00.000Z",
  "internshipEndDate": "2025-08-30T00:00:00.000Z",
  "additionalNotes": "Test registration",
  "razorpayPaymentId": "pay_xyz789",
  "razorpayOrderId": "order_abc123",
  "razorpaySignature": "signature_hash",
  "amount": 10.0
}
```

### 4. Get Booked Dates
**Endpoint:** `GET /api/Email/GetBookedDates`
**Purpose:** Retrieves all booked internship dates to prevent conflicts

### 5. Clear All Internship Data
**Endpoint:** `POST /api/Email/ClearAllInternshipData`
**Purpose:** Administrative endpoint to clear all internship data

## Files Created/Modified

### PoornasreeAPI Backend:
- `/Models/InternshipModels.cs` - Data models for internship functionality
- `/Services/RazorpayService.cs` - Razorpay payment integration service
- `/Services/InternshipService.cs` - Business logic for internship registration
- `/Controllers/EmailController.cs` - Added internship endpoints
- `/Program.cs` - Registered new services
- `/appsettings.json` - Added Razorpay configuration

### PyDart Next.js Frontend:
- `/lib/api/config.ts` - Updated API configuration for dynamic URL
- `/lib/api/internship.ts` - Updated to use new API URL
- Added enhanced error handling and logging

## Data Storage
- Registration data is stored in JSON files in the `/Data` directory
- Booked dates are tracked in `/Data/booked_dates.json`
- Registration details are saved in `/Data/internship_registrations.json`

## Email Notifications
The system automatically sends:
- Confirmation email to the registering college
- Notification email to PyDart team with registration details

## Configuration

### Razorpay Settings (appsettings.json):
```json
{
  "Razorpay": {
    "KeyId": "rzp_live_YK4ixrNgx0OUTC",
    "KeySecret": "m44QWZae8PiimDqDcTnhp6pA"
  }
}
```

### Environment-based API URLs:
- Development: `http://localhost:5000/api`
- Production: `https://lactosure.azurewebsites.net/api`

## Testing
Use the `/test-internship-api.js` script to test API endpoints during development.

## Security Features
- Payment signature verification using HMAC-SHA256
- Model validation for all incoming requests
- Secure payment processing with Razorpay
- Error handling with detailed logging

## Pricing Structure
- Base amount: ₹1 per student
- Daily amount: ₹1 per day per student
- Total: (Number of Students) × (₹1 + (Days × ₹1))

## Error Handling
The API provides detailed error messages and proper HTTP status codes:
- 400: Bad Request (validation errors)
- 500: Internal Server Error (system errors)
- Detailed error messages in response body for debugging
