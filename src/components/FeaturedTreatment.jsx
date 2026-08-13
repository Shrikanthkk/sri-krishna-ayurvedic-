import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function FeaturedTreatment({ onOpenBooking }) {
  return (
    <section className="py-20 bg-forest-950 text-cream-50 relative overflow-hidden">
      {/* Background Image Overlay with Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src={clinicData.images.clinic}
          alt="Ayurvedic therapy sanctuary"
          className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-brass-500/30 text-brass-400 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Therapeutic Spotlight</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight text-cream-50">
              Wellness, Rooted in Tradition. Restored in KR Puram.
            </h2>

            <p className="text-base sm:text-lg text-cream-200/80 max-w-2xl font-light leading-relaxed">
              Every therapeutic journey at Sri Krishna Ayurvedic Clinic begins with a classical assessment of your constitutional Agni (digestive fire) and Dosha balance by senior physician Dr. Anand Krishna. Experience authentic care in a tranquil environment.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking('Nadi Pariksha (Pulse Diagnosis)')}
                className="px-8 py-4 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs tracking-ultra uppercase rounded-full shadow-elevated transition-all duration-300 flex items-center gap-3"
              >
                <span>Book Nadi Pariksha</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#doctor"
                className="px-8 py-4 bg-transparent border border-cream-200/30 hover:border-cream-200 text-cream-100 text-xs tracking-ultra uppercase rounded-full transition-colors"
              >
                Meet Practitioner
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-forest-900/80 border border-brass-500/30 p-8 rounded-3xl space-y-6 shadow-elevated backdrop-blur-md">
              <div className="flex items-center gap-3 text-brass-400">
                <HeartHandshake className="w-6 h-6" />
                <span className="font-serif text-xl font-light text-cream-50">Clinical Commitment</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed italic">
                "We do not provide generic over-the-counter prescriptions. Every herbal formulation is calculated for your specific body state and digestive power."
              </p>
              <div className="pt-4 border-t border-forest-800 flex justify-between items-center text-xs text-brass-400">
                <span>Standard Consultation</span>
                <span className="font-serif font-bold text-base text-cream-50">₹50</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
