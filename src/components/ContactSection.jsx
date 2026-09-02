import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Phone, Mail, Calendar, Clock, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { saveInquiry } from '../utils/adminStorage';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '10:00 AM – 1:00 PM',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await saveInquiry({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving contact request:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-cream-100/60 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Meta & Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                09 • Reach Out
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-forest-950 leading-tight">
                Request a Consultation
              </h2>
              <p className="text-earth-800 text-base font-light leading-relaxed">
                Fill in your details below. Our reception desk at KR Puram will call you to confirm your consultation slot with Dr. Anand Krishna (BAMS).
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-earth-200 text-xs sm:text-sm text-forest-950">
              <div className="flex items-start gap-4 p-4 bg-cream-50 rounded-2xl border border-earth-200">
                <Sparkles className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-semibold text-base text-forest-900">Direct Doctor Consultation</h4>
                  <p className="text-earth-700 text-xs mt-1">
                    Dr. Anand Krishna conducts Nadi Pariksha and evaluates root health causes during every appointment.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-earth-800">
                <p><strong>Clinic Address:</strong> {clinicData.contact.address}</p>
                <p><strong>Phone:</strong> {clinicData.contact.phone} <span className="text-gray-400">|</span> +91 74062 90626 <span className="text-gray-400">|</span> +91 98440 90626</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-cream-50 p-8 sm:p-10 rounded-3xl border border-earth-200 shadow-elevated"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif text-forest-950 font-light">
                  Request Received
                </h3>
                <p className="text-earth-800 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="font-semibold text-forest-900">{formData.fullName}</strong>. Your consultation request for <strong className="font-semibold text-forest-900">{formData.preferredDate}</strong> has been logged. Our staff will contact you at <strong className="font-semibold text-forest-900">{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      preferredDate: '',
                      preferredTime: '10:00 AM – 1:00 PM',
                      message: ''
                    });
                  }}
                  className="px-8 py-3 bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-forest-800 transition-colors"
                >
                  Send Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-forest-700/60" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                          errors.fullName ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-forest-700/60" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                          errors.phone ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-forest-700/60" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-forest-700/60" />
                      <input
                        type="date"
                        name="preferredDate"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                          errors.preferredDate ? 'border-red-500' : 'border-earth-200'
                        } rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950`}
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-forest-700/60" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950"
                    >
                      <option value="10:00 AM – 1:00 PM">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="2:00 PM – 4:30 PM">Afternoon (2:00 PM – 4:30 PM)</option>
                      <option value="5:00 PM – 7:00 PM">Evening (5:00 PM – 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-forest-950 uppercase tracking-wider mb-2">
                    Message / Health Symptoms
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide any details about your health concerns or past consultations..."
                    className="w-full p-4 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium text-xs tracking-ultra uppercase rounded-full shadow-elevated transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-4 h-4 text-brass-400" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
