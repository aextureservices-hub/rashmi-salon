import { useState, useCallback } from 'react';
import type { BookingState, BookingStep, BookingDetails } from '../types';
import { buildWhatsAppMessage, openWhatsApp } from '../utils/helpers';

const INITIAL_BOOKING: BookingState = {
  service: '',
  servicePrice: '',
  date: '',
  dateLabel: '',
  time: '',
};

export function useBooking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_BOOKING);
  const [details, setDetails] = useState({ name: '', phone: '', notes: '' });

  const selectService = useCallback((service: string, price: string) => {
    setBooking(prev => ({ ...prev, service, servicePrice: price }));
  }, []);

  const selectDate = useCallback((dateLabel: string, dateISO: string) => {
    setBooking(prev => ({ ...prev, date: dateISO, dateLabel }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setBooking(prev => ({ ...prev, time }));
  }, []);

  const updateDetails = useCallback((field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const goToStep = useCallback((step: BookingStep) => {
    setCurrentStep(step);
  }, []);

  const confirmBooking = useCallback((): boolean => {
    if (!details.name || !details.phone) return false;
    if (!booking.service || !booking.dateLabel || !booking.time) return false;
    setCurrentStep(5);
    return true;
  }, [details, booking]);

  const sendToWhatsApp = useCallback(() => {
    const fullDetails: BookingDetails = { ...booking, ...details };
    const message = buildWhatsAppMessage(fullDetails);
    openWhatsApp(message);
  }, [booking, details]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setBooking(INITIAL_BOOKING);
    setDetails({ name: '', phone: '', notes: '' });
  }, []);

  return {
    currentStep,
    booking,
    details,
    selectService,
    selectDate,
    selectTime,
    updateDetails,
    goToStep,
    confirmBooking,
    sendToWhatsApp,
    reset,
  };
}
