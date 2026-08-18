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
import CancerCare from './pages/CancerCare';
import Swarnaprashana from './pages/Swarnaprashana';
import Swarnamrutha from './pages/Swarnamrutha';
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
      <main className={`grow ${isAdmin ? 'pt-0' : 'pt-16'}`}>
        {!isAdmin && <BelowNavbarAnimation />}
        <Routes>
          <Route path="/" element={<Home onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/about." element={<Navigate to="/about" replace />} />
          
          {/* Redirects for legacy standalone routes to About section anchors */}
          <Route path="/doctor" element={<Navigate to="/about#doctor" replace />} />
          <Route path="/why-choose-us" element={<Navigate to="/about#why-choose-us" replace />} />
          <Route path="/locations" element={<Navigate to="/about#locations" replace />} />
          
          <Route path="/treatments" element={<Treatments onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments." element={<Navigate to="/treatments" replace />} />
          <Route path="/treatments/cancer-care" element={<CancerCare />} />
          <Route path="/treatments/swarnaprashana" element={<Swarnaprashana onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/treatments/swarnamrutha" element={<Swarnaprashana onOpenBooking={() => setBookingOpen(true)} />} />
          
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
