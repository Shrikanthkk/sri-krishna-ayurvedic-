import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % clinicData.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + clinicData.testimonials.length) % clinicData.testimonials.length);
  };

  const current = clinicData.testimonials[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-cream-100/70 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
            07 • Patient Experiences
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
            Verified Patient Words
          </h2>
          <p className="text-earth-800 text-base sm:text-lg font-light leading-relaxed">
            Reflecting genuine patient feedback from consultations and treatments at KR Puram.
          </p>
        </div>

        {/* Testimonial Quote Spotlight */}
        <div className="max-w-4xl mx-auto bg-cream-50 rounded-3xl p-8 sm:p-12 border border-earth-200 shadow-elevated relative">
          <Quote className="w-16 h-16 text-brass-500/20 absolute top-8 left-8" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-8 text-center"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 text-brass-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass-500" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-serif text-2xl sm:text-3xl font-light text-forest-950 leading-relaxed italic max-w-3xl mx-auto">
                "{current.quote}"
              </p>

              {/* Author Info */}
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-medium text-forest-900">
                  {current.author}
                </h4>
                <p className="text-xs text-brass-600 font-medium uppercase tracking-widest">
                  {current.locality} • {current.treatment}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-earth-200 mt-8">
            <div className="flex gap-2">
              {clinicData.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIndex === idx ? 'bg-forest-900 w-8' : 'bg-earth-300 hover:bg-earth-600'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
