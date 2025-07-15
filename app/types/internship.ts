// Type definitions for internship registration
export interface Student {
  studentName: string;  // Changed from 'name' to 'studentName'
  studentEmail: string; // Changed from 'email' to 'studentEmail'
  studentPhone: string; // Changed from 'phone' to 'studentPhone'
  rollNumber: string;
  department: string;
  year: string;
  skills: string;       // Added required 'skills' field
}

export interface PaymentDetails {
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  paymentStatus: string;
  paymentDate: Date;
}

export interface InternshipRegistrationRequest {
  email: string;
  collegeName: string;
  batch: string;
  collegeDistrict: string;
  pincode: string;
  numberOfStudents: number;
  students: Student[];
  phoneNumber: string;
  internshipDays: number;
  internshipStartDate: Date;
  internshipEndDate: Date;
  paymentDetails?: PaymentDetails;
  additionalNotes?: string;
}

export interface InternshipRegistrationWithPaymentRequest extends InternshipRegistrationRequest {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  amount: number;
}

export interface CreateOrderRequest {
  amount: number;
  collegeName: string;
  email: string;
  numberOfStudents: number;
}

export interface RazorpayOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface PaymentVerificationRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  email: string;
  collegeName: string;
}

export interface ApiResponse {
  success: boolean;
  response: string;
}

export interface InternshipRegistrationResponse {
  success: boolean;
  message: string;
  registrationId: string;
}

export interface BookedDate {
  collegeName: string;
  startDate: string;
  endDate: string;
}

export interface BookedDatesResponse {
  success: boolean;
  bookedDates: BookedDate[];
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
