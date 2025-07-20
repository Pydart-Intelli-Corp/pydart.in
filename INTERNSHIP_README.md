# Internship Registration System

A comprehensive internship registration system built with Next.js 13+, TypeScript, Tailwind CSS, and Razorpay payment integration.

## Features

### 🎓 Complete Registration Flow
- College information collection
- Student details management
- Date conflict validation
- Automatic amount calculation
- Secure payment processing

### 💳 Payment Integration
- Razorpay payment gateway
- Payment verification
- Transaction tracking
- Order management

### 📅 Smart Date Management
- Real-time availability checking
- Conflict detection
- Next available date suggestions
- Booking overlap prevention

### 📧 Email Automation
- Registration confirmation emails
- Training team notifications
- CSV export with student details
- Payment receipt generation

### 🔒 Data Validation
- Form validation with error handling
- Email and phone number validation
- Date range validation
- Student count verification
- Internship type selection validation

## File Structure

```
app/
├── internship/
│   ├── page.tsx              # Main registration page
│   └── layout.tsx            # Layout with metadata
├── components/
│   └── InternshipRegistrationForm.tsx  # Main form component
├── hooks/
│   ├── useInternshipDates.ts # Date management hook
│   └── useRazorpayPayment.ts # Payment processing hook
├── types/
│   └── internship.ts         # TypeScript definitions
lib/
└── api/
    └── internship.ts         # API service functions
```

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/Email

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Access the Registration Form

Navigate to `/internship` to access the registration form.

## API Endpoints Used

The system integrates with the following backend endpoints:

- `POST /api/Email/CreateRazorpayOrder` - Create payment order
- `POST /api/Email/VerifyRazorpayPayment` - Verify payment
- `POST /api/Email/InternshipRegistrationWithPayment` - Submit registration
- `GET /api/Email/GetBookedDates` - Get existing bookings

## Component Architecture

### InternshipRegistrationForm
Main form component that handles:
- Form state management
- Validation logic
- Student array management
- Date calculations
- Payment integration

### Custom Hooks

#### useInternshipDates
- Fetches booked dates
- Validates date availability
- Suggests next available dates
- Detects booking conflicts

#### useRazorpayPayment
- Loads Razorpay script
- Handles payment flow
- Processes payment verification
- Manages payment states

## Form Validation

### College Information
- Email format validation
- Phone number (10 digits)
- Pincode (6 digits)
- Required field checks

### Student Details
- Dynamic form generation
- Individual student validation
- Email and phone validation
- Department and year selection
- Internship type selection
- Skills input validation

### Date Validation
- Past date prevention
- End date after start date
- Booking conflict detection
- Availability checking

## Payment Flow

1. **Form Submission** → Validation
2. **Order Creation** → Razorpay order generation
3. **Payment Gateway** → Razorpay checkout
4. **Payment Verification** → Backend verification
5. **Registration Submission** → Final registration
6. **Email Notifications** → Confirmation emails

## Pricing Structure

The system calculates costs based on:
- Base amount per student: ₹1
- Additional per day: ₹1
- Formula: `numberOfStudents × (1 + (days × 1))`

**Example**: 10 students × 5 days = 10 × (1 + 5) = ₹60

## Available Internship Types

The system offers the following internship specializations (selected at the batch level):

- **Embedded Systems** - Core embedded programming and hardware integration
- **App Development** - Mobile and web application development
- **Serial Communications (UART, SPI)** - Hardware communication protocols
- **Raspberry Pi** - Single-board computer programming and projects
- **Microprocessors** - Low-level processor programming and architecture
- **IoT Development** - Internet of Things applications and connectivity
- **Arduino Programming** - Arduino-based project development
- **PCB Design** - Printed Circuit Board design and prototyping

*Note: The internship type is selected once for the entire batch in the Internship Details section.*

## Error Handling

- Form validation errors
- API error responses
- Payment failures
- Network issues
- User-friendly error messages

## Success Flow

1. Payment successful notification
2. Registration ID generation
3. Confirmation email sent
4. CSV export to training team
5. Success page with next steps

## Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- Responsive grid layouts
- Touch-friendly interactions

## Security Features

- Input sanitization
- CSRF protection
- Secure payment processing
- Environment variable protection

## Development Tips

### Adding New Student Fields
1. Update `Student` interface in `types/internship.ts`
2. Add form fields in `InternshipRegistrationForm.tsx`
3. Update validation logic
4. Test with API integration

### Adding New Internship Types
1. Add new options to the internship dropdown in `InternshipRegistrationForm.tsx`
2. Update documentation in README.md
3. Coordinate with backend API to handle new types

### Customizing Pricing
Modify the `calculateAmount` function in the form component.

### Adding Payment Methods
Extend the payment hooks to support additional gateways.

## Troubleshooting

### Common Issues

1. **Razorpay Script Loading**
   - Check CSP headers in `next.config.ts`
   - Verify Razorpay key configuration

2. **Date Conflicts**
   - Ensure backend date format consistency
   - Check timezone handling

3. **API Errors**
   - Verify API endpoint URLs
   - Check CORS configuration
   - Validate request/response formats

## Production Deployment

1. Set production environment variables
2. Update API base URL
3. Configure Razorpay production keys
4. Test payment flow thoroughly
5. Monitor error logs

## Support

For technical issues or feature requests, contact the development team at `info.pydart@gmail.com`.
