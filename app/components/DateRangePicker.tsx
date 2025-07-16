'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  internshipDays: number;
  bookedDates: Array<{ startDate: string; endDate: string; collegeName: string }>;
  error?: string;
  className?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  internshipDays,
  bookedDates,
  error,
  className = ''
}: DateRangePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Get disabled dates from booked dates
  const getDisabledDates = (): Set<string> => {
    const disabled = new Set<string>();
    
    bookedDates.forEach(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      
      // Add all dates in the range
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        disabled.add(date.toISOString().split('T')[0]);
      }
    });
    
    return disabled;
  };

  const disabledDates = getDisabledDates();

  // Check if there are enough consecutive available days (excluding Sundays) starting from a date
  const hasConsecutiveAvailableDays = (selectedDate: Date): boolean => {
    let consecutiveDays = 0;
    let currentDate = new Date(selectedDate);
    
    // We need to find enough consecutive available days (excluding Sundays)
    while (consecutiveDays < internshipDays) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Skip Sundays but don't count them as consecutive days
      if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      
      // Check if current date is booked or unavailable
      if (disabledDates.has(dateStr)) {
        return false; // Found a booked day, sequence is broken
      }
      
      consecutiveDays++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return true;
  };

  // Check if a date range would conflict with booked dates or include Sundays
  const wouldConflictWithBookedDates = (selectedDate: Date): boolean => {
    return !hasConsecutiveAvailableDays(selectedDate);
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Don't allow past dates
    if (date < today) return;
    
    // Don't allow Sundays (day 0)
    if (date.getDay() === 0) return;
    
    // Don't allow disabled dates
    if (disabledDates.has(dateStr)) return;
    
    // Don't allow dates that don't have enough consecutive available days
    if (!hasConsecutiveAvailableDays(date)) return;
    
    // Calculate end date by counting working days (excluding Sundays)
    let workingDaysCount = 0;
    let currentDate = new Date(date);
    let endDate = new Date(date);
    
    while (workingDaysCount < internshipDays) {
      // Skip Sundays
      if (currentDate.getDay() !== 0) {
        workingDaysCount++;
        if (workingDaysCount === internshipDays) {
          endDate = new Date(currentDate);
          break;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    onStartDateChange(dateStr);
    onEndDateChange(endDate.toISOString().split('T')[0]);
    setShowCalendar(false);
  };

  const isDateInSelectedRange = (date: Date): boolean => {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return date >= start && date <= end && date.getDay() !== 0;
  };

  const isDateInHoverRange = (date: Date): boolean => {
    if (!hoveredDate) return false;
    
    // Calculate the end date for hover preview by counting working days
    let workingDaysCount = 0;
    let currentDate = new Date(hoveredDate);
    let hoverEnd = new Date(hoveredDate);
    
    while (workingDaysCount < internshipDays) {
      // Skip Sundays
      if (currentDate.getDay() !== 0) {
        workingDaysCount++;
        if (workingDaysCount === internshipDays) {
          hoverEnd = new Date(currentDate);
          break;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return date >= hoveredDate && date <= hoverEnd && date.getDay() !== 0;
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days: Date[] = [];
    
    // Add empty slots for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(new Date(0)); // Invalid date for empty slots
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDisplayDate = (): string => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return 'Select internship dates';
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b4ab] focus:border-transparent text-left flex items-center justify-between ${
          error 
            ? 'border-red-500 bg-red-50 text-red-900' 
            : 'border-gray-600 bg-gray-800 text-white'
        }`}
      >
        <span className={startDate && endDate ? 'text-white' : 'text-gray-400'}>
          {formatDisplayDate()}
        </span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 p-4"
            style={{ width: '300px' }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h3 className="text-lg font-semibold text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-400 text-center py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                const isValid = date.getTime() > 0;
                const dateStr = isValid ? date.toISOString().split('T')[0] : '';
                const isSunday = isValid && date.getDay() === 0;
                const isPastDate = isValid && date < today;
                const isBookedDate = isValid && disabledDates.has(dateStr);
                const hasNoConsecutiveDays = isValid && !isSunday && !isPastDate && !isBookedDate && !hasConsecutiveAvailableDays(date);
                const isDisabled = !isValid || isPastDate || isSunday || isBookedDate || hasNoConsecutiveDays;
                const isSelected = isValid && isDateInSelectedRange(date);
                const isHovered = isValid && !isDisabled && isDateInHoverRange(date);

                if (!isValid) {
                  return <div key={index} className="h-8"></div>;
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => !isDisabled && handleDateClick(date)}
                    onMouseEnter={() => !isDisabled && setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    disabled={isDisabled}
                    className={`h-8 text-sm rounded transition-colors duration-200 ${
                      isDisabled
                        ? isSunday 
                          ? 'text-red-400 cursor-not-allowed bg-red-900/20' 
                          : isPastDate
                          ? 'text-gray-500 cursor-not-allowed bg-gray-600'
                          : isBookedDate
                          ? 'text-gray-500 cursor-not-allowed bg-gray-700'
                          : hasNoConsecutiveDays
                          ? 'text-yellow-400 cursor-not-allowed bg-yellow-900/20'
                          : 'text-gray-500 cursor-not-allowed bg-gray-700'
                        : isSelected
                        ? 'bg-[#00b4ab] text-white'
                        : isHovered
                        ? 'bg-[#00b4ab]/30 text-white'
                        : 'text-white hover:bg-gray-700'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00b4ab] rounded"></div>
                <span>Selected range ({internshipDays} working days)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-700 rounded"></div>
                <span>Booked/Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-900/20 border border-red-400 rounded"></div>
                <span>Sundays (Closed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-900/20 border border-yellow-400 rounded"></div>
                <span>Insufficient consecutive days</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
