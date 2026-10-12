import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';
import { saveAppointment, getStoredTreatments, fetchTreatmentsFromDb, cleanTenDigitPhone, validateTenDigitPhone } from '../utils/adminStorage';

const TIME_SLOTS = [
  { value: '10:00 AM', label: 'Morning 10:00 AM', hour: 10, minute: 0 },
  { value: '11:30 AM', label: 'Morning 11:30 AM', hour: 11, minute: 30 },
  { value: '02:00 PM', label: 'Afternoon 02:00 PM', hour: 14, minute: 0 },
  { value: '04:00 PM', label: 'Evening 04:00 PM', hour: 16, minute: 0 },
  { value: '06:00 PM', label: 'Evening 06:00 PM', hour: 18, minute: 0 }
];

export const getTodayDateString = () => {
  const now = new Date();
  const yr = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const da = String(now.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
};

export const isSlotPassed = (slot, selectedDate) => {
  if (!selectedDate) return false;
  const todayStr = getTodayDateString();
  if (selectedDate < todayStr) return true; // Past date
  if (selectedDate > todayStr) return false; // Future date
  
  // Selected date is today: compare against current time
  const now = new Date();
  const curHour = now.getHours();
  const curMin = now.getMinutes();
  if (curHour > slot.hour) return true;
  if (curHour === slot.hour && curMin >= slot.minute) return true;
  return false;
};

export default function BookAppointment() {
  const todayStr = getTodayDateString();
  const initialAvailableSlot = TIME_SLOTS.find(s => !isSlotPassed(s, todayStr))?.value || TIME_SLOTS[0].value;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: todayStr,
    timeSlot: initialAvailableSlot,
    treatment: 'Chronic Diseases – Joint Pains (Arthritis)',
    notes: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [submittedAppointment, setSubmittedAppointment] = useState(null);
  const [treatmentsList, setTreatmentsList] = useState([]);

  useEffect(() => {
    setTreatmentsList(getStoredTreatments());
    fetchTreatmentsFromDb().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setTreatmentsList(data);
      }
    });
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    const cleaned = cleanTenDigitPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: cleaned }));

    if (cleaned.length >= 3 && /^(\d)\1+$/.test(cleaned)) {
      setPhoneError('Repeated digits are not allowed. Please enter a genuine mobile number.');
      return;
    }

    if (cleaned.length === 10) {
      const valRes = validateTenDigitPhone(cleaned);
      setPhoneError(valRes.isValid ? '' : valRes.message);
    } else if (phoneError) {
      setPhoneError('');
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateError('');
    setTimeError('');

    if (newDate < todayStr) {
      setDateError('Past dates cannot be selected. Please choose today or a future date.');
    }

    // Check if current slot is passed for this newly selected date
    const currentSlotObj = TIME_SLOTS.find(s => s.value === formData.timeSlot);
    let nextSlot = formData.timeSlot;
    if (currentSlotObj && isSlotPassed(currentSlotObj, newDate)) {
      const available = TIME_SLOTS.find(s => !isSlotPassed(s, newDate));
      if (available) {
        nextSlot = available.value;
      }
    }

    setFormData(prev => ({ ...prev, date: newDate, timeSlot: nextSlot }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDateError('');
    setTimeError('');

    const phoneRes = validateTenDigitPhone(formData.phone);
    if (!phoneRes.isValid) {
      setPhoneError(phoneRes.message);
      return;
    }

    if (!formData.date || formData.date < todayStr) {
      setDateError('Past dates cannot be booked. Please select today or a future date.');
      return;
    }

    const selectedSlotObj = TIME_SLOTS.find(s => s.value === formData.timeSlot);
    if (selectedSlotObj && isSlotPassed(selectedSlotObj, formData.date)) {
      setTimeError('The selected time slot has already passed for today. Please select an upcoming slot.');
      return;
    }

    setSubmitting(true);
    try {
      const now = new Date();
      const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      const currentFormattedDate = getTodayDateString();
      const submittedAtStr = `${currentFormattedDate} ${currentFormattedTime}`;

      const saved = await saveAppointment({
        ...formData,
        submittedAt: submittedAtStr
      });
      setSubmittedAppointment(saved);
    } catch (err) {
      console.error('Error booking appointment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUri = `https://wa.me/${clinicData.contact.whatsapp}?text=Hello%20Sri%20Krishna%20Ayurvedic%20Clinic,%20I%20have%20submitted%20an%20appointment%20request%20for%20${encodeURIComponent(formData.name)}%20on%20${encodeURIComponent(formData.date)}.`;
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="CONSULTATION BOOKING"
        title="Schedule Your Ayurvedic Consultation"
        subtitle="Book a personal consultation with Dr. Anand Krishna (BAMS). Mon - Sat 10 AM - 7 PM."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Book Appointment' }]} />

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-earth-200 pb-4 mb-6 gap-3">
            <div>
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                Official Appointment Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Patient & Schedule Details
              </h2>
            </div>
          </div>

          {submittedAppointment ? (
            <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-2xl space-y-5 text-center shadow-elevated border border-brass-500/20">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-cream-50">Appointment Done</h3>
                <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed font-light">
                  Your appointment request for <strong>{submittedAppointment.name}</strong> on <strong>{submittedAppointment.date} ({submittedAppointment.timeSlot})</strong> has been saved successfully (Booking ID: <code className="text-brass-300 font-mono font-bold">{submittedAppointment.id}</code>).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <a
                  href={whatsappUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all"
                >
                  Confirm Via WhatsApp
                </a>
                <a
                  href={telUri}
                  className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full border border-forest-700 transition-all"
                >
                  Call Clinic Directly ({clinicData.contact.phone})
                </a>
              </div>

              {/* Thanking Note at Bottom */}
              <div className="pt-4 border-t border-forest-800/80 max-w-md mx-auto space-y-1 text-xs text-brass-300 font-serif italic">
                <div className="flex items-center justify-center gap-1.5 text-brass-400 not-italic">
                  <HeartHandshake className="w-4 h-4 text-brass-400" />
                  <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">Thank You</span>
                </div>
                <p>
                  Thank you for booking your consultation with Sri Krishna Ayurvedic Clinic! We look forward to welcoming you for your personalized healing care.
                </p>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">
                    Patient Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-forest-950 uppercase">
                      Phone Number *
                    </label>
                    <span className="text-[10px] text-earth-500 font-mono">
                      {formData.phone ? `${formData.phone.length}/10` : '10 digits'}
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="e.g. 9845012345"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${
                        phoneError ? 'border-red-500' : 'border-earth-200'
                      } focus:outline-none focus:border-forest-800 text-sm font-mono`}
                    />
                  </div>
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@domain.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">
                    Select Service / Treatment
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm bg-white"
                  >
                    {treatmentsList.map((t) => (
                      <option key={t.id} value={t.title}>{t.title}</option>
                    ))}
                    <option value="General Ayurvedic Consultation">General Ayurvedic Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.date}
                      onChange={handleDateChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${dateError ? 'border-red-500' : 'border-earth-200'} focus:outline-none focus:border-forest-800 text-sm`}
                    />
                  </div>
                  {dateError && <p className="text-red-500 text-xs mt-1 font-medium">{dateError}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => {
                        setFormData({ ...formData, timeSlot: e.target.value });
                        setTimeError('');
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${timeError ? 'border-red-500' : 'border-earth-200'} focus:outline-none focus:border-forest-800 text-sm bg-white`}
                    >
                      {TIME_SLOTS.map((slot) => {
                        const passed = isSlotPassed(slot, formData.date);
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
                  {timeError && <p className="text-red-500 text-xs mt-1 font-medium">{timeError}</p>}
                </div>
              </div>

              {formData.date === todayStr && TIME_SLOTS.every(s => isSlotPassed(s, formData.date)) && (
                <div className="p-3 bg-amber-500/10 border border-amber-600/40 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>All consultation slots for today have completed. Please pick tomorrow or an upcoming date.</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-forest-950 uppercase mb-1">
                  Health Concerns / Special Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe any existing conditions or preferred topics for Dr. Anand Krishna..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-soft transition-all cursor-pointer"
              >
                Submit Consultation Request
              </button>
            </form>
          )}

        </div>
      </div>
    </motion.div>
  );
}
