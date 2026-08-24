import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, MessageSquareQuote } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="PATIENT EXPERIENCES"
        title="Patient Feedback & Testimonials"
        subtitle="Genuine feedback from patients who consulted Dr. Anand Krishna (BAMS) for personalized Ayurvedic care."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Testimonials' }]} />

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {clinicData.testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-brass-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brass-500 text-brass-500" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-brass-400 opacity-60" />
                </div>

                <p className="text-xs text-earth-800 leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-earth-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-forest-950">{item.author}</p>
                  <p className="text-[11px] text-gray-500">{item.locality}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cream-100 text-brass-700 text-[10px] font-semibold uppercase">
                  {item.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl text-center space-y-4">
          <h3 className="font-serif text-3xl font-light">
            Share Your Experience or Book a Consultation
          </h3>
          <p className="text-xs text-cream-200/80 max-w-xl mx-auto font-light">
            Dr. Anand Krishna (BAMS) is available Monday – Saturday in KR Puram.
          </p>
          <div className="pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-widest rounded-full shadow-soft transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
