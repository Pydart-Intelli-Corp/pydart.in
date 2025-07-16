'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/app/types/internship';
import { useInternshipDates } from '@/app/hooks/useInternshipDates';
import { useRazorpayPayment } from '@/app/hooks/useRazorpayPayment';
import DateRangePicker from './DateRangePicker';

interface InternshipRegistrationFormProps {
  onSuccess?: (registrationId: string) => void;
  onError?: (error: string) => void;
}

export default function InternshipRegistrationForm({ 
  onSuccess, 
  onError 
}: InternshipRegistrationFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    collegeName: '',
    batch: '',
    collegeDistrict: '',
    pincode: '',
    numberOfStudents: 1,
    phoneNumber: '',
    internshipDays: 5,
    internshipStartDate: '',
    internshipEndDate: '',
    additionalNotes: ''
  });

  const [students, setStudents] = useState<Student[]>([
    { studentName: '', studentEmail: '', studentPhone: '', rollNumber: '', department: '', year: '', skills: '' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Custom hooks
  const { 
    bookedDates, 
    loading: datesLoading, 
    isDateRangeAvailable, 
    getNextAvailableDate,
    getConflictingBookings 
  } = useInternshipDates();

  const { paymentLoading, initiatePayment } = useRazorpayPayment();

  // Clear dates when internship days change
  useEffect(() => {
    if (formData.internshipStartDate) {
      // Recalculate end date when days change
      const startDate = new Date(formData.internshipStartDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + formData.internshipDays - 1);
      
      setFormData(prev => ({
        ...prev,
        internshipEndDate: endDate.toISOString().split('T')[0]
      }));
    }
  }, [formData.internshipDays]);

  // Update students array when number changes
  useEffect(() => {
    const currentCount = students.length;
    const newCount = formData.numberOfStudents;

    if (newCount > currentCount) {
      const newStudents = Array(newCount - currentCount).fill(null).map(() => ({
        studentName: '', studentEmail: '', studentPhone: '', rollNumber: '', department: '', year: '', skills: ''
      }));
      setStudents(prev => [...prev, ...newStudents]);
    } else if (newCount < currentCount) {
      setStudents(prev => prev.slice(0, newCount));
    }
  }, [formData.numberOfStudents, students.length]);

  const scrollToError = (fieldName: string) => {
    // Create a mapping of error field names to their corresponding input names/IDs
    const fieldMapping: Record<string, string> = {
      'email': 'email',
      'collegeName': 'collegeName',
      'batch': 'batch',
      'collegeDistrict': 'collegeDistrict',
      'pincode': 'pincode',
      'phoneNumber': 'phoneNumber',
      'internshipStartDate': 'internshipStartDate',
      'internshipEndDate': 'internshipEndDate'
    };

    // Handle student field errors
    if (fieldName.includes('student_')) {
      const studentIndex = fieldName.split('_')[1];
      const studentField = fieldName.split('_')[2];
      const targetElement = document.querySelector(`[data-student-field="${studentIndex}-${studentField}"]`) ||
                           document.querySelector(`[data-student-section="${studentIndex}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    // Handle regular field errors
    const targetFieldName = fieldMapping[fieldName];
    if (targetFieldName) {
      const targetElement = document.querySelector(`input[name="${targetFieldName}"], select[name="${targetFieldName}"], textarea[name="${targetFieldName}"]`) ||
                           document.querySelector(`[data-field="${targetFieldName}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    // Fallback: scroll to the first error element if specific targeting fails
    const firstErrorElement = document.querySelector('.text-red-400');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.collegeName) newErrors.collegeName = 'College name is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    if (!formData.collegeDistrict) newErrors.collegeDistrict = 'District is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.internshipStartDate) newErrors.internshipStartDate = 'Start date is required';
    if (!formData.internshipEndDate) newErrors.internshipEndDate = 'End date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Pincode validation
    const pincodeRegex = /^[0-9]{6}$/;
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // Date validation
    if (formData.internshipStartDate && formData.internshipEndDate) {
      const startDate = new Date(formData.internshipStartDate);
      const endDate = new Date(formData.internshipEndDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.internshipStartDate = 'Start date cannot be in the past';
      }

      if (endDate < startDate) {
        newErrors.internshipEndDate = 'End date must be after start date';
      }
    }

    // Student validation
    students.forEach((student, index) => {
      if (!student.studentName) newErrors[`student_${index}_studentName`] = 'Student name is required';
      if (!student.studentEmail) newErrors[`student_${index}_studentEmail`] = 'Student email is required';
      if (!student.studentPhone) newErrors[`student_${index}_studentPhone`] = 'Student phone is required';
      if (!student.rollNumber) newErrors[`student_${index}_rollNumber`] = 'Roll number is required';
      if (!student.department) newErrors[`student_${index}_department`] = 'Department is required';
      if (!student.year) newErrors[`student_${index}_year`] = 'Year is required';
      if (!student.skills) newErrors[`student_${index}_skills`] = 'Skills are required';

      if (student.studentEmail && !emailRegex.test(student.studentEmail)) {
        newErrors[`student_${index}_studentEmail`] = 'Please enter a valid email address';
      }

      if (student.studentPhone && !phoneRegex.test(student.studentPhone)) {
        newErrors[`student_${index}_studentPhone`] = 'Please enter a valid 10-digit phone number';
      }
    });

    setErrors(newErrors);
    
    // If there are errors, scroll to the first one
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      setTimeout(() => {
        scrollToError(firstErrorField);
      }, 100); // Small delay to ensure error messages are rendered
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const calculateAmount = (): number => {
    // Calculate based on number of students and days
    const baseAmountPerStudent = 500;
    const amountPerDay = 100;
    return formData.numberOfStudents * (baseAmountPerStudent + (formData.internshipDays * amountPerDay));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const amount = calculateAmount();
      
      // Prepare registration data
      const registrationData = {
        email: formData.email,
        collegeName: formData.collegeName,
        batch: formData.batch,
        collegeDistrict: formData.collegeDistrict,
        pincode: formData.pincode,
        numberOfStudents: formData.numberOfStudents,
        students,
        phoneNumber: formData.phoneNumber,
        internshipDays: formData.internshipDays,
        internshipStartDate: new Date(formData.internshipStartDate),
        internshipEndDate: new Date(formData.internshipEndDate),
        additionalNotes: formData.additionalNotes
      };

      // Create order request
      const orderRequest = {
        amount,
        collegeName: formData.collegeName,
        email: formData.email,
        numberOfStudents: formData.numberOfStudents
      };

      // Initiate payment
      await initiatePayment(
        orderRequest,
        registrationData,
        (registrationId) => {
          onSuccess?.(registrationId);
        },
        (error) => {
          onError?.(error);
        }
      );

    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const updateStudent = (index: number, field: keyof Student, value: string) => {
    setStudents(prev => prev.map((student, i) => 
      i === index ? { ...student, [field]: value } : student
    ));
  };

  const isLoading = submitting || paymentLoading || datesLoading;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Internship Registration
        </h1>
        <p className="text-gray-300">
          Register your college students for our comprehensive internship program
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* College Information */}
        <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-white">College Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                College Name *
              </label>
              <input
                type="text"
                name="collegeName"
                data-field="collegeName"
                value={formData.collegeName}
                onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent placeholder-gray-400"
                placeholder="Enter college name"
              />
              {errors.collegeName && <p className="text-red-400 text-sm mt-1">{errors.collegeName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                data-field="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent placeholder-gray-400"
                placeholder="college@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                data-field="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                placeholder="10-digit phone number"
              />
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Batch *
              </label>
              <input
                type="text"
                name="batch"
                data-field="batch"
                value={formData.batch}
                onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                placeholder="e.g., 2023-2024"
              />
              {errors.batch && <p className="text-red-400 text-sm mt-1">{errors.batch}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                District *
              </label>
              <select
                name="collegeDistrict"
                data-field="collegeDistrict"
                value={formData.collegeDistrict}
                onChange={(e) => setFormData(prev => ({ ...prev, collegeDistrict: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
              >
                <option value="">Select District</option>
                
                {/* Northern Kerala */}
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kannur">Kannur</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Kozhikode">Kozhikode (Calicut)</option>
                <option value="Malappuram">Malappuram</option>
                
                {/* Central Kerala */}
                <option value="Palakkad">Palakkad</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Ernakulam">Ernakulam (Kochi)</option>
                <option value="Idukki">Idukki</option>
                <option value="Kottayam">Kottayam</option>
                
                {/* Southern Kerala */}
                <option value="Alappuzha">Alappuzha (Alleppey)</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Kollam">Kollam</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram (Trivandrum)</option>
                
                {/* Other States/Outside Kerala */}
                <option value="Other">Other (Outside Kerala)</option>
              </select>
              {errors.collegeDistrict && <p className="text-red-400 text-sm mt-1">{errors.collegeDistrict}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                data-field="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                placeholder="6-digit pincode"
              />
              {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>

        {/* Internship Details */}
        <div className="bg-gray-700 border border-gray-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Internship Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Number of Students *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.numberOfStudents}
                onChange={(e) => setFormData(prev => ({ ...prev, numberOfStudents: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Internship Days *
              </label>
              <select
                value={formData.internshipDays}
                onChange={(e) => setFormData(prev => ({ ...prev, internshipDays: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
              >
                <option value={5}>5 Days</option>
                <option value={10}>10 Days</option>
                <option value={15}>15 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Total Amount
              </label>
              <div className="px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md text-lg font-semibold text-[#00b4ab]">
                ₹{calculateAmount().toLocaleString()}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Internship Dates *
              </label>
              <div data-field="internshipStartDate">
                <DateRangePicker
                  startDate={formData.internshipStartDate}
                  endDate={formData.internshipEndDate}
                  onStartDateChange={(date) => setFormData(prev => ({ ...prev, internshipStartDate: date }))}
                  onEndDateChange={(date) => setFormData(prev => ({ ...prev, internshipEndDate: date }))}
                  internshipDays={formData.internshipDays}
                  bookedDates={bookedDates}
                  error={errors.internshipStartDate || errors.internshipEndDate}
                  className="w-full"
                />
              </div>
              {(errors.internshipStartDate || errors.internshipEndDate) && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.internshipStartDate || errors.internshipEndDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Additional Notes
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
              placeholder="Any special requirements or notes..."
            />
          </div>
        </div>

        {/* Student Details */}
        <div className="bg-gray-700 border border-gray-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Student Details</h2>
          <div className="space-y-6">
            {students.map((student, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-600" data-student-section={index}>
                <h3 className="text-lg font-medium mb-3 text-white">Student {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      data-student-field={`${index}-studentName`}
                      value={student.studentName}
                      onChange={(e) => updateStudent(index, 'studentName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                      placeholder="Student name"
                    />
                    {errors[`student_${index}_studentName`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_studentName`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      data-student-field={`${index}-studentEmail`}
                      value={student.studentEmail}
                      onChange={(e) => updateStudent(index, 'studentEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                      placeholder="student@example.com"
                    />
                    {errors[`student_${index}_studentEmail`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_studentEmail`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      data-student-field={`${index}-studentPhone`}
                      value={student.studentPhone}
                      onChange={(e) => updateStudent(index, 'studentPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                      placeholder="10-digit phone"
                    />
                    {errors[`student_${index}_studentPhone`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_studentPhone`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      data-student-field={`${index}-rollNumber`}
                      value={student.rollNumber}
                      onChange={(e) => updateStudent(index, 'rollNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                      placeholder="Roll number"
                    />
                    {errors[`student_${index}_rollNumber`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_rollNumber`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Department *
                    </label>
                    <select
                      data-student-field={`${index}-department`}
                      value={student.department}
                      onChange={(e) => updateStudent(index, 'department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      
                      {/* Core Engineering Branches */}
                      <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Data Science and Engineering">Data Science and Engineering</option>
                      <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence and Machine Learning</option>
                      <option value="Cyber Security">Cyber Security</option>
                      
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Automobile Engineering">Automobile Engineering</option>
                      <option value="Production Engineering">Production Engineering</option>
                      <option value="Industrial Engineering">Industrial Engineering</option>
                      <option value="Manufacturing Engineering">Manufacturing Engineering</option>
                      
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Structural Engineering">Structural Engineering</option>
                      <option value="Transportation Engineering">Transportation Engineering</option>
                      <option value="Environmental Engineering">Environmental Engineering</option>
                      <option value="Construction Engineering">Construction Engineering</option>
                      
                      <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                      <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                      <option value="Power Engineering">Power Engineering</option>
                      
                      <option value="Chemical Engineering">Chemical Engineering</option>
                      <option value="Petrochemical Engineering">Petrochemical Engineering</option>
                      <option value="Process Engineering">Process Engineering</option>
                      <option value="Materials Science and Engineering">Materials Science and Engineering</option>
                      
                      <option value="Aerospace Engineering">Aerospace Engineering</option>
                      <option value="Aeronautical Engineering">Aeronautical Engineering</option>
                      <option value="Avionics Engineering">Avionics Engineering</option>
                      
                      <option value="Biomedical Engineering">Biomedical Engineering</option>
                      <option value="Biotechnology Engineering">Biotechnology Engineering</option>
                      <option value="Bioengineering">Bioengineering</option>
                      <option value="Genetic Engineering">Genetic Engineering</option>
                      
                      <option value="Marine Engineering">Marine Engineering</option>
                      <option value="Naval Architecture">Naval Architecture</option>
                      <option value="Ocean Engineering">Ocean Engineering</option>
                      
                      <option value="Mining Engineering">Mining Engineering</option>
                      <option value="Metallurgical Engineering">Metallurgical Engineering</option>
                      <option value="Geological Engineering">Geological Engineering</option>
                      <option value="Petroleum Engineering">Petroleum Engineering</option>
                      
                      <option value="Agricultural Engineering">Agricultural Engineering</option>
                      <option value="Food Technology">Food Technology</option>
                      <option value="Dairy Technology">Dairy Technology</option>
                      
                      <option value="Textile Engineering">Textile Engineering</option>
                      <option value="Fashion Technology">Fashion Technology</option>
                      <option value="Leather Technology">Leather Technology</option>
                      
                      <option value="Printing Technology">Printing Technology</option>
                      <option value="Packaging Technology">Packaging Technology</option>
                      <option value="Paper Technology">Paper Technology</option>
                      
                      <option value="Instrumentation and Control Engineering">Instrumentation and Control Engineering</option>
                      <option value="Automation and Robotics">Automation and Robotics</option>
                      <option value="Mechatronics Engineering">Mechatronics Engineering</option>
                      
                      <option value="Nuclear Engineering">Nuclear Engineering</option>
                      <option value="Energy Engineering">Energy Engineering</option>
                      <option value="Renewable Energy Engineering">Renewable Energy Engineering</option>
                      
                      <option value="Telecommunication Engineering">Telecommunication Engineering</option>
                      <option value="Network Engineering">Network Engineering</option>
                      <option value="Communication Systems">Communication Systems</option>
                      
                      <option value="Architecture">Architecture</option>
                      <option value="Urban Planning">Urban Planning</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Landscape Architecture">Landscape Architecture</option>
                      
                      <option value="Fire and Safety Engineering">Fire and Safety Engineering</option>
                      <option value="Safety and Systems Engineering">Safety and Systems Engineering</option>
                      
                      <option value="Engineering Physics">Engineering Physics</option>
                      <option value="Engineering Mathematics">Engineering Mathematics</option>
                      <option value="Engineering Chemistry">Engineering Chemistry</option>
                      
                      <option value="Other Engineering">Other Engineering</option>
                      <option value="Non-Engineering">Non-Engineering</option>
                    </select>
                    {errors[`student_${index}_department`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_department`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Year *
                    </label>
                    <select
                      data-student-field={`${index}-year`}
                      value={student.year}
                      onChange={(e) => updateStudent(index, 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                    {errors[`student_${index}_year`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_year`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Skills *
                    </label>
                    <input
                      type="text"
                      data-student-field={`${index}-skills`}
                      value={student.skills}
                      onChange={(e) => updateStudent(index, 'skills', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent"
                      placeholder="e.g., Java, Python, Web Development"
                    />
                    {errors[`student_${index}_skills`] && <p className="text-red-400 text-sm mt-1">{errors[`student_${index}_skills`]}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking conflicts warning */}
        {formData.internshipStartDate && formData.internshipEndDate && (
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">Booking Information</h3>
            {bookedDates.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-300">Current Bookings:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {bookedDates.map((booking, index) => (
                    <li key={index}>
                      • {booking.collegeName}: {booking.startDate} to {booking.endDate}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-300">No existing bookings found.</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2 bg-[#00b4ab] text-white rounded-md hover:bg-[#008a82] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Processing...' : `Pay ₹${calculateAmount().toLocaleString()} & Register`}
          </button>
        </div>
      </form>
    </div>
  );
}
