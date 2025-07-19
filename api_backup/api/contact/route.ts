import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, postEmailRequest, parseResponse } from '../../../lib/api/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required', success: false },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format', success: false },
        { status: 400 }
      );
    }

    // Prepare data for lactosure email API
    const emailData = {
      name,
      email,
      message,
      domainUrl: API_CONFIG.domainUrl,
      subject: 'Contact Form Submission - PyDart Website'
    };

    // Send to lactosure email API
    const response = await postEmailRequest(API_CONFIG.endpoints.contact, emailData);

    if (response) {
      try {
        const parsedResponse = JSON.parse(response);
        const { message: responseMessage } = parseResponse(parsedResponse);
        
        return NextResponse.json({
          message: responseMessage || 'Message sent successfully!',
          success: true
        });
      } catch (parseError) {
        // If response is not JSON, treat as success if response exists
        return NextResponse.json({
          message: 'Message sent successfully!',
          success: true
        });
      }
    } else {
      return NextResponse.json(
        { message: 'Failed to send message. Please try again later.', success: false },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.', success: false },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Contact endpoint. Use POST to send messages.' },
    { status: 405 }
  );
}
