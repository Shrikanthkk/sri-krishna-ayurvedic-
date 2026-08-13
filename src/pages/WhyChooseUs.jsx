import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HeartHandshake, Award, MapPin, Calendar, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function WhyChooseUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="WHY CHOOSE US"
        title="Genuine Reasons Patients Trust Our Care"
        subtitle="Classical Ayurvedic principles, 26+ years experienced medical guidance, and transparent patient care in KR Puram."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Why Choose Us' }]} />

        {/* Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {clinicData.whyChooseUs.map((item) => (
            <div
              key={item.number}
              className="bg-white p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4 hover:-translate-y-1 transition-all duration-300"
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

        {/* Patient Trust Banner */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs text-brass-400 font-semibold uppercase tracking-widest block">PATIENT FIRST CLINIC</span>
            <h3 className="font-serif text-2xl font-light">Experience Authentic Ayurvedic Healthcare</h3>
            <p className="text-xs text-cream-200/80">Dr. Anand Krishna (BAMS)</p>
          </div>

          <Link
            to="/book-appointment"
            className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center shrink-0"
          >
            Book Your Consultation
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
