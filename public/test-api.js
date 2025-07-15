/**
 * API Test Script for PyDart
 * 
 * This file demonstrates how the APIs work:
 * 1. Careers API - Uses local Next.js API route
 * 2. Email API - Uses lactosure.azurewebsites.net for email functionality
 */

// Test the careers API (local)
export async function testCareersAPI() {
  console.log('🧪 Testing Careers API (Local)...');
  
  const testData = new FormData();
  testData.append('name', 'John Doe');
  testData.append('email', 'john@example.com');
  testData.append('phone', '+1234567890');
  testData.append('position', 'Flutter Developer');
  testData.append('domainUrl', 'https://pydart.in');
  
  // Create a dummy file for testing
  const dummyFile = new File(['test content'], 'test-resume.pdf', { type: 'application/pdf' });
  testData.append('resume', dummyFile);

  try {
    const response = await fetch('/api/careers/apply', {
      method: 'POST',
      body: testData,
    });

    const result = await response.json();
    console.log('✅ Careers API Response:', result);
    return result;
  } catch (error) {
    console.error('❌ Careers API Error:', error);
    return null;
  }
}

// Test the email API (lactosure)
export async function testEmailAPI() {
  console.log('📧 Testing Email API (Lactosure)...');
  
  const testData = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'This is a test message from PyDart website',
    domainUrl: 'https://pydart.in',
    subject: 'Test Contact Form'
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('✅ Email API Response:', result);
    return result;
  } catch (error) {
    console.error('❌ Email API Error:', error);
    return null;
  }
}

// Run all tests
export async function runAllAPITests() {
  console.log('🚀 Starting API Tests...\n');
  
  await testCareersAPI();
  console.log('\n');
  await testEmailAPI();
  
  console.log('\n🎉 API Tests Complete!');
}

// Usage in browser console:
// import { runAllAPITests } from '/test-api.js';
// runAllAPITests();
