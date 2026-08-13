import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle2, BookOpen, UserCheck, PhoneCall } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function DoctorSection({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <section id="doctor" className="py-24 bg-cream-100/60 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Credentials Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Backing Frame */}
              <div className="absolute -inset-4 bg-forest-900/10 rounded-3xl transform rotate-2 pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[3/4] group">
                <img
                  src={clinicData.images.doctor}
                  alt="Dr. Anand Krishna BAMS Senior Ayurvedic Physician"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] uppercase tracking-ultra text-brass-400 font-semibold mb-1">
                    Chief Physician
                  </span>
                  <h3 className="font-serif text-2xl font-medium">
                    {clinicData.doctor.name}
                  </h3>
                  <p className="text-xs text-cream-200/80">
                    {clinicData.doctor.qualifications}
                  </p>
                </div>
              </div>

              {/* Floating Experience Badge */}
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
          </motion.div>

          {/* Right Column: Verified Practitioner Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                04 • Practitioner Profile
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-forest-950 leading-tight">
                Meet Your Physician: {clinicData.doctor.name}
              </h2>
              <div className="flex items-center gap-2 text-forest-800 font-medium text-sm">
                <BookOpen className="w-4 h-4 text-brass-600" />
                <span>{clinicData.doctor.qualifications}</span>
                <span>•</span>
                <UserCheck className="w-4 h-4 text-brass-600" />
                <span>{clinicData.doctor.experienceYears}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-earth-800 leading-relaxed font-light">
              {clinicData.doctor.bio}
            </p>

            {/* Doctor Quote Card */}
            <div className="p-6 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <p className="font-serif italic text-base sm:text-lg text-forest-900 leading-relaxed">
                "{clinicData.doctor.quote}"
              </p>
              <p className="text-xs text-brass-600 uppercase tracking-widest font-semibold text-right">
                — {clinicData.doctor.name}
              </p>
            </div>

            {/* Specialization List */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-forest-950">
                Core Clinical Specializations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-earth-800">
                {clinicData.doctor.specialties.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-white/80 rounded-xl border border-earth-200">
                    <CheckCircle2 className="w-4 h-4 text-forest-800 shrink-0" />
                    <span className="font-medium text-forest-900">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Book Consultation + CALL ME matching existing website primary button style */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="h-[46px] px-8 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs tracking-ultra uppercase -skew-x-12 shadow-elevated transition-all duration-300 hover:-translate-y-[1px] flex items-center justify-center border-0 cursor-pointer"
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-brass-400" />
                  <span>Book Consultation</span>
                </span>
              </button>

              {/* CALL ME Button (Matches website primary button style, slanted shape, and color system) */}
              <a
                href={telUri}
                className="h-[46px] px-8 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs tracking-ultra uppercase -skew-x-12 shadow-elevated transition-all duration-300 hover:-translate-y-[1px] flex items-center justify-center border-0 cursor-pointer group"
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                  <PhoneCall className="w-4 h-4 text-forest-950 group-hover:scale-110 transition-transform" />
                  <span>☎ CALL ME</span>
                </span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
