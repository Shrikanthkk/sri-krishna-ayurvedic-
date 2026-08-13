import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Sparkles, Activity } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function AyurvedaSection() {
  const pillarIcons = [
    <Compass className="w-6 h-6 text-brass-500" />,
    <Users className="w-6 h-6 text-brass-500" />,
    <Sparkles className="w-6 h-6 text-brass-500" />,
    <Activity className="w-6 h-6 text-brass-500" />
  ];

  return (
    <section id="why-us" className="py-24 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block"
          >
            02 • Core Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-cream-50 leading-tight"
          >
            Ancient Wisdom, Thoughtfully Practiced
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream-200/80 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Ayurveda views human health as an intricate relationship between internal constitution and natural rhythms. Our clinical approach focuses on four fundamental pillars.
          </motion.p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clinicData.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-forest-950/60 p-8 rounded-2xl border border-forest-800 hover:border-brass-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillarIcons[idx]}
                  </div>
                  <span className="font-serif text-3xl font-light text-brass-400/40 group-hover:text-brass-400 transition-colors">
                    {pillar.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-light text-cream-50 group-hover:text-brass-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brass-400 font-medium tracking-wider uppercase">
                    {pillar.short}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-cream-200/70 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-forest-800/80 flex items-center gap-2 text-[11px] uppercase tracking-widest text-brass-400 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Pillar Principles</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
