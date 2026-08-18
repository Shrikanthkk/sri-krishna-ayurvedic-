import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, ShieldAlert, HeartHandshake } from 'lucide-react';
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
    >
      <PageHero
        badge="CLASSICAL AYURVEDA"
        title="Treatments & Clinical Therapies"
        subtitle="Classical Nadi Pariksha, Panchakarma detoxification, joint pain care, and specialized supportive care in KR Puram, Bangalore."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Treatments & Services' }]} />

        {/* Introduction Banner */}
        <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-brass-500" />
            <span>Root-Cause Evaluation & Personalized Regimen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-forest-950">
            Ayurvedic Consultation & Therapeutic Care
          </h2>
          <p className="text-earth-800 text-sm font-light leading-relaxed">
            Every clinical procedure at Sri Krishna Ayurvedic Clinic begins with evaluating your unique body constitution (*Prakriti*) and Dosha balance. Dr. Anand Krishna (BAMS) prescribes authentic herbal formulations, tailored Panchakarma therapies, and dietary guidelines.
          </p>
        </div>

        {/* Treatment Grid */}
        <div className="space-y-8 mb-20">
          <h2 className="text-3xl font-serif text-forest-950 font-light">
            Core Treatments Directory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-earth-200 shadow-elevated overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
              >
                {item.image && (
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-sm text-brass-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-brass-400/30 shadow-md">
                      {item.number} • THERAPY
                    </div>
                  </div>
                )}

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {!item.image && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-brass-600 uppercase tracking-widest">
                          {item.subtitle}
                        </span>
                        <span className="text-xs font-bold font-mono text-gray-400">
                          {item.number}
                        </span>
                      </div>
                    )}
                    {item.image && (
                      <span className="text-xs font-semibold text-brass-600 uppercase tracking-widest block">
                        {item.subtitle}
                      </span>
                    )}

                    <h3 className="font-serif text-2xl text-forest-950 font-light group-hover:text-forest-800 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-earth-800 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {item.benefits && item.benefits.length > 0 && (
                      <ul className="space-y-1.5 pt-2 border-t border-earth-100 text-[11px] text-earth-800">
                        {item.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-earth-200 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-medium">{item.duration}</span>
                    
                    <button
                      onClick={onOpenBooking}
                      className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-all"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized High-Priority Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Cancer Care */}
          <div className="p-8 bg-forest-950 text-cream-50 rounded-3xl space-y-4 flex flex-col justify-between border border-brass-500/30 shadow-elevated">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-forest-900 text-brass-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-brass-400/30 inline-block">
                SPECIALIZED SUPPORT
              </span>
              <h3 className="font-serif text-2xl font-light text-cream-50">
                Integrative Cancer Care & Supportive Consultation
              </h3>
              <p className="text-xs text-cream-200/80 leading-relaxed font-light">
                Complementary Ayurvedic support focused on vitality, digestive Agni, and side-effect management during conventional treatments.
              </p>
            </div>

            <div className="pt-4 border-t border-forest-900 flex items-center justify-between">
              <Link
                to="/treatments/cancer-care"
                className="text-xs font-bold text-brass-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Read Full Cancer Approach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Swarnamrutha Prashana */}
          <div className="p-8 bg-cream-100 text-forest-950 rounded-3xl space-y-4 flex flex-col justify-between border border-earth-200 shadow-elevated">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-brass-500/20 text-brass-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-brass-500/30 inline-block">
                PEDIATRIC IMMUNITY
              </span>
              <h3 className="font-serif text-2xl font-light text-forest-950">
                Swarnamrutha Prashana (Gold Drop Immunity)
              </h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Monthly traditional gold bio-purified liquid drops administered to infants and children for memory, digestion, and seasonal defense.
              </p>
            </div>

            <div className="pt-4 border-t border-earth-200 flex items-center justify-between">
              <Link
                to="/treatments/swarnamrutha"
                className="text-xs font-bold text-forest-900 hover:text-emerald-700 uppercase tracking-wider flex items-center gap-1"
              >
                <span>Read Full Swarnamrutha Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
