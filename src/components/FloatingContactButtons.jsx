import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function FloatingContactButtons() {
  const rawPhone = clinicData.contact.phone.replace(/\s+/g, '');
  const telUri = `tel:${rawPhone}`;
  const whatsappUrl = `https://wa.me/${clinicData.contact.whatsapp.replace(/\+/g, '')}?text=Hello%20Dr.%20Anand%20Krishna%2C%20I%20would%20like%20to%20inquire%20about%20Ayurvedic%20consultation%20at%20Sri%20Krishna%20Ayurvedic%20Clinic.`;

  return (
    <div 
      className="fixed bottom-6 left-5 sm:bottom-8 sm:left-7 z-40 flex flex-col gap-3 items-start select-none"
      role="complementary"
      aria-label="Direct Clinic Contact Options"
    >
      {/* 1. FLOATING WHATSAPP BUTTON (CIRCULAR) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.2 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        title="Chat on WhatsApp"
        aria-label="Chat with Dr. Anand Krishna on WhatsApp"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] border border-white/30 flex items-center justify-center transition-colors duration-300 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white" />
        </span>
      </motion.a>

      {/* 2. FLOATING DIRECT CALL BUTTON (CIRCULAR) */}
      <motion.a
        href={telUri}
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.3 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        title="Call Clinic"
        aria-label="Call Sri Krishna Ayurvedic Clinic"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-900/95 hover:bg-forest-800 text-cream-50 hover:text-brass-300 shadow-[0_10px_28px_rgba(11,23,17,0.38)] border border-brass-400/40 backdrop-blur-md flex items-center justify-center transition-colors duration-300 cursor-pointer"
      >
        <Phone className="w-5 h-5 sm:w-5 sm:h-5 text-brass-400 group-hover:text-brass-300 group-hover:scale-110 transition-transform duration-200" />
      </motion.a>
    </div>
  );
}
