import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { getStoredTreatments } from '../utils/adminStorage';

export default function Treatments({ onOpenBooking }) {
  const [treatmentsList, setTreatmentsList] = useState([]);

  useEffect(() => {
    setTreatmentsList(getStoredTreatments());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <PageHero
        badge="CLASSICAL AYURVEDA"
        title="All Ayurvedic Treatments"
        subtitle="Personalized Ayurvedic care for chronic diseases, skin and hair concerns, wellness, diabetes and supportive cancer care."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'All Treatments' }]} />

        {/* Introduction Banner */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-earth-200 shadow-elevated mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-brass-500" />
            <span>Root-Cause Evaluation & Personalized Regimens</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-forest-950">
            All Ayurvedic Treatments
          </h1>
          <p className="text-earth-800 text-sm font-light leading-relaxed">
            Personalized Ayurvedic care for chronic diseases, skin and hair concerns, wellness, diabetes and supportive cancer care. Under the clinical leadership of senior physician Dr. Anand Krishna (BAMS, 26+ years experience), each treatment regimen is customized to your unique constitution (<em>Prakriti</em>) and underlying Dosha balance.
          </p>
        </div>

        {/* Exactly 7 Treatment Cards Grid */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Treatment Categories
            </h2>
            <span className="text-xs font-semibold text-brass-700 uppercase tracking-wider">
              7 Dedicated Therapies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-earth-200 shadow-elevated overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
              >
                {item.image && (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-sm text-brass-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-brass-400/30 shadow-md">
                      {item.number} • THERAPY
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-brass-600 uppercase tracking-widest block">
                      {item.subtitle}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-light group-hover:text-forest-800 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-earth-800 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {item.benefits && item.benefits.length > 0 && (
                      <ul className="space-y-1.5 pt-2 border-t border-earth-100 text-[11px] text-earth-800 font-light">
                        {item.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-earth-200 flex items-center justify-between">
                    <Link
                      to={item.link}
                      className="w-full text-center py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-600"
                    >
                      <span>{item.buttonText}</span>
                      <ArrowRight className="w-4 h-4 text-brass-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
