import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to top on route navigation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  // Monitor scroll position to show/hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={handleScrollToTop}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-900/95 hover:bg-forest-800 text-cream-50 hover:text-brass-300 backdrop-blur-md border border-brass-400/40 shadow-[0_10px_30px_rgba(11,23,17,0.35)] flex items-center justify-center cursor-pointer transition-colors group"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-brass-400 group-hover:text-brass-300 transform group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
