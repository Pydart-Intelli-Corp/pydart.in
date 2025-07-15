import { useState, useEffect } from 'react';
import { BookedDate } from '@/app/types/internship';
import { InternshipAPI } from '@/lib/api/internship';

export const useInternshipDates = () => {
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookedDates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await InternshipAPI.getBookedDates();
      if (response.success) {
        setBookedDates(response.bookedDates);
      } else {
        setError('Failed to fetch booked dates');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch booked dates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const isDateRangeAvailable = (startDate: Date, endDate: Date): boolean => {
    return !bookedDates.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      // Check if the date ranges overlap
      return (startDate <= bookingEnd && endDate >= bookingStart);
    });
  };

  const getNextAvailableDate = (requestedStartDate: Date): Date => {
    const conflictingBookings = bookedDates.filter(booking => {
      const bookingStart = new Date(booking.startDate);
      return bookingStart >= requestedStartDate;
    });

    if (conflictingBookings.length === 0) {
      return requestedStartDate;
    }

    // Sort by end date and find the latest end date
    conflictingBookings.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
    const latestEndDate = new Date(conflictingBookings[0].endDate);
    
    // Return the day after the latest conflict
    const nextAvailable = new Date(latestEndDate);
    nextAvailable.setDate(nextAvailable.getDate() + 1);
    
    return nextAvailable;
  };

  const getConflictingBookings = (startDate: Date, endDate: Date): BookedDate[] => {
    return bookedDates.filter(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      return (startDate <= bookingEnd && endDate >= bookingStart);
    });
  };

  return {
    bookedDates,
    loading,
    error,
    fetchBookedDates,
    isDateRangeAvailable,
    getNextAvailableDate,
    getConflictingBookings
  };
};
