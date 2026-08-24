import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Calendar, ArrowUpRight, Shield } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-forest-950 text-cream-50 pt-12 pb-6 border-t border-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-forest-900">
          
          {/* Col 1: Clinic Brand & Info */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full p-0.5 bg-white border border-brass-400/60 shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="Sri Krishna Ayurvedic Logo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              <span className="font-serif text-lg font-medium tracking-tight text-cream-50">
                {clinicData.clinicName}
              </span>
            </Link>

            <p className="text-xs text-cream-200/70 font-light leading-relaxed max-w-sm">
              Authentic Ayurvedic healthcare, classic Nadi Pariksha, and holistic Panchakarma therapies guided by Dr. Anand Krishna (BAMS) with over 26 years of clinical practice in KR Puram, Bangalore.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brass-400">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-cream-200/80 font-light">
              <li>
                <Link to="/" className="hover:text-brass-300 transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brass-300 transition-colors flex items-center gap-1">
                  <span>About Sri Krishna Clinic</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-brass-300 transition-colors flex items-center gap-1">
                  <span>Treatments & Therapies</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brass-300 transition-colors flex items-center gap-1">
                  <span>Clinic Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-300 transition-colors flex items-center gap-1">
                  <span>Contact Clinic</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Care */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brass-400">
              Clinical Treatments
            </h4>
            <ul className="space-y-1.5 text-xs text-cream-200/80 font-light">
              <li>
                <Link to="/treatments/cancer-treatment" className="hover:text-brass-300 transition-colors flex items-center gap-1 font-medium text-cream-100">
                  <span>Cancer Treatment</span>
                  <ArrowUpRight className="w-3 h-3 text-brass-400" />
                </Link>
              </li>
              <li>
                <Link to="/treatments/swarnaprashana" className="hover:text-brass-300 transition-colors flex items-center gap-1 font-medium text-cream-100">
                  <span>Swarnaprashana Care</span>
                  <ArrowUpRight className="w-3 h-3 text-brass-400" />
                </Link>
              </li>
              <li>
                <Link to="/treatments/joint-pain-arthritis" className="hover:text-brass-300 transition-colors">
                  <span>Joint Pain & Arthritis</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/skin-problems" className="hover:text-brass-300 transition-colors">
                  <span>Skin Problems</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/hair-fall" className="hover:text-brass-300 transition-colors">
                  <span>Hair Fall Treatment</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/sexual-disorders" className="hover:text-brass-300 transition-colors">
                  <span>Sexual Disorders</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/de-addiction" className="hover:text-brass-300 transition-colors">
                  <span>De-addiction</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/diabetes" className="hover:text-brass-300 transition-colors">
                  <span>Diabetes Care</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/reduce-obesity" className="hover:text-brass-300 transition-colors">
                  <span>Reduce Obesity (Weight Loss)</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/vitiligo" className="hover:text-brass-300 transition-colors">
                  <span>Vitiligo & White Patches</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments/physiotherapy" className="hover:text-brass-300 transition-colors">
                  <span>Physiotherapy & Rehab</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info & CTA */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brass-400">
              Clinic Contact
            </h4>
            
            <div className="space-y-2 text-xs text-cream-200/80 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brass-400 shrink-0 mt-0.5" />
                <span>Main: No 426, Near Lakshmi Hospital, 3rd Main, KR Puram, Bangalore</span>
              </p>

              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Branch: No 98, Opp Kanti Sweets, T.C. Palya Main Rd, KR Puram, Bangalore</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                <a href={`tel:${clinicData.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {clinicData.contact.phone}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                <a href={`mailto:${clinicData.contact.email}`} className="hover:text-white">
                  {clinicData.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream-200/50 gap-2">
          <p>© {new Date().getFullYear()} Sri Krishna Ayurvedic Clinic. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-center sm:text-right">
              Medical Disclaimer: Ayurvedic consultations provide complementary wellness support.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
