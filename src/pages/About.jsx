import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, MapPin, Navigation, ExternalLink, Calendar, PhoneCall, Phone, Mail, Clock, Building2, BookOpen, UserCheck, Camera, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <div className="w-full">
      <PageHero
        badge="ABOUT OUR CLINIC & DOCTOR"
        title="About Sri Krishna Ayurvedic Clinic"
        subtitle="Dedicated to authentic Ayurvedic healthcare, senior clinical leadership, why patients trust us, and accessible locations in KR Puram, Bangalore."
        bgImage="/images/hero_stock_3.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Quick Jump Sub-Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-8 border-b border-earth-200 mb-16 text-xs font-semibold uppercase tracking-wider">
          <a href="#company" className="px-5 py-2.5 rounded-full bg-cream-100 text-forest-950 hover:bg-forest-900 hover:text-cream-50 transition-colors shadow-sm">
            Company & Philosophy
          </a>
          <a href="#doctor" className="px-5 py-2.5 rounded-full bg-cream-100 text-forest-950 hover:bg-forest-900 hover:text-cream-50 transition-colors shadow-sm">
            Doctor Profile
          </a>
          <a href="#why-choose-us" className="px-5 py-2.5 rounded-full bg-cream-100 text-forest-950 hover:bg-forest-900 hover:text-cream-50 transition-colors shadow-sm">
            Why Choose Us
          </a>
          <a href="#locations" className="px-5 py-2.5 rounded-full bg-cream-100 text-forest-950 hover:bg-forest-900 hover:text-cream-50 transition-colors shadow-sm">
            Clinic Locations
          </a>
        </div>

        {/* 1. COMPANY / CLINIC STORY & PHILOSOPHY (#company) */}
        <section id="company" className="scroll-mt-32 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • ABOUT OUR COMPANY & CLINIC
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-forest-950 leading-tight">
                Traditional Ayurveda. Root-Cause Healing. Accessible Healthcare.
              </h2>
              <p className="text-earth-800 text-base leading-relaxed font-light">
                Established as a trusted center for authentic Ayurvedic healthcare in Krishnarajapuram (KR Puram), Bangalore, <strong>Sri Krishna Ayurvedic Clinic</strong> is committed to restoring wellness through classical diagnostic methods, time-honored botanical remedies, and personalized care regimens.
              </p>
              <p className="text-earth-800 text-base leading-relaxed font-light">
                Our medical approach is founded on the timeless principles of classical Ayurveda. Rather than suppressing superficial symptoms, we evaluate your unique physical constitution (*Prakriti*), digestive capacity (*Agni*), and internal balance to formulate targeted, sustainable healing paths.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm text-center">
                  <span className="text-2xl font-serif font-bold text-forest-900 block">26+ Yrs</span>
                  <span className="text-[11px] text-earth-600 uppercase font-semibold">Clinical Practice</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm text-center">
                  <span className="text-2xl font-serif font-bold text-forest-900 block">2 Centers</span>
                  <span className="text-[11px] text-earth-600 uppercase font-semibold">KR Puram Locations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-elevated border border-earth-200 aspect-[4/3] relative group bg-forest-950">
                <img
                  src={clinicData.images.shirodhara}
                  alt="Sri Krishna Ayurvedic Clinic Therapy Room"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-xs text-brass-400 font-semibold uppercase tracking-wider">Traditional Panchakarma</span>
                  <p className="font-serif text-xl font-light text-cream-50">Sri Krishna Ayurvedic Clinic</p>
                  <p className="text-xs text-cream-200/80">KR Puram, Bangalore</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. MEET OUR DOCTOR (#doctor) */}
        <section id="doctor" className="scroll-mt-32 py-16 border-t border-earth-200 mb-20">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              02 • SENIOR PHYSICIAN & MEDICAL LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-forest-950">
              Meet Our Doctor: Dr. Anand Krishna (BAMS)
            </h2>
            <p className="text-earth-800 text-base font-light">
              Consult directly with senior Ayurvedic physician Dr. Anand Krishna, bringing over two decades of dedicated clinical expertise to every patient.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Doctor Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-forest-900/10 rounded-3xl transform rotate-2 pointer-events-none" />

                <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-earth-200 aspect-[3/4] group">
                  <img
                    src={clinicData.images.doctor}
                    alt="Dr. Anand Krishna BAMS Senior Ayurvedic Physician"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50">
                    <span className="text-[10px] uppercase tracking-ultra text-brass-400 font-semibold mb-1">
                      Senior Ayurvedic Physician
                    </span>
                    <h3 className="font-serif text-2xl font-medium">
                      {clinicData.doctor.name}
                    </h3>
                    <p className="text-xs text-cream-200/80">
                      {clinicData.doctor.qualifications}
                    </p>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-forest-900 text-cream-50 p-5 rounded-2xl shadow-elevated border border-brass-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-800 text-brass-400 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-serif font-semibold text-brass-300">26+ Years</p>
                    <p className="text-[10px] text-cream-200/70 uppercase tracking-wider">Clinical Practice</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Bio & Expertise Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-light text-forest-950">
                  {clinicData.doctor.name}
                </h3>
                <div className="flex items-center gap-2 text-forest-800 font-medium text-sm">
                  <BookOpen className="w-4 h-4 text-brass-600" />
                  <span>{clinicData.doctor.qualifications}</span>
                  <span>•</span>
                  <UserCheck className="w-4 h-4 text-brass-600" />
                  <span>{clinicData.doctor.experienceYears}</span>
                </div>
              </div>

              <p className="text-base text-earth-800 leading-relaxed font-light">
                {clinicData.doctor.bio}
              </p>

              {/* Quote Card */}
              <div className="p-6 bg-cream-100 rounded-2xl border border-earth-200 space-y-2">
                <p className="font-serif italic text-base text-forest-900 leading-relaxed">
                  "{clinicData.doctor.quote}"
                </p>
                <p className="text-xs text-brass-600 uppercase tracking-widest font-semibold text-right">
                  — {clinicData.doctor.name}
                </p>
              </div>

              {/* Specialization List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-forest-950">
                  Areas of Clinical Expertise:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-earth-800">
                  {clinicData.doctor.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white rounded-xl border border-earth-200 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-forest-800 shrink-0" />
                      <span className="font-medium text-forest-900">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Consultation Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/book-appointment"
                  className="h-[46px] px-8 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs tracking-ultra uppercase -skew-x-12 shadow-elevated transition-all duration-300 hover:-translate-y-[1px] flex items-center justify-center gap-2 border-0 cursor-pointer"
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                    <Calendar className="w-4 h-4 text-brass-400" />
                    <span>Book Consultation (₹50)</span>
                  </span>
                </Link>

                <a
                  href={telUri}
                  className="h-[46px] px-8 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs tracking-ultra uppercase -skew-x-12 shadow-elevated transition-all duration-300 hover:-translate-y-[1px] flex items-center justify-center gap-2 border-0 cursor-pointer group"
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                    <PhoneCall className="w-4 h-4 text-forest-950 group-hover:scale-110 transition-transform" />
                    <span>☎ CALL ME</span>
                  </span>
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* 3. WHY CHOOSE US (#why-choose-us) */}
        <section id="why-choose-us" className="scroll-mt-32 py-16 border-t border-earth-200 mb-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • PATIENT TRUST & CLINICAL ADVANTAGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
              Why Patients Choose Our Clinic
            </h2>
            <p className="text-earth-800 text-base font-light">
              Six key reasons patients across KR Puram and Bangalore trust Sri Krishna Ayurvedic Clinic for their healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinicData.whyChooseUs.map((item) => (
              <div
                key={item.number}
                className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-4 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brass-600 uppercase tracking-widest">
                    {item.number} • REASON
                  </span>
                  <div className="w-8 h-8 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-forest-950 font-light">
                  {item.title}
                </h3>

                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CLINIC LOCATIONS & MAP SECTION (#locations) */}
        <section id="locations" className="scroll-mt-32 py-16 border-t border-earth-200 mb-20 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              04 • OUR CLINIC LOCATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
              Our Clinic Addresses in KR Puram
            </h2>
            <p className="text-earth-800 text-base font-light">
              Main Center at 3rd Main (Near Lakshmi Hospital) & Branch Center at T.C. Palya Main Road (Opp Kanti Sweets).
            </p>
          </div>

          {/* Main & Branch Address Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* MAIN CLINIC CARD */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3.5 py-1.5 bg-forest-900 text-brass-400 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                  MAIN CLINIC ADDRESS
                </span>

                <div className="flex items-center gap-3 text-forest-950 font-serif text-xl font-medium">
                  <Building2 className="w-5 h-5 text-brass-600 shrink-0" />
                  <h3>Sri Krishna Ayurvedic Clinic</h3>
                </div>

                <p className="text-sm text-earth-800 leading-relaxed font-light pl-3 border-l-2 border-brass-500">
                  {clinicData.contact.mainAddress.fullText}
                </p>

                <div className="space-y-2 text-xs text-forest-900 font-medium">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brass-600 shrink-0" />
                    <a href={`mailto:${clinicData.contact.email}`} className="hover:underline">
                      {clinicData.contact.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brass-600 shrink-0" />
                    <a href={telUri} className="hover:underline">
                      {clinicData.contact.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* BRANCH CLINIC CARD */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3.5 py-1.5 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                  BRANCH CLINIC ADDRESS
                </span>

                <div className="flex items-center gap-3 text-forest-950 font-serif text-xl font-medium">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3>Sri Krishna Ayurvedic Clinic</h3>
                </div>

                <p className="text-sm text-earth-800 leading-relaxed font-light pl-3 border-l-2 border-emerald-500">
                  {clinicData.contact.branchAddress.fullText}
                </p>

                <div className="space-y-2 text-xs text-forest-900 font-medium">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <a href={telUri} className="hover:underline">
                      {clinicData.contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* CRITICAL 50/50 LAYOUT: GOOGLE MAP (LEFT) + REAL CLINIC IMAGE (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE (50%): Real Interactive Google Maps Embed */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white min-h-[420px] flex flex-col">
              <div className="p-4 bg-forest-900 text-cream-50 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-brass-400" />
                  <span>Google Maps — KR Puram</span>
                </span>
                <a
                  href={clinicData.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-brass-400 hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <iframe
                src={clinicData.contact.mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Krishna Ayurvedic Clinic Google Map Location"
                className="w-full grow"
              />
            </div>

            {/* RIGHT SIDE (50%): Real Existing Clinic Image from Project Assets */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white relative flex flex-col group min-h-[420px]">
              <div className="p-4 bg-forest-950 text-cream-50 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                  <Camera className="w-4 h-4 text-brass-400" />
                  <span>Real Clinic Signboard & Exterior</span>
                </span>
                <span className="text-[10px] text-brass-400 font-bold uppercase">Reg No: 13199</span>
              </div>

              <div className="relative grow overflow-hidden bg-forest-950">
                <img
                  src="/images/clinic_front.jpg"
                  alt="Sri Krishna Ayurvedic Clinic Signboard"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50 pointer-events-none">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">
                    Authentic Building Entrance
                  </span>
                  <h4 className="font-serif text-xl font-medium text-cream-50 leading-tight">
                    Sri Krishna Ayurvedic Clinic
                  </h4>
                  <p className="text-xs text-cream-200/80 mt-1">
                    Dr. Anand Krishna (BAMS) • Dhanvantari Road, KR Puram
                  </p>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 5. Consultation CTA */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-light">Book Your Ayurvedic Consultation</h3>
            <p className="text-xs text-cream-200/80">Mon - Sat 10:00 AM - 7:00 PM • KR Puram, Bangalore</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/book-appointment"
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={telUri}
              className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
