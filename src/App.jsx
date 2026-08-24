import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookingModal from './components/BookingModal';
import BelowNavbarAnimation from './components/BelowNavbarAnimation';

import Home from './pages/Home';
import About from './pages/About';
import Treatments from './pages/Treatments';
import JointPainArthritis from './pages/treatments/JointPainArthritis';
import SkinProblems from './pages/treatments/SkinProblems';
import HairFall from './pages/treatments/HairFall';
import SexualDisorders from './pages/treatments/SexualDisorders';
import DeAddiction from './pages/treatments/DeAddiction';
import Diabetes from './pages/treatments/Diabetes';
import CancerTreatment from './pages/treatments/CancerTreatment';
import ReduceObesity from './pages/treatments/ReduceObesity';
import Vitiligo from './pages/treatments/Vitiligo';
import Physiotherapy from './pages/treatments/Physiotherapy';
import Swarnaprashana from './pages/Swarnaprashana';

import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function AppContent() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-earth-900 selection:bg-brass-500 selection:text-forest-950 flex flex-col justify-between">
      
      {/* Navigation Bar across public pages (hidden on /admin and /login) */}
      {!isAdmin && <Navbar onOpenBooking={() => setBookingOpen(true)} />}

      {/* Multi-Page Routes — animation bar is first child so it scrolls away behind navbar */}
      <main className={`grow ${isAdmin ? 'pt-0' : 'pt-[70px] sm:pt-[76px]'}`}>
        {!isAdmin && <BelowNavbarAnimation />}
        <Routes>
          <Route path="/" element={<Home onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/about." element={<Navigate to="/about" replace />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          
          {/* Redirects for legacy standalone routes to About section anchors */}
          <Route path="/doctor" element={<Navigate to="/about#doctor" replace />} />
          <Route path="/why-choose-us" element={<Navigate to="/about#why-choose-us" replace />} />
          <Route path="/locations" element={<Navigate to="/about#locations" replace />} />
          
          {/* Central All Treatments Directory Route */}
          <Route path="/treatments" element={<Treatments onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments." element={<Navigate to="/treatments" replace />} />
          
          {/* Dedicated Treatment Routes */}
          <Route path="/treatments/joint-pain-arthritis" element={<JointPainArthritis onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/skin-problems" element={<SkinProblems onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/hair-fall" element={<HairFall onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/sexual-disorders" element={<SexualDisorders onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/de-addiction" element={<DeAddiction onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/diabetes" element={<Diabetes onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/cancer-treatment" element={<CancerTreatment onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/reduce-obesity" element={<ReduceObesity onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/obesity" element={<Navigate to="/treatments/reduce-obesity" replace />} />
          <Route path="/treatments/vitiligo" element={<Vitiligo onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/white-patches" element={<Navigate to="/treatments/vitiligo" replace />} />
          <Route path="/treatments/shvitra" element={<Navigate to="/treatments/vitiligo" replace />} />
          <Route path="/treatments/physiotherapy" element={<Physiotherapy onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/rehabilitation" element={<Navigate to="/treatments/physiotherapy" replace />} />

          {/* Swarnaprashana Dedicated Page & Compatibility Routes */}
          <Route path="/treatments/swarnaprashana" element={<Swarnaprashana onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/swarnaprashana" element={<Swarnaprashana onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/swarnamrutha" element={<Navigate to="/treatments/swarnaprashana" replace />} />
          <Route path="/treatments/cancer-care" element={<Navigate to="/treatments/cancer-treatment" replace />} />
          
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery." element={<Navigate to="/gallery" replace />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/testimonials." element={<Navigate to="/testimonials" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact." element={<Navigate to="/contact" replace />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-appointment." element={<Navigate to="/book-appointment" replace />} />

          {/* Clinic Admin Dashboard & Login Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin." element={<Navigate to="/admin" replace />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Admin />} />
          <Route path="/login." element={<Navigate to="/admin" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenBooking={() => setBookingOpen(true)} />

      {/* Popup Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
