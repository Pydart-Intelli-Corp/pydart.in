// API Configuration for PyDart Next.js Application
export const API_CONFIG = {
  // Email API - lactosure endpoint for email functionality (including careers and internships)
  emailApiUrl: "https://lactosure.azurewebsites.net/api",
  
  // Local/PyDart APIs
  baseUrl: "", // Use relative URL for local APIs
  domainUrl: "https://pydart.in",
  
  // Razorpay Configuration
  razorpay: {
    keyId: "rzp_test_sewzXr1rtc9PGp",
    keySecret: "wqrHlxk7QP5TY4TSQsyfugxO"
  },
  
  endpoints: {
    // Careers now uses email API like Flutter
    careers: "/Email/CareerMail",
    
    // Internship endpoints
    internship: {
      createOrder: "/Email/CreateRazorpayOrder",
      verifyPayment: "/Email/VerifyRazorpayPayment",
      registration: "/Email/InternshipRegistrationWithPayment",
      getBookedDates: "/Email/GetBookedDates",
      clearData: "/Email/ClearAllInternshipData"
    },
    
    // Other email-related endpoints
    contact: "/contact",
    newsletter: "/newsletter/subscribe"
  }
};

// Helper function for making POST requests to email API (lactosure)
export async function postEmailRequest(endpoint: string, body: Record<string, any>): Promise<string | null> {
  try {
    const url = `${API_CONFIG.emailApiUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Email API request failed:', error);
    return null;
  }
}

// Helper function for making POST requests to local APIs
export async function postRequest(url: string, body: Record<string, any>): Promise<string | null> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    return null;
  }
}

// Helper function for file uploads (careers form)
export async function postRequestWithFile(
  url: string, 
  formData: FormData
): Promise<string | null> {
  try {
    console.log('🔗 Making file upload request to:', url);
    console.log('📤 FormData entries:');
    
    // Log FormData contents (for debugging)
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File - ${value.name} (${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('📥 Response Text:', responseText);
    return responseText;
  } catch (error) {
    console.error('💥 File upload failed:', error);
    console.error('🔍 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return null;
  }
}

// Helper function to parse API response
export function parseResponse(response: any): { message: string; userKey: string } {
  const message = response?.message?.toString() || "";
  const userKey = response?.userKey?.toString() || "";
  return {
    message,
    userKey,
  };
}

// Validation helpers
export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },
  
  name: (name: string): boolean => {
    return name.trim().length >= 2;
  },
  
  file: (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
};
