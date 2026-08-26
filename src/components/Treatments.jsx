import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Treatments({ onSelectTreatment }) {
  return (
    <section id="treatments" className="py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • Verified Treatments & Services
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
              Clinical Services & Ayurvedic Therapies
            </h2>
          </div>
          <p className="text-earth-800 text-sm sm:text-base max-w-md leading-relaxed font-light">
            All consultations and treatment recommendations are provided directly by Dr. Anand Krishna (BAMS, 26+ yrs exp) following thorough Nadi Pariksha.
          </p>
        </div>

        {/* Editorial Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicData.treatments.map((treatment, idx) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="bg-cream-100/60 rounded-2xl border border-earth-200 p-8 flex flex-col justify-between hover:bg-cream-50 hover:shadow-elevated hover:border-brass-500/40 transition-all duration-300 group relative"
            >
              <div className="space-y-6">
                {/* Top Number & Duration Badge */}
                <div className="flex items-center justify-between border-b border-earth-200 pb-4">
                  <span className="font-serif text-3xl font-light text-forest-800/40 group-hover:text-brass-600 transition-colors">
                    {treatment.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-earth-800 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brass-600" />
                    <span>{treatment.duration}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-brass-600 font-semibold block">
                    {treatment.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-forest-950 group-hover:text-forest-800 transition-colors">
                    {treatment.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-earth-800 leading-relaxed">
                  {treatment.description}
                </p>

                {/* Key Verified Benefits */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-forest-900 block">
                    Key Outcomes:
                  </span>
                  <ul className="space-y-1.5">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-earth-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-8 mt-6 border-t border-earth-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectTreatment(treatment.title)}
                  className="text-xs font-semibold uppercase tracking-wider text-forest-900 group-hover:text-brass-600 transition-colors flex items-center gap-2"
                >
                  <span>Book This Treatment</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <Sparkles className="w-4 h-4 text-brass-500/40 group-hover:text-brass-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
