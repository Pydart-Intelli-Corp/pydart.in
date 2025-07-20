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

const API_BASE_URL = API_CONFIG.productionApiUrl;

export class InternshipAPI {
  // Get booked dates to check availability
  static async getBookedDates(): Promise<BookedDatesResponse> {
    console.log('🔄 Fetching booked dates...');
    
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.getBookedDates}`);
    
    console.log('📊 Get Booked Dates Response Status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch booked dates';
      try {
        const errorData = await response.json();
        console.error('❌ Get Booked Dates Error Response:', errorData);
        errorMessage = errorData.message || errorData.response || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('❌ Error parsing error response:', parseError);
        const errorText = await response.text();
        console.error('❌ Raw error response:', errorText);
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('✅ Get Booked Dates Success:', result);
    return result;
  }

  // Create Razorpay order for payment
  static async createRazorpayOrder(request: CreateOrderRequest): Promise<RazorpayOrderResponse> {
    console.log('🔄 Creating Razorpay order:', request);
    
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.createOrder}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('📊 Create Order Response Status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Failed to create payment order';
      try {
        const errorData = await response.json();
        console.error('❌ Create Order Error Response:', errorData);
        errorMessage = errorData.message || errorData.response || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('❌ Error parsing error response:', parseError);
        const errorText = await response.text();
        console.error('❌ Raw error response:', errorText);
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Create Order Success:', result);
    return result;
  }

  // Verify Razorpay payment
  static async verifyRazorpayPayment(request: PaymentVerificationRequest): Promise<ApiResponse> {
    console.log('🔄 Verifying Razorpay payment:', {
      razorpayOrderId: request.RazorpayOrderId,
      razorpayPaymentId: request.RazorpayPaymentId,
      amount: request.Amount,
      email: request.Email
    });
    
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.verifyPayment}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('📊 Verify Payment Response Status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Failed to verify payment';
      try {
        const errorData = await response.json();
        console.error('❌ Verify Payment Error Response:', errorData);
        errorMessage = errorData.message || errorData.response || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('❌ Error parsing error response:', parseError);
        const errorText = await response.text();
        console.error('❌ Raw error response:', errorText);
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Verify Payment Success:', result);
    return result;
  }

  // Submit internship registration with payment
  static async submitInternshipRegistrationWithPayment(
    request: InternshipRegistrationWithPaymentRequest
  ): Promise<InternshipRegistrationResponse> {
    console.log('🔄 Submitting internship registration with payment:', {
      email: request.Email,
      collegeName: request.CollegeName,
      numberOfStudents: request.NumberOfStudents,
      amount: request.Amount,
      razorpayPaymentId: request.RazorpayPaymentId,
      razorpayOrderId: request.RazorpayOrderId
    });
    
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.endpoints.internship.registration}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('📊 Registration Response Status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Registration failed';
      try {
        const errorData = await response.json();
        console.error('❌ Registration Error Response:', errorData);
        // Try different possible error message fields
        errorMessage = errorData.message || 
                     errorData.response || 
                     errorData.error || 
                     errorData.details ||
                     `HTTP ${response.status}: ${response.statusText}`;
      } catch (parseError) {
        console.error('❌ Error parsing error response:', parseError);
        try {
          const errorText = await response.text();
          console.error('❌ Raw error response:', errorText);
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
        } catch (textError) {
          console.error('❌ Error reading response text:', textError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Registration Success:', result);
    return result;
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
