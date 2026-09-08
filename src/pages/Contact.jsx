import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Navigation, AlertCircle, Calendar, ExternalLink, Building2, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';
import { saveInquiry, getClinicSettings, cleanTenDigitPhone, validateTenDigitPhone } from '../utils/adminStorage';

export default function Contact() {
  const [settings, setSettings] = useState(getClinicSettings());
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const handleSettingsUpdated = (e) => {
      if (e.detail) setSettings(e.detail);
      else setSettings(getClinicSettings());
    };
    window.addEventListener('sk_clinic_settings_updated', handleSettingsUpdated);
    return () => window.removeEventListener('sk_clinic_settings_updated', handleSettingsUpdated);
  }, []);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRes = validateTenDigitPhone(formData.phone);
    if (!phoneRes.isValid) {
      setPhoneError(phoneRes.message);
      return;
    }

    setSubmitting(true);
    try {
      const saved = await saveInquiry(formData);
      setSubmittedInquiry(saved);
    } catch (err) {
      console.error('Error saving inquiry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUri = `https://wa.me/${clinicData.contact.whatsapp}?text=Hello%20Sri%20Krishna%20Ayurvedic%20Clinic,%20I%20would%20like%20to%20enquire%20about%20a%20consultation.`;
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="GET IN TOUCH"
        title="Contact Us"
        subtitle="Enquire about consultations, personalized therapy schedules, or direct clinic visits in KR Puram."
        bgImage="/images/hero_stock_2.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left Column: Practical Contact & Location Reference */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                DIRECT CONTACT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-forest-950">
                Clinic Details & Support
              </h2>
            </div>

            <div className="space-y-3 text-xs text-earth-800">
              
              {/* Phone Card */}
              <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-forest-950">Phone Calls & Inquiries</h3>
                  <div className="flex flex-col gap-1 text-xs">
                    {settings.phone && (
                      <p className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-brass-100 text-brass-800 px-1.5 py-0.2 rounded">Main</span>
                        <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} className="text-brass-700 font-bold hover:underline">
                          {settings.phone}
                        </a>
                      </p>
                    )}
                    {settings.altPhone && (
                      <p className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-forest-900 px-1.5 py-0.2 rounded">Alt 1</span>
                        <a href={`tel:${settings.altPhone.replace(/[^+\d]/g, '')}`} className="text-forest-950 font-semibold hover:underline">
                          {settings.altPhone}
                        </a>
                      </p>
                    )}
                    {settings.secondaryPhone && (
                      <p className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-forest-900 px-1.5 py-0.2 rounded">Alt 2</span>
                        <a href={`tel:${settings.secondaryPhone.replace(/[^+\d]/g, '')}`} className="text-forest-950 font-semibold hover:underline">
                          {settings.secondaryPhone}
                        </a>
                      </p>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 pt-0.5">{settings.workingHours || "Mon - Sat: 10:00 AM - 7:00 PM"}</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-forest-950">Email Inquiry</h3>
                  <a href={`mailto:${clinicData.contact.email}`} className="text-brass-700 font-bold hover:underline">
                    {clinicData.contact.email}
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">Response within 24 Hours</p>
                </div>
              </div>

              {/* Compact Location References */}
              <div className="p-4 bg-cream-100 rounded-2xl border border-earth-200 space-y-2.5">
                <h3 className="font-semibold text-sm text-forest-950 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brass-600" />
                  <span>KR Puram Locations</span>
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-forest-950 block">Main Address:</strong>
                    <span className="text-earth-700">{clinicData.contact.mainAddress.fullText}</span>
                  </div>
                  <div className="pt-2 border-t border-earth-200/80">
                    <strong className="text-forest-950 block">Branch Address:</strong>
                    <span className="text-earth-700">{clinicData.contact.branchAddress.fullText}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUri}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-soft"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Message</span>
              </a>

              <a
                href={telUri}
                className="px-5 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-elevated"
              >
                <Phone className="w-4 h-4 text-brass-400" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-2xl text-forest-950 font-light">
                Send a Message
              </h3>
            </div>

            {submittedInquiry ? (
              <div className="p-5 sm:p-6 bg-forest-950 text-cream-50 rounded-2xl space-y-4 text-center shadow-elevated border border-brass-500/20">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-cream-50 font-light">Message Sent</h4>
                  <p className="text-xs text-cream-200/90 leading-relaxed font-light max-w-md mx-auto">
                    Thank you, <strong>{submittedInquiry.name}</strong>. Your inquiry regarding "<strong>{submittedInquiry.subject}</strong>" has been recorded and sent to Dr. Anand Krishna.
                  </p>
                </div>

                <div className="pt-1 flex justify-center">
                  <button
                    onClick={() => {
                      setSubmittedInquiry(null);
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>

                {/* Thanking Note */}
                <div className="pt-3 border-t border-forest-800/80 max-w-md mx-auto space-y-1 text-xs text-brass-300 font-serif italic">
                  <div className="flex items-center justify-center gap-1.5 text-brass-400 not-italic">
                    <HeartHandshake className="w-4 h-4 text-brass-400" />
                    <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">Thank You</span>
                  </div>
                  <p>
                    Thank you for reaching out to Sri Krishna Ayurvedic Clinic! We appreciate your message and will respond promptly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-forest-950 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-forest-950 uppercase">Phone Number *</label>
                      <span className="text-[10px] text-earth-500 font-mono">
                        {formData.phone ? `${formData.phone.length}/10` : '10 digits'}
                      </span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="e.g. 9845012345"
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        phoneError ? 'border-red-500' : 'border-earth-200'
                      } focus:outline-none focus:border-forest-800 text-sm font-mono`}
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-forest-950 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-forest-950 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Consultation Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 uppercase mb-1">Message / Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your health question or preferred consultation time..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 focus:outline-none focus:border-forest-800 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold uppercase text-xs tracking-wider rounded-xl shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brass-400" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Practical Google Maps Section: Main Clinic & Branch Clinic */}
        <div className="space-y-6 mb-10">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              CLINIC LOCATIONS & DIRECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-forest-950">
              Find Us on Google Maps
            </h2>
            <p className="text-xs text-earth-700 font-light">
              Visit Dr. Anand Krishna at our Main Clinic or Anandapura Branch in KR Puram, Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. Main Clinic Location & Map */}
            <div className="rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white min-h-[380px] flex flex-col">
              <div className="p-4 sm:p-5 bg-forest-900 text-cream-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-800">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-ultra block">
                    MAIN CLINIC LOCATION & MAP
                  </span>
                  <div className="flex items-center gap-2 text-white font-serif text-base sm:text-lg font-medium">
                    <Building2 className="w-4.5 h-4.5 text-brass-400 shrink-0" />
                    <h3 className="truncate">Sri Krishna Ayurvedic Clinic — Main Address</h3>
                  </div>
                  <p className="text-xs text-cream-200/90 font-light flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span className="line-clamp-2 sm:truncate">{clinicData.contact.mainAddress.fullText}</span>
                  </p>
                </div>

                <a
                  href={clinicData.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 shrink-0 shadow-soft transition-all cursor-pointer"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <iframe
                src={clinicData.contact.mapEmbedSrc}
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Krishna Ayurvedic Clinic Main Address Map - No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, KR Puram, Bangalore 560036"
                className="w-full grow min-h-[320px]"
              />
            </div>

            {/* 2. Branch Clinic Location & Map */}
            <div className="rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white min-h-[380px] flex flex-col">
              <div className="p-4 sm:p-5 bg-forest-900 text-cream-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-800">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-ultra block">
                    BRANCH CLINIC LOCATION & MAP
                  </span>
                  <div className="flex items-center gap-2 text-white font-serif text-base sm:text-lg font-medium">
                    <Building2 className="w-4.5 h-4.5 text-brass-400 shrink-0" />
                    <h3 className="truncate">Sri Krishna Ayurvedic Clinic — Branch Address</h3>
                  </div>
                  <p className="text-xs text-cream-200/90 font-light flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span className="line-clamp-2 sm:truncate">{clinicData.contact.branchAddress.fullText}</span>
                  </p>
                </div>

                <a
                  href={clinicData.contact.branchGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 shrink-0 shadow-soft transition-all cursor-pointer"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <iframe
                src={clinicData.contact.branchMapEmbedSrc}
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Krishna Ayurvedic Clinic Branch Address Map - No. 98, Opp Kanti Sweets, T. C. Palya Main Road, Anandapura, KR Puram, Bangalore 560036"
                className="w-full grow min-h-[320px]"
              />
            </div>

          </div>
        </div>

        {/* Booking CTA Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl text-center space-y-3">
          <h3 className="font-serif text-2xl sm:text-3xl font-light">
            Book an Appointment Online
          </h3>
          <p className="text-xs text-cream-200/80 max-w-xl mx-auto font-light">
            Dr. Anand Krishna (BAMS) is available Monday – Saturday in KR Puram.
          </p>
          <div className="pt-1">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-widest rounded-full shadow-soft transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Go to Appointment Form</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
