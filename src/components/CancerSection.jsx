import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, HeartPulse, CheckCircle2, Calendar } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function CancerSection({ onOpenBooking }) {
  return (
    <section id="cancer" className="py-24 bg-forest-950 text-cream-50 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-brass-500/30 text-brass-400 text-xs font-semibold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 text-brass-500" />
              <span>Integrative Oncology & Rasayana Therapy</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-cream-50 leading-tight">
              Ayurvedic Support in Cancer Care
            </h2>

            <p className="text-base sm:text-lg text-cream-200/80 font-light leading-relaxed">
              Classical Rasayana therapies and supportive Ayurvedic herbal care aimed at enhancing cellular vitality, managing treatment-induced fatigue, and strengthening digestive Agni under senior physician Dr. Anand Krishna (BAMS).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-cream-200/90">
              <div className="p-4 bg-forest-900/60 rounded-2xl border border-forest-800 space-y-2">
                <HeartPulse className="w-5 h-5 text-brass-400" />
                <h4 className="font-serif text-base text-cream-50 font-medium">Immunity & Rasayana</h4>
                <p className="text-cream-200/70 text-[11px]">Classical Ojas-building herbs to support natural tissue strength.</p>
              </div>

              <div className="p-4 bg-forest-900/60 rounded-2xl border border-forest-800 space-y-2">
                <Sparkles className="w-5 h-5 text-brass-400" />
                <h4 className="font-serif text-base text-cream-50 font-medium">Symptom Management</h4>
                <p className="text-cream-200/70 text-[11px]">Soothes nausea, appetite loss, and treatment fatigue gently.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenBooking('Cancer Support Consultation')}
                className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs tracking-widest uppercase rounded-full transition-all shadow-elevated flex items-center gap-2.5"
              >
                <Calendar className="w-4 h-4 text-forest-950" />
                <span>Consult Dr. Anand Krishna (₹50)</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-forest-900 p-8 rounded-3xl border border-brass-500/30 space-y-6 shadow-elevated">
              <h3 className="font-serif text-2xl text-cream-50 font-light border-b border-forest-800 pb-4">
                Core Integrative Principles
              </h3>
              <ul className="space-y-3.5 text-xs text-cream-200/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span>Personalized Dosha evaluation for metabolic balance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span>100% natural, classical herbomineral formulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span>Dietary and Ahara guidance tailored to digestive power</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span>Non-invasive supportive care alongside conventional regimens</span>
                </li>
              </ul>
              <div className="p-4 bg-forest-950 rounded-2xl text-[11px] text-brass-400 italic">
                * Note: Consultations provide supportive and palliative Ayurvedic care. Always maintain coordination with your primary oncologist.
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
