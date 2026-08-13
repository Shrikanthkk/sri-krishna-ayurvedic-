import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="404 ERROR"
        title="Page Not Found"
        subtitle="The page you are looking for does not exist or may have been moved."
      />

      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-4xl font-serif text-forest-950">
          Looking for Sri Krishna Ayurvedic Clinic?
        </h2>
        <p className="text-earth-800 text-base font-light max-w-md mx-auto">
          Please check the URL address or return to our homepage to explore treatments, doctor profiles, and clinic locations.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full shadow-elevated transition-all"
          >
            <Home className="w-4 h-4 text-brass-400" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
