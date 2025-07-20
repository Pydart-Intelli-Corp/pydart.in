// Type definitions for internship registration
export interface Student {
  StudentName: string;    // Backend uses PascalCase
  StudentEmail: string;   // Backend uses PascalCase
  StudentPhone: string;   // Backend uses PascalCase
  RollNumber: string;     // Backend uses PascalCase
  Department: string;     // Backend uses PascalCase
  Year: string;          // Backend uses PascalCase
  InternshipName: string; // Backend uses PascalCase
  Skills: string;        // Backend uses PascalCase
}

export interface PaymentDetails {
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  paymentStatus: string;
  paymentDate: Date;
}

export interface InternshipRegistrationRequest {
  Email: string;             // Backend uses PascalCase
  CollegeName: string;       // Backend uses PascalCase
  Batch: string;            // Backend uses PascalCase
  CollegeDistrict: string;  // Backend uses PascalCase
  Pincode: string;          // Backend uses PascalCase
  NumberOfStudents: number; // Backend uses PascalCase
  Students: Student[];      // Backend uses PascalCase
  PhoneNumber: string;      // Backend uses PascalCase
  InternshipDays: number;   // Backend uses PascalCase
  InternshipStartDate: Date; // Backend uses PascalCase
  InternshipEndDate: Date;   // Backend uses PascalCase
  AdditionalNotes?: string;  // Backend uses PascalCase
}

export interface InternshipRegistrationWithPaymentRequest extends InternshipRegistrationRequest {
  RazorpayPaymentId: string;  // Backend uses PascalCase
  RazorpayOrderId: string;    // Backend uses PascalCase
  RazorpaySignature: string;  // Backend uses PascalCase
  Amount: number;             // Backend uses PascalCase (decimal in C#)
}

export interface CreateOrderRequest {
  Amount: number;           // Backend uses PascalCase
  CollegeName: string;      // Backend uses PascalCase
  Email: string;           // Backend uses PascalCase
  NumberOfStudents: number; // Backend uses PascalCase
}

export interface RazorpayOrderResponse {
  success: boolean;  // API actually returns camelCase
  orderId: string;   // API actually returns camelCase
  amount: number;    // API actually returns camelCase
  currency: string;  // API actually returns camelCase
  keyId: string;     // API actually returns camelCase
  message?: string;  // API actually returns camelCase
}

export interface PaymentVerificationRequest {
  RazorpayOrderId: string;   // Backend uses PascalCase
  RazorpayPaymentId: string; // Backend uses PascalCase
  RazorpaySignature: string; // Backend uses PascalCase
  Amount: number;            // Backend uses PascalCase
  Email: string;            // Backend uses PascalCase
  CollegeName: string;      // Backend uses PascalCase
}

export interface ApiResponse {
  success: boolean;  // API actually returns camelCase
  response: string;  // API actually returns camelCase
  message?: string;  // API actually returns camelCase
}

export interface InternshipRegistrationResponse {
  success: boolean;      // API actually returns camelCase
  message: string;       // API actually returns camelCase
  registrationId: string; // API actually returns camelCase
}

export interface BookedDate {
  collegeName: string; // API actually returns camelCase
  startDate: string;   // API actually returns camelCase
  endDate: string;     // API actually returns camelCase
}

export interface BookedDatesResponse {
  success: boolean;        // API actually returns camelCase
  bookedDates: BookedDate[]; // API actually returns camelCase
}

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}
