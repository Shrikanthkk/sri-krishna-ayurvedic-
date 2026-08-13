import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartHandshake, Award, Calendar, Phone, CheckCircle2, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import Hero from '../components/Hero';
import { clinicData } from '../data/clinicData';
import { getStoredTreatments } from '../utils/adminStorage';

export default function Home({ onOpenBooking }) {
  const [treatmentsList, setTreatmentsList] = useState([]);

  useEffect(() => {
    setTreatmentsList(getStoredTreatments());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* 1. HERO SLIDER */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. ABOUT US INTRO HIGHLIGHT */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                  WELCOME TO SRI KRISHNA AYURVEDIC CLINIC
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-forest-950 leading-tight">
                  Authentic Ayurveda & Nadi Pariksha Care
                </h2>
              </div>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                For over 26 years, Dr. Anand Krishna (BAMS) has provided compassionate, transparent Ayurvedic consultations in KR Puram. Our practice focuses on understanding root causes through ancient pulse diagnosis, classical Panchakarma detox, and tailored herbal regimens.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-cream-100/80 rounded-xl border border-earth-200">
                  <span className="block font-serif text-2xl text-forest-900 font-medium">26+ Years</span>
                  <span className="text-xs text-earth-700 font-light">Clinical Experience</span>
                </div>

              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-elevated"
                >
                  <span>Learn More About Our Doctor & Clinic</span>
                  <ArrowRight className="w-4 h-4 text-brass-400" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[16/10] relative group">
                <img
                  src={clinicData.images.shirodhara}
                  alt="Sri Krishna Ayurvedic Clinic Therapy Room"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 editorial-overlay flex items-end p-6">
                  <div className="text-cream-50">
                    <p className="font-serif text-lg">Sri Krishna Ayurvedic Clinic</p>
                    <p className="text-xs text-brass-400">KR Puram, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PATIENT-CENTRIC CARE */}
      <section className="py-20 bg-cream-100/70 border-t border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              OUR APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
              Patient-Centric Care
            </h2>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Ayurveda views health not merely as the absence of illness, but as a dynamic equilibrium between physical constitution (Prakriti), digestive capacity (Agni), and mental wellbeing. At Sri Krishna Ayurvedic Clinic, every consultation begins with evaluating your unique body composition and lifestyle factors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-medium text-forest-950">Personalised Consultations</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                No two individuals share identical constitutions. Consultations are structured around your unique Nadi evaluation, daily routine, and health history.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-medium text-forest-950">Classical Formulations</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                We utilize authentic Ayurvedic herbs and classical preparations prepared according to traditional textual guidelines.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-medium text-forest-950">26+ Years Trust</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Guided directly by Dr. Anand Krishna (BAMS), providing compassionate and transparent clinical care in KR Puram.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR CORE HEALING PRINCIPLES */}
      <section className="py-20 bg-cream-50 border-t border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
              Our Core Healing Principles
            </h2>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Four guiding principles that shape every diagnosis, treatment plan, and patient recommendation at our clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clinicData.pillars.map((pillar) => (
              <div key={pillar.number} className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-3 hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold text-brass-600 uppercase tracking-widest block">
                  {pillar.number} • PILLAR
                </span>
                <h3 className="font-serif text-xl font-medium text-forest-950">
                  {pillar.title}
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FEATURED TREATMENTS */}
      <section className="py-20 bg-cream-100/60 border-t border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                CORE CLINICAL SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
                Key Treatments & Diagnostic Therapies
              </h2>
            </div>

            <Link
              to="/treatments"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-900 hover:text-emerald-700 uppercase tracking-widest"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentsList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-brass-600 uppercase tracking-widest block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-forest-950 font-light group-hover:text-forest-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-earth-800 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-earth-200 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">{item.duration}</span>
                  <Link
                    to="/treatments"
                    className="text-xs font-bold text-forest-900 group-hover:text-emerald-600 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CANCER CARE HIGHLIGHT */}
      <section className="py-20 bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest-900 border border-brass-500/30 text-brass-400 text-xs font-semibold uppercase tracking-widest">
                SPECIALIZED SUPPORT
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-cream-50 leading-tight">
                Integrative Cancer Care & Supportive Consultation
              </h2>
              <p className="text-cream-200/80 text-base font-light leading-relaxed">
                We provide personalized Ayurvedic consultation and traditional wellness care for individuals seeking supportive approaches alongside primary oncological treatment.
              </p>

              <div className="p-4 bg-forest-900/80 border-l-4 border-brass-500 rounded-r-xl text-xs text-cream-200">
                <strong>Medical Notice:</strong> Ayurvedic consultations provide supportive care and do not replace medically recommended cancer diagnosis or treatment.
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/treatments/cancer-care"
                  className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all"
                >
                  Learn About Cancer Approach →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-forest-900 p-8 rounded-3xl border border-forest-800 space-y-4">
              <h3 className="font-serif text-2xl text-cream-50 font-light">Swarnamrutha Prashana</h3>
              <p className="text-xs text-cream-200/80 font-light leading-relaxed">
                Pediatric gold-infused botanical liquid drops for children's memory, digestion, and seasonal immunity.
              </p>
              <Link
                to="/treatments/swarnamrutha"
                className="inline-block text-xs font-bold text-brass-400 hover:text-white uppercase tracking-wider"
              >
                View Swarnamrutha Care →
              </Link>
            </div>

          </div>
        </div>
      </section>

    </motion.div>
  );
}
