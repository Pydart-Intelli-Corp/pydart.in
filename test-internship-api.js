// API Test Script for Internship Endpoints
console.log('Testing PoornasreeAPI Internship Endpoints...');

const API_BASE = 'http://localhost:5000/api/Email';

// Test data
const testOrder = {
  amount: 10.0,
  collegeName: "Test College",
  email: "test@college.edu",
  numberOfStudents: 2
};

const testStudent = {
  studentName: "John Doe",
  studentEmail: "john@example.com",
  studentPhone: "9876543210",
  rollNumber: "CS001",
  department: "Computer Science",
  year: "3rd",
  internshipName: "App Development",
  skills: "JavaScript, React"
};

const testRegistration = {
  email: "test@college.edu",
  collegeName: "Test College",
  batch: "2024-25",
  collegeDistrict: "Test District",
  pincode: "123456",
  numberOfStudents: 1,
  students: [testStudent],
  phoneNumber: "9876543210",
  internshipDays: 30,
  internshipStartDate: new Date("2025-08-01"),
  internshipEndDate: new Date("2025-08-30"),
  additionalNotes: "Test registration",
  razorpayPaymentId: "pay_test123",
  razorpayOrderId: "order_test123",
  razorpaySignature: "test_signature",
  amount: 10.0
};

// Test functions
async function testCreateOrder() {
  try {
    console.log('Testing CreateRazorpayOrder...');
    const response = await fetch(`${API_BASE}/CreateRazorpayOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testOrder)
    });
    const result = await response.json();
    console.log('Order creation result:', result);
    return result;
  } catch (error) {
    console.error('Order creation failed:', error);
    return null;
  }
}

async function testGetBookedDates() {
  try {
    console.log('Testing GetBookedDates...');
    const response = await fetch(`${API_BASE}/GetBookedDates`);
    const result = await response.json();
    console.log('Booked dates result:', result);
    return result;
  } catch (error) {
    console.error('Get booked dates failed:', error);
    return null;
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...');
  
  await testGetBookedDates();
  await testCreateOrder();
  
  console.log('Tests completed.');
}

// Export for use in browser console or Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, testCreateOrder, testGetBookedDates };
} else {
  // Browser environment
  window.apiTests = { runTests, testCreateOrder, testGetBookedDates };
}
