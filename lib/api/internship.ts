import { 
  InternshipRegistrationRequest, 
  InternshipRegistrationWithPaymentRequest,
  CreateOrderRequest,
  PaymentVerificationRequest,
  RazorpayOrderResponse,
  ApiResponse,
  InternshipRegistrationResponse,
  BookedDatesResponse
} from '@/app/types/internship';
import { API_CONFIG } from './config';

const API_BASE_URL = API_CONFIG.emailApiUrl;

export class InternshipAPI {
  // Get booked dates to check availability
  static async getBookedDates(): Promise<BookedDatesResponse> {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.getBookedDates}`);
    if (!response.ok) {
      throw new Error('Failed to fetch booked dates');
    }
    return response.json();
  }

  // Create Razorpay order for payment
  static async createRazorpayOrder(request: CreateOrderRequest): Promise<RazorpayOrderResponse> {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.createOrder}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }

    return response.json();
  }

  // Verify Razorpay payment
  static async verifyRazorpayPayment(request: PaymentVerificationRequest): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.verifyPayment}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return response.json();
  }

  // Submit internship registration with payment
  static async submitInternshipRegistrationWithPayment(
    request: InternshipRegistrationWithPaymentRequest
  ): Promise<InternshipRegistrationResponse> {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.registration}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.response || 'Registration failed');
    }

    return response.json();
  }

  // Submit internship registration without payment (if needed)
  static async submitInternshipRegistration(
    request: InternshipRegistrationRequest
  ): Promise<InternshipRegistrationResponse> {
    const response = await fetch(`${API_BASE_URL}/Email/InternshipRegistration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.response || 'Registration failed');
    }

    return response.json();
  }
}
