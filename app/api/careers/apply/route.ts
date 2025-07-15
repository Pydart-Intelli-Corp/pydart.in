import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🎯 Careers API endpoint hit!');
  console.log('📅 Timestamp:', new Date().toISOString());
  console.log('🌐 Request URL:', request.url);
  console.log('📋 Request Headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    const formData = await request.formData();
    
    console.log('📝 Received FormData entries:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File - ${value.name} (${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const resume = formData.get('resume') as File;

    console.log('🔍 Extracted data:', { name, email, phone, position, resumeName: resume?.name });

    // Basic validation
    if (!name || !email || !phone || !position || !resume) {
      console.log('❌ Validation failed - missing fields');
      return NextResponse.json(
        { message: 'All fields are required', success: false },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email validation failed');
      return NextResponse.json(
        { message: 'Invalid email format', success: false },
        { status: 400 }
      );
    }

    // File type validation
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resume.type)) {
      console.log('❌ File type validation failed:', resume.type);
      return NextResponse.json(
        { message: 'Invalid file type. Please upload PDF or DOC files only.', success: false },
        { status: 400 }
      );
    }

    // File size validation (5MB max)
    if (resume.size > 5 * 1024 * 1024) {
      console.log('❌ File size validation failed:', resume.size);
      return NextResponse.json(
        { message: 'File size too large. Maximum size is 5MB.', success: false },
        { status: 400 }
      );
    }

    console.log('✅ All validations passed!');

    // Log the application details (in production, you'd save to database or forward to your API)
    console.log('🎉 Career Application Received:', {
      name,
      email,
      phone,
      position,
      resumeSize: resume.size,
      resumeType: resume.type,
      resumeName: resume.name,
      timestamp: new Date().toISOString()
    });

    // Here you would typically:
    // 1. Save application to database
    // 2. Upload resume to cloud storage
    // 3. Send notification emails
    // 4. Forward to your main API server

    // For now, simulate successful submission
    console.log('⏳ Simulating processing time...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time

    const successResponse = {
      message: 'Application submitted successfully! We will review your application and contact you soon.',
      success: true,
      userKey: `career_${Date.now()}`
    };

    console.log('✅ Sending success response:', successResponse);
    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('💥 Career application error:', error);
    console.error('🔍 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.', success: false },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Career application endpoint. Use POST to submit applications.' },
    { status: 405 }
  );
}
