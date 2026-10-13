import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle, Sparkles, HeartHandshake, AlertCircle } from 'lucide-react';
import { saveAppointment, getStoredTreatments, fetchTreatmentsFromDb, cleanTenDigitPhone, validateTenDigitPhone } from '../utils/adminStorage';

const MODAL_TIME_SLOTS = [
  { value: '10:30 AM', label: 'Morning 10:30 AM (10:00 AM – 1:00 PM)', hour: 10, minute: 30 },
  { value: '03:00 PM', label: 'Afternoon 03:00 PM (2:00 PM – 4:30 PM)', hour: 15, minute: 0 },
  { value: '05:30 PM', label: 'Evening 05:30 PM (5:00 PM – 7:00 PM)', hour: 17, minute: 30 }
];

export const getModalTodayDateString = () => {
  const now = new Date();
  const yr = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const da = String(now.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
};

export const isModalSlotPassed = (slot, selectedDate) => {
  if (!selectedDate) return false;
  const todayStr = getModalTodayDateString();
  if (selectedDate < todayStr) return true;
  if (selectedDate > todayStr) return false;

  const now = new Date();
  const curHour = now.getHours();
  const curMin = now.getMinutes();
  if (curHour > slot.hour) return true;
  if (curHour === slot.hour && curMin >= slot.minute) return true;
  return false;
};

export const getModalInitialDateAndSlot = () => {
  const today = getModalTodayDateString();
  const availableToday = MODAL_TIME_SLOTS.find(s => !isModalSlotPassed(s, today));
  if (availableToday) {
    return { date: today, timeSlot: availableToday.value };
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yr = tomorrow.getFullYear();
  const mo = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const da = String(tomorrow.getDate()).padStart(2, '0');
  return { date: `${yr}-${mo}-${da}`, timeSlot: MODAL_TIME_SLOTS[0].value };
};

export default function BookingModal({ isOpen, onClose, selectedTreatment = '' }) {
  const todayStr = getModalTodayDateString();
  const initial = getModalInitialDateAndSlot();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    treatment: selectedTreatment || 'General Consultation',
    preferredDate: initial.date,
    preferredTime: initial.timeSlot,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAppointment, setSavedAppointment] = useState(null);
  const [treatmentsList, setTreatmentsList] = useState([]);

  useEffect(() => {
    setTreatmentsList(getStoredTreatments());
    fetchTreatmentsFromDb().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setTreatmentsList(data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment]);

  // Lock background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = cleanTenDigitPhone(value);
      setFormData((prev) => ({ ...prev, phone: cleaned }));

      if (cleaned.length === 10) {
        const valRes = validateTenDigitPhone(cleaned);
        setErrors((prev) => ({ ...prev, phone: valRes.isValid ? '' : valRes.message }));
      } else if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: '' }));
      }
      return;
    }

    if (name === 'preferredDate') {
      const currentSlotObj = MODAL_TIME_SLOTS.find(s => s.value === formData.preferredTime);
      let nextSlot = formData.preferredTime;
      if (currentSlotObj && isModalSlotPassed(currentSlotObj, value)) {
        const available = MODAL_TIME_SLOTS.find(s => !isModalSlotPassed(s, value));
        if (available) {
          nextSlot = available.value;
        }
      }
      setFormData((prev) => ({ ...prev, preferredDate: value, preferredTime: nextSlot }));
      if (value < todayStr) {
        setErrors((prev) => ({ ...prev, preferredDate: 'Past dates cannot be selected. Please choose today or a future date.' }));
      } else {
        setErrors((prev) => ({ ...prev, preferredDate: '', preferredTime: '' }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    const phoneRes = validateTenDigitPhone(formData.phone);
    if (!phoneRes.isValid) {
      newErrors.phone = phoneRes.message;
    }

    if (!formData.preferredDate || formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'Please select today or a future date. Past dates are not allowed.';
    }

    const selectedSlotObj = MODAL_TIME_SLOTS.find(s => s.value === formData.preferredTime);
    if (selectedSlotObj && isModalSlotPassed(selectedSlotObj, formData.preferredDate)) {
      newErrors.preferredTime = 'The selected time slot has already passed for today. Please select an upcoming slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));
    
    try {
      const now = new Date();
      const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      const currentFormattedDate = getModalTodayDateString();
      const submittedAtStr = `${currentFormattedDate} ${currentFormattedTime}`;

      // Save appointment (directly with fallback resilience)
      const created = await saveAppointment({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        treatment: formData.treatment,
        date: formData.preferredDate,
        timeSlot: formData.preferredTime,
        notes: formData.notes,
        submittedAt: submittedAtStr
      });

      if (created) {
        setSavedAppointment(created);
        setIsSubmitted(true);
      } else {
        setErrors((prev) => ({ ...prev, submit: 'Unable to process appointment booking. Please try again.' }));
      }
    } catch (err) {
      console.error('Error saving appointment:', err);
      setErrors((prev) => ({ ...prev, submit: err.message || 'Error saving appointment. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSavedAppointment(null);
    const freshInitial = getModalInitialDateAndSlot();
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      treatment: 'General Consultation',
      preferredDate: freshInitial.date,
      preferredTime: freshInitial.timeSlot,
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-forest-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-cream-50 rounded-2xl shadow-elevated border border-earth-200 overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="bg-forest-900 text-cream-50 p-6 sm:p-8 relative">
            <button
              onClick={resetForm}
              className="absolute top-6 right-6 p-2 rounded-full text-cream-200 hover:text-cream-50 hover:bg-forest-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-brass-400 text-xs font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Sri Krishna Ayurvedic Clinic</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-cream-50">
              Schedule Your Consultation
            </h2>
            <p className="text-cream-200 text-xs sm:text-sm mt-1">
              KR Puram, Bangalore • Doctor: Dr. Anand Krishna (BAMS)
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 px-4 space-y-5"
              >
                <div className="w-16 h-16 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-serif text-forest-900 font-light">
                  Appointment Done
                </h3>
                <p className="text-forest-800 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="font-semibold">{formData.fullName}</strong>. Your request for <strong className="font-semibold">{formData.preferredDate} ({formData.preferredTime})</strong> has been saved (Booking ID: <code className="text-brass-700 font-mono font-bold">{savedAppointment?.id}</code>).
                </p>

                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="px-8 py-3.5 bg-forest-900 text-cream-50 font-bold text-xs tracking-widest uppercase rounded-full hover:bg-forest-800 transition-all shadow-soft cursor-pointer"
                  >
                    Done
                  </button>
                </div>

                {/* Thanking Note at Bottom */}
                <div className="pt-4 border-t border-earth-200 max-w-md mx-auto space-y-1 text-xs text-brass-700 font-serif italic">
                  <div className="flex items-center justify-center gap-1.5 text-brass-800 not-italic">
                    <HeartHandshake className="w-4 h-4 text-brass-600" />
                    <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">Thank You</span>
                  </div>
                  <p>
                    Thank you for booking your consultation with Sri Krishna Ayurvedic Clinic! We look forward to welcoming you.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Rao"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.fullName ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <span className="text-[10px] text-earth-500 font-mono">
                        {formData.phone ? `${formData.phone.length}/10` : '10 digits'}
                      </span>
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <input
                        type="tel"
                        name="phone"
                        maxLength={15}
                        inputMode="numeric"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9845012345"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.phone ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400 font-mono`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Treatment Select */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Treatment / Service
                    </label>
                    <select
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950"
                    >
                      <option value="General Consultation">General Ayurvedic Consultation</option>
                      {treatmentsList.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <input
                        type="date"
                        name="preferredDate"
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.preferredDate ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950`}
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.preferredDate}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.preferredTime ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950`}
                      >
                        {MODAL_TIME_SLOTS.map((slot) => {
                          const passed = isModalSlotPassed(slot, formData.preferredDate);
                          return (
                            <option
                              key={slot.value}
                              value={slot.value}
                              disabled={passed}
                              className={passed ? 'text-gray-400 bg-gray-100 italic' : 'text-forest-950'}
                            >
                              {slot.label} {passed ? '— (Passed / Unavailable)' : ''}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {errors.preferredTime && <p className="text-red-500 text-xs mt-1 font-medium">{errors.preferredTime}</p>}
                  </div>
                </div>

                {formData.preferredDate === todayStr && MODAL_TIME_SLOTS.every(s => isModalSlotPassed(s, formData.preferredDate)) && (
                  <div className="p-3 bg-amber-500/10 border border-amber-600/40 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>All consultation slots for today have completed. Please pick tomorrow or an upcoming date.</span>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                    Health Concerns / Message (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Briefly describe your symptoms or health goals..."
                    className="w-full p-3 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Notice */}
                {errors.submit && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errors.submit}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 text-xs font-semibold text-forest-900 tracking-wider uppercase hover:bg-earth-100 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium text-xs tracking-widest uppercase rounded-full shadow-soft transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <span>Confirm Request</span>
                        <Sparkles className="w-4 h-4 text-brass-400" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
