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
      script.async = true;
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('❌ Failed to load Razorpay script:', error);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (
    orderRequest: CreateOrderRequest,
    registrationData: Omit<InternshipRegistrationWithPaymentRequest, 'RazorpayPaymentId' | 'RazorpayOrderId' | 'RazorpaySignature' | 'Amount'>,
    onSuccess: (registrationId: string) => void,
    onError: (error: string) => void
  ) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      console.log('🚀 Initiating payment process...', orderRequest);
      
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      console.log('🔄 Creating payment order...');
      // Create order
      const orderResponse = await InternshipAPI.createRazorpayOrder(orderRequest);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create payment order');
      }

      console.log('✅ Order created successfully:', orderResponse);

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: API_CONFIG.razorpay.keyId,
        amount: orderResponse.amount * 100, // Convert to paisa
        currency: orderResponse.currency || 'INR',
        name: 'Pydart Intelli Corp',
        description: `Internship Registration - ${orderRequest.CollegeName}`,
        order_id: orderResponse.orderId,
        handler: async (response: any) => {
          try {
            console.log('💳 Payment handler called with response:', response);
            
            // Verify payment
            const verificationRequest: PaymentVerificationRequest = {
              RazorpayOrderId: response.razorpay_order_id,
              RazorpayPaymentId: response.razorpay_payment_id,
              RazorpaySignature: response.razorpay_signature,
              Amount: orderResponse.amount,
              Email: orderRequest.Email,
              CollegeName: orderRequest.CollegeName
            };

            console.log('🔄 Starting payment verification...');
            const verificationResponse = await InternshipAPI.verifyRazorpayPayment(verificationRequest);
            
            if (!verificationResponse.success) {
              throw new Error(verificationResponse.response || verificationResponse.message || 'Payment verification failed');
            }

            console.log('✅ Payment verified, starting registration...');
            
            // Submit registration with payment details
            const registrationRequest: InternshipRegistrationWithPaymentRequest = {
              ...registrationData,
              RazorpayPaymentId: response.razorpay_payment_id,
              RazorpayOrderId: response.razorpay_order_id,
              RazorpaySignature: response.razorpay_signature,
              Amount: orderResponse.amount
            };

            console.log('🔄 Submitting registration...');
            const registrationResponse = await InternshipAPI.submitInternshipRegistrationWithPayment(registrationRequest);
            
            if (registrationResponse.success) {
              console.log('✅ Registration completed successfully');
              onSuccess(registrationResponse.registrationId);
            } else {
              console.error('❌ Registration failed:', registrationResponse);
              throw new Error(registrationResponse.message || 'Registration failed');
            }
          } catch (error) {
            console.error('❌ Payment handler error:', error);
            onError(error instanceof Error ? error.message : 'Payment processing failed');
          }
        },
        prefill: {
          name: orderRequest.CollegeName,
          email: orderRequest.Email,
          contact: registrationData.PhoneNumber
        },
        theme: {
          color: '#00b4ab'
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            onError('Payment cancelled by user');
          }
        }
      };

      // Debug logging
      console.log('🔧 Razorpay Options:', {
        key: options.key,
        amount: options.amount,
        currency: options.currency,
        order_id: options.order_id,
        name: options.name
      });

      // Open Razorpay checkout
      try {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (razorpayError) {
        console.error('❌ Razorpay initialization error:', razorpayError);
        throw new Error(`Razorpay initialization failed: ${razorpayError instanceof Error ? razorpayError.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment initiation failed';
      setPaymentError(errorMessage);
      onError(errorMessage);
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
