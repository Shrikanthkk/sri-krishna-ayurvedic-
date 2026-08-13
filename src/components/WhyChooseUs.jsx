import React from 'react';
import { motion } from 'framer-motion';
import { clinicData } from '../data/clinicData';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
            05 • Distinctive Standards
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
            Why Sri Krishna Ayurvedic Clinic
          </h2>
          <p className="text-earth-800 text-base sm:text-lg font-light leading-relaxed">
            Our practice is defined by clinical transparency, classical principles, and personalized attention for every visiting patient.
          </p>
        </div>

        {/* 6 Editorial Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {clinicData.whyChooseUs.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="space-y-4 p-8 bg-cream-100/50 rounded-2xl border border-earth-200 hover:border-brass-500/40 hover:bg-white transition-all duration-300 group"
            >
              <span className="font-serif text-5xl font-light text-brass-500/50 group-hover:text-brass-600 transition-colors block">
                {item.number}
              </span>
              <h3 className="text-2xl font-serif font-medium text-forest-950 group-hover:text-forest-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
