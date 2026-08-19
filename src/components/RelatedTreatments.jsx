import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function RelatedTreatments({ currentTreatmentId, count = 3 }) {
  const otherTreatments = clinicData.treatments
    .filter((t) => t.id !== currentTreatmentId)
    .slice(0, count);

  return (
    <section className="py-10 border-t border-earth-200 mb-8">
      <div className="space-y-2 mb-6">
        <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brass-500" />
          <span>EXPLORE OUR RANGE OF AYURVEDIC CARE</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-light text-forest-950">
          Explore Other Treatments
        </h2>
        <p className="text-earth-800 text-xs sm:text-sm font-light">
          Discover our specialized Ayurvedic therapies and individualized consultations in KR Puram.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherTreatments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-earth-200 shadow-elevated overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
          >
            {item.image && (
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-sm text-brass-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-brass-400/30 shadow-md">
                  {item.number} • THERAPY
                </div>
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-brass-600 uppercase tracking-widest block">
                  {item.subtitle}
                </span>

                <h3 className="font-serif text-lg sm:text-xl text-forest-950 font-light group-hover:text-forest-800 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-earth-200 flex items-center justify-between">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-all"
                >
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brass-400" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
