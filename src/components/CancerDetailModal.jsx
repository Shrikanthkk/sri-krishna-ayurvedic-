import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  Activity, 
  HeartPulse, 
  Wind, 
  Shield, 
  Sparkles, 
  Sun, 
  CheckCircle2, 
  Calendar, 
  PhoneCall,
  AlertTriangle,
  Stethoscope,
  Microscope,
  Pill,
  Leaf
} from 'lucide-react';
import { clinicData } from '../data/clinicData';

const iconMap = {
  Activity,
  HeartPulse,
  ShieldAlert,
  Wind,
  Shield,
  Sparkles,
  Sun
};

export default function CancerDetailModal({ cancerItem, isOpen, onClose, onOpenBooking }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!cancerItem) return null;

  const IconComponent = iconMap[cancerItem.iconName] || Activity;
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-earth-200 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-forest-950 to-forest-900 text-cream-50 p-6 sm:p-8 relative shrink-0">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-forest-800/80 hover:bg-forest-700 text-cream-100 flex items-center justify-center transition-colors cursor-pointer border border-brass-500/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-brass-400 flex items-center justify-center border border-brass-500/30 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brass-400 block">
                    {cancerItem.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-cream-50">
                    {cancerItem.title}
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-cream-200/85 font-light">
                {cancerItem.subtitle}
              </p>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-earth-900 grow">
              
              {/* Medical Notice Banner */}
              <div className="p-4 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl flex items-start gap-3 text-xs text-earth-900">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-forest-950 font-semibold">Medical Notice:</strong> Information summarized from reliable medical institutions (WHO, NCI, ACS). Ayurvedic care is strictly supportive and must never replace conventional oncology treatments.
                </p>
              </div>

              {/* The 6 Required Core Points */}
              <div className="space-y-4">
                
                {/* 1. What It Is */}
                <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-earth-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <Stethoscope className="w-4 h-4 text-brass-600 shrink-0" />
                    <span>1. What It Is</span>
                  </div>
                  <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed pl-6">
                    {cancerItem.points.whatItIs}
                  </p>
                </div>

                {/* 2. Common Risk Factors / Causes */}
                <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-earth-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>2. Common Risk Factors & Causes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed pl-6">
                    {cancerItem.points.riskFactors}
                  </p>
                </div>

                {/* 3. Common Symptoms */}
                <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-earth-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <Activity className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>3. Common Symptoms & Warning Signs</span>
                  </div>
                  <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed pl-6">
                    {cancerItem.points.symptoms}
                  </p>
                </div>

                {/* 4. How It Is Diagnosed */}
                <div className="p-4 sm:p-5 bg-cream-50/80 rounded-2xl border border-earth-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <Microscope className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>4. How It Is Diagnosed (Medical Standards)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed pl-6">
                    {cancerItem.points.diagnosis}
                  </p>
                </div>

                {/* 5. Standard Medical Treatment Options */}
                <div className="p-4 sm:p-5 bg-blue-50/50 rounded-2xl border border-blue-200/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <Pill className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>5. Standard Medical Treatment Options (Evidence-Based Oncology)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed pl-6">
                    {cancerItem.points.standardTreatment}
                  </p>
                </div>

                {/* 6. Role of Ayurvedic Supportive Care */}
                <div className="p-4 sm:p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-forest-950 font-semibold text-sm">
                    <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>6. Role of Ayurvedic Supportive Care</span>
                  </div>
                  <p className="text-xs sm:text-sm text-forest-950 font-light leading-relaxed pl-6">
                    {cancerItem.points.ayurvedicSupport}
                  </p>
                </div>

              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 bg-cream-100/60 border-t border-earth-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-earth-700 text-center sm:text-left">
                Consult with Senior Physician Dr. Anand Krishna (BAMS)
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={telUri}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full border border-earth-300 bg-white text-forest-900 hover:bg-forest-900 hover:text-cream-50 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Clinic</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenBooking) {
                      onOpenBooking(`Supportive Care Consultation for ${cancerItem.title}`);
                    }
                  }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-cream-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
