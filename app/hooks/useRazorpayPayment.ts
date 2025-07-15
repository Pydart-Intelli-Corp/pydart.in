import { useState } from 'react';
import { InternshipAPI } from '@/lib/api/internship';
import { API_CONFIG } from '@/lib/api/config';
import { 
  CreateOrderRequest, 
  PaymentVerificationRequest,
  InternshipRegistrationWithPaymentRequest,
  RazorpayOptions 
} from '@/app/types/internship';

export const useRazorpayPayment = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (
    orderRequest: CreateOrderRequest,
    registrationData: Omit<InternshipRegistrationWithPaymentRequest, 'razorpayPaymentId' | 'razorpayOrderId' | 'razorpaySignature' | 'amount'>,
    onSuccess: (registrationId: string) => void,
    onError: (error: string) => void
  ) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const orderResponse = await InternshipAPI.createRazorpayOrder(orderRequest);
      
      if (!orderResponse.success) {
        throw new Error('Failed to create payment order');
      }

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: API_CONFIG.razorpay.keyId,
        amount: orderResponse.amount * 100, // Convert to paisa
        currency: orderResponse.currency,
        name: 'Pydart Intelli Corp',
        description: `Internship Registration - ${orderRequest.collegeName}`,
        order_id: orderResponse.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verificationRequest: PaymentVerificationRequest = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              amount: orderResponse.amount,
              email: orderRequest.email,
              collegeName: orderRequest.collegeName
            };

            const verificationResponse = await InternshipAPI.verifyRazorpayPayment(verificationRequest);
            
            if (!verificationResponse.success) {
              throw new Error('Payment verification failed');
            }

            // Submit registration with payment details
            const registrationRequest: InternshipRegistrationWithPaymentRequest = {
              ...registrationData,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              amount: orderResponse.amount
            };

            const registrationResponse = await InternshipAPI.submitInternshipRegistrationWithPayment(registrationRequest);
            
            if (registrationResponse.success) {
              onSuccess(registrationResponse.registrationId);
            } else {
              throw new Error(registrationResponse.message || 'Registration failed');
            }
          } catch (error) {
            onError(error instanceof Error ? error.message : 'Payment processing failed');
          }
        },
        prefill: {
          name: orderRequest.collegeName,
          email: orderRequest.email,
          contact: registrationData.phoneNumber
        },
        theme: {
          color: '#FF4D00'
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            onError('Payment cancelled by user');
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Payment initiation failed');
      onError(error instanceof Error ? error.message : 'Payment initiation failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  return {
    paymentLoading,
    paymentError,
    initiatePayment
  };
};
