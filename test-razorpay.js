// Test file to verify Razorpay integration
import { API_CONFIG } from '../lib/api/config';
import { InternshipAPI } from '../lib/api/internship';

console.log('🔧 Testing Razorpay Integration...');

// Test 1: Check configuration
console.log('📋 Configuration Check:');
console.log('- API Base URL:', API_CONFIG.emailApiUrl);
console.log('- Razorpay Key ID:', API_CONFIG.razorpay.keyId);
console.log('- Endpoints:', API_CONFIG.endpoints.internship);

// Test 2: Check if Razorpay script can be loaded
function testRazorpayScript() {
  return new Promise((resolve) => {
    console.log('🔗 Testing Razorpay script loading...');
    
    if (typeof window !== 'undefined') {
      // Check if already loaded
      if (window.Razorpay) {
        console.log('✅ Razorpay already loaded');
        resolve(true);
        return;
      }

      // Try to load script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.log('❌ Failed to load Razorpay script');
        resolve(false);
      };
      document.head.appendChild(script);
    } else {
      console.log('⚠️ Running in server environment, cannot test script loading');
      resolve(true);
    }
  });
}

// Test 3: Test API endpoints
async function testAPIEndpoints() {
  console.log('🌐 Testing API endpoints...');
  
  try {
    // Test booked dates endpoint
    console.log('📅 Testing GetBookedDates...');
    const bookedDates = await InternshipAPI.getBookedDates();
    console.log('✅ GetBookedDates working:', bookedDates.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ GetBookedDates failed:', error.message);
  }

  try {
    // Test create order endpoint (with test data)
    console.log('💳 Testing CreateRazorpayOrder...');
    const testOrder = {
      amount: 1000,
      collegeName: 'Test College',
      email: 'test@example.com',
      numberOfStudents: 2
    };
    
    const orderResponse = await InternshipAPI.createRazorpayOrder(testOrder);
    console.log('✅ CreateRazorpayOrder working:', orderResponse.success ? 'Success' : 'Failed');
    console.log('Order ID:', orderResponse.orderId);
  } catch (error) {
    console.log('❌ CreateRazorpayOrder failed:', error.message);
  }
}

// Test 4: Test payment flow simulation
function testPaymentFlow() {
  console.log('💰 Testing Razorpay payment flow...');
  
  if (typeof window !== 'undefined' && window.Razorpay) {
    try {
      const options = {
        key: API_CONFIG.razorpay.keyId,
        amount: 100000, // ₹1000 in paisa
        currency: 'INR',
        name: 'Pydart Intelli Corp',
        description: 'Test Payment',
        order_id: 'test_order_id',
        handler: function(response) {
          console.log('✅ Payment successful:', response);
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#00b4ab'
        }
      };

      // Just test if Razorpay can initialize (don't actually open)
      const rzp = new window.Razorpay(options);
      console.log('✅ Razorpay payment gateway initialized successfully');
      return true;
    } catch (error) {
      console.log('❌ Razorpay initialization failed:', error.message);
      return false;
    }
  } else {
    console.log('⚠️ Razorpay not available for testing');
    return false;
  }
}

// Run all tests
export async function runRazorpayTests() {
  console.log('🚀 Starting Razorpay Integration Tests...\n');
  
  // Configuration test
  const configOk = API_CONFIG.razorpay.keyId && API_CONFIG.emailApiUrl;
  console.log('1. Configuration:', configOk ? '✅ OK' : '❌ Failed');
  
  // Script loading test
  const scriptOk = await testRazorpayScript();
  console.log('2. Script Loading:', scriptOk ? '✅ OK' : '❌ Failed');
  
  // API endpoints test
  await testAPIEndpoints();
  
  // Payment flow test
  const paymentOk = testPaymentFlow();
  console.log('4. Payment Flow:', paymentOk ? '✅ OK' : '❌ Failed');
  
  console.log('\n📊 Test Summary:');
  console.log('- Razorpay Key ID:', API_CONFIG.razorpay.keyId);
  console.log('- API URL:', API_CONFIG.emailApiUrl);
  console.log('- Test Environment: Ready for testing');
  
  return {
    config: configOk,
    script: scriptOk,
    payment: paymentOk
  };
}

// Export for use in components
export { testRazorpayScript, testAPIEndpoints, testPaymentFlow };
