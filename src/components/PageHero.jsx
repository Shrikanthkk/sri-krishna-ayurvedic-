import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ badge, title, subtitle, bgImage }) {
  return (
    <section className="relative pt-32 pb-16 bg-forest-950 text-cream-50 overflow-hidden">
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt={title} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/75 to-forest-950/50" />
        </div>
      )}

      {/* Decorative Ornaments */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest-900 border border-brass-500/30 text-brass-400 text-xs font-semibold uppercase tracking-widest">
              {badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-cream-50 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-cream-200/80 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
