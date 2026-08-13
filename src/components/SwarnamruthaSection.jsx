import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Baby, ShieldCheck, Award, Calendar } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function SwarnamruthaSection({ onOpenBooking }) {
  return (
    <section id="swarnamrutha" className="py-24 bg-cream-100/70 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-cream-50 p-8 rounded-3xl border border-earth-200 space-y-6 shadow-elevated">
              <div className="w-12 h-12 rounded-2xl bg-brass-400/20 text-brass-600 flex items-center justify-center">
                <Baby className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-semibold text-brass-600 tracking-widest block">
                Traditional Pediatric Immunity
              </span>
              <h3 className="font-serif text-3xl font-light text-forest-950">
                Swarnamrutha Prashana
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 leading-relaxed font-light">
                An ancient Ayurvedic pediatric immunization practice where purified Swarna Bhasma (gold ash) mixed with medicated ghee and processed honey is administered to children (0–16 years).
              </p>
              
              <div className="p-4 bg-cream-100 rounded-2xl text-xs text-forest-900 space-y-1 font-medium">
                <p><strong>Administered:</strong> On Pushya Nakshatra days & monthly consultations</p>
                <p><strong>Age Group:</strong> 0 Months to 16 Years</p>
                <p><strong>Clinic:</strong> Sri Krishna Ayurvedic Clinic, KR Puram</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-earth-200 text-brass-600 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-brass-500" />
              <span>Pediatric Growth & Memory Elixir</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
              Swarnamrutha Prashana Care
            </h2>

            <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
              Formulated as described in classical Kashyapa Samhita, Swarnamrutha Prashana enhances physical growth, cognitive intelligence (Medha), immunity (Bala), and digestion in developing children.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white rounded-2xl border border-earth-200 space-y-2">
                <ShieldCheck className="w-5 h-5 text-forest-800" />
                <h4 className="font-serif text-lg font-medium text-forest-950">Immunity Booster</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  Reduces frequent seasonal infections, colds, and respiratory allergies.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-earth-200 space-y-2">
                <Award className="w-5 h-5 text-forest-800" />
                <h4 className="font-serif text-lg font-medium text-forest-950">Intellectual Clarity</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  Enhances memory retention, focus, and speech development in growing children.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenBooking('Swarnamrutha Prashana')}
                className="px-8 py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs tracking-widest uppercase rounded-full transition-all shadow-elevated flex items-center gap-2.5"
              >
                <Calendar className="w-4 h-4 text-brass-400" />
                <span>Book Swarnamrutha Drops (₹50)</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
