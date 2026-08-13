import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle, Sparkles, HeartHandshake } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { saveAppointment, getStoredTreatments } from '../utils/adminStorage';

export default function BookingModal({ isOpen, onClose, selectedTreatment = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    treatment: selectedTreatment || 'General Consultation',
    preferredDate: '',
    preferredTime: '10:30 AM',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAppointment, setSavedAppointment] = useState(null);
  const [treatmentsList, setTreatmentsList] = useState([]);

  useEffect(() => {
    setTreatmentsList(getStoredTreatments());
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (10 digits)';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Save to Admin Storage
    const created = saveAppointment({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      treatment: formData.treatment,
      date: formData.preferredDate,
      timeSlot: formData.preferredTime,
      notes: formData.notes
    });

    setSavedAppointment(created);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSavedAppointment(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      treatment: 'General Consultation',
      preferredDate: '',
      preferredTime: '10:30 AM',
      notes: ''
    });
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
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit Mobile Number"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.phone ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400`}
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
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                          errors.preferredDate ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950`}
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-1">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-forest-700/60" />
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950"
                      >
                        <option value="10:30 AM">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="03:00 PM">Afternoon (2:00 PM – 4:30 PM)</option>
                        <option value="05:30 PM">Evening (5:00 PM – 7:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

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
                <p className="text-[11px] text-gray-500 italic">

                </p>

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
