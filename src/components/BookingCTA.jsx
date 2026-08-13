import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function BookingCTA({ onOpenBooking }) {
  return (
    <section className="py-24 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={clinicData.images.hero}
          alt="Ayurvedic clinic ambiance"
          className="w-full h-full object-cover opacity-15 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/95 to-forest-900/90" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-950/80 border border-brass-500/30 text-brass-400 text-xs uppercase tracking-widest font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Holistic Health Awaits</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-light text-cream-50 leading-tight max-w-3xl mx-auto"
        >
          Begin Your Journey Toward Restored Balance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-cream-200/80 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
        >
          Consult with Dr. Anand Krishna (BAMS, 26+ yrs exp) at KR Puram, Bangalore. Experience personalized pulse diagnosis and root-cause care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenBooking()}
            className="px-10 py-4 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs tracking-ultra uppercase rounded-full shadow-elevated transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Consultation (₹50)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
