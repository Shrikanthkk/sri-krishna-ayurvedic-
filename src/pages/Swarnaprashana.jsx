import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Calendar, PhoneCall, Baby, ShieldCheck, ShieldAlert, HeartHandshake, BookOpen, AlertTriangle, ArrowRight, ArrowLeft, Sun, Clock, Award, Star, CalendarDays } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import RelatedTreatments from '../components/RelatedTreatments';
import { clinicData } from '../data/clinicData';
import { getSwarnaprashanaSchedule, getAvailableScheduleYears } from '../utils/adminStorage';
import swarnaImg1 from '../assets/swarnaprashana_1.png';
import swarnaImg2 from '../assets/swarnaprashana_2.png';
import swarnaImg3 from '../assets/swarnaprashana_3.png';

export default function Swarnaprashana({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const [availableYears, setAvailableYears] = useState([2026]);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const loadSchedule = () => {
      const years = getAvailableScheduleYears();
      setAvailableYears(years);
      if (!years.includes(selectedYear) && years.length > 0) {
        setSelectedYear(years[0]);
      }
      setSchedule(getSwarnaprashanaSchedule({ year: selectedYear, activeOnly: true }));
    };

    loadSchedule();

    const handleUpdate = () => loadSchedule();
    window.addEventListener('swarnaprashana_schedule_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('swarnaprashana_schedule_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [selectedYear]);

  const purposePoints = [
    "Supports traditional Ayurvedic child wellness",
    "Traditionally associated with strength and vitality",
    "Traditionally described in relation to healthy development",
    "Supports a holistic approach to children's wellbeing"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* 1. HERO SECTION */}
      <PageHero
        badge="PEDIATRIC AYURVEDA"
        title="Swarnaprashana"
        subtitle="Traditional Ayurvedic Wellness for Children"
        bgImage={swarnaImg1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Back Link & Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-emerald-700 uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to All Treatments</span>
          </Link>
        </div>

        <Breadcrumb
          items={[
            { label: 'All Treatments', link: '/treatments' },
            { label: 'Swarnaprashana' }
          ]}
        />

        {/* Responsible Medical Notice Banner */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">Important Medical & Safety Notice</strong>
            <p className="leading-relaxed">
              Swarnaprashana is a traditional supportive Ayurvedic wellness practice. It is not a modern medical cure and should never replace routine pediatric check-ups, developmental evaluations, or mandatory childhood vaccinations recommended by health authorities. Individual suitability must always be evaluated by a qualified Ayurvedic doctor (BAMS).
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            NEW ATTRACTIVE SWARNAPRASHANA & PUSHYA NAKSHATRA SECTION
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-earth-200 shadow-elevated mb-12 space-y-8">
          
          {/* Header Row with Prominent Age Badge */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-earth-200/80 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-brass-500" />
                <span>CLASSICAL AYURVEDIC PEDIATRICS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
                Swarnaprashana
              </h2>
              <p className="text-forest-800 font-medium text-sm sm:text-base">
                Traditional Ayurvedic Wellness for Children
              </p>
              <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed pt-1">
                <strong>Swarnaprashana (Swarna Prashana)</strong> is a traditional Ayurvedic practice for children, traditionally associated with <strong>Pushya Nakshatra</strong>. It is described in Ayurveda as a practice intended to support a child's overall wellbeing, strength and healthy development.
              </p>
            </div>

            {/* Prominent Age Group Card/Badge */}
            <div className="bg-forest-950 text-cream-50 p-4 sm:p-5 rounded-2xl border border-brass-500/30 shadow-md text-center shrink-0 min-w-[180px] space-y-1">
              <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest block">Age Group</span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">0–16 Years</div>
              <span className="text-[11px] text-cream-200/80 font-light block">For Infants & Children</span>
            </div>
          </div>

          {/* 2-Column Module: Pushya Nakshatra Day & Schedule + Traditional Ayurvedic Purpose */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Pushya Nakshatra Highlight & 2-Column Schedule */}
            <div className="lg:col-span-7 bg-cream-100/70 p-6 sm:p-7 rounded-3xl border border-earth-200 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Pushya Nakshatra Day Highlight Card */}
                <div className="p-4 bg-white rounded-2xl border border-brass-500/30 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest-900 text-brass-400 flex items-center justify-center shrink-0">
                    <Star className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-forest-950 font-serif text-sm block">Pushya Nakshatra Day</strong>
                    <p className="text-xs text-earth-800 font-light leading-relaxed">
                      “Swarnaprashana is traditionally administered on Pushya Nakshatra days according to Ayurvedic practice.”
                    </p>
                  </div>
                </div>

                {/* Schedule Title & Dynamic Year Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-b border-earth-200/60 pb-2">
                  <div className="flex items-center gap-2 text-forest-950">
                    <CalendarDays className="w-4 h-4 text-brass-600" />
                    <h3 className="font-serif text-lg sm:text-xl font-medium">
                      Pushya Nakshatra Schedule ({selectedYear})
                    </h3>
                  </div>

                  {availableYears.length > 1 && (
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-earth-200 shadow-2xs">
                      <span className="text-[10px] font-semibold text-earth-700 uppercase px-1.5">Year:</span>
                      {availableYears.map(yr => (
                        <button
                          key={yr}
                          onClick={() => setSelectedYear(yr)}
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            selectedYear === yr
                              ? 'bg-forest-900 text-cream-50 shadow-xs'
                              : 'text-forest-900 hover:bg-cream-100'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Two-Column Monthly Schedule Grid */}
                {schedule.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {schedule.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 px-3.5 bg-white rounded-xl border border-earth-200 shadow-2xs hover:border-brass-400 transition-colors"
                      >
                        <span className="font-medium text-forest-950 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brass-500" />
                          <span>{item.month}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-forest-50 text-forest-900 font-mono font-bold text-xs border border-forest-900/10">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-white rounded-2xl border border-earth-200 text-center space-y-1">
                    <p className="text-xs text-forest-950 font-medium">Pushya Nakshatra dates for {selectedYear} will be announced shortly.</p>
                    <p className="text-[11px] text-earth-600 font-light">Please contact the clinic reception for upcoming pediatric drop dates.</p>
                  </div>
                )}

                {/* Schedule Note */}
                <p className="text-[11px] text-earth-700 italic font-light pt-1">
                  * Pushya Nakshatra dates vary by year and location. Please confirm the current schedule with our clinic before visiting.
                </p>
              </div>
            </div>

            {/* Right Column: Traditional Ayurvedic Purpose & Medical Safety Notice */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-earth-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brass-600 block">
                  CLASSICAL OBJECTIVES
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-light">
                  Traditional Ayurvedic Purpose
                </h3>

                <p className="text-xs text-earth-800 font-light leading-relaxed">
                  In classical Ayurvedic literature (*Kaumarabhritya*), Swarnaprashana is described with the following traditional wellness intentions:
                </p>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.05
                      }
                    }
                  }}
                  className="space-y-2.5 text-xs text-earth-900 font-medium"
                >
                  {purposePoints.map((point, idx) => (
                    <motion.li
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 14, scale: 0.98 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }
                        }
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.015,
                        boxShadow: "0 10px 25px -5px rgba(28, 59, 44, 0.08), 0 8px 10px -6px rgba(28, 59, 44, 0.04)",
                        borderColor: "rgba(197, 160, 89, 0.45)"
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-start gap-2.5 p-3 bg-cream-50/90 rounded-xl border border-earth-200/80 cursor-default transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Specific Medical Safety Box */}
                <div className="p-3.5 bg-amber-500/10 border-l-3 border-amber-600 rounded-r-xl text-[11px] text-earth-900 leading-relaxed space-y-1">
                  <strong className="text-forest-950 font-semibold block">Safety & Supervised Administration:</strong>
                  <p className="font-light">
                    “Swarnaprashana should be administered only under the guidance of a qualified Ayurvedic practitioner. It should not replace routine pediatric care, vaccination, nutrition or medical treatment.”
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA: Interested in Swarnaprashana for Your Child? */}
          <div className="p-5 sm:p-7 bg-forest-950 text-cream-50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-md">
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-light text-cream-50">
                Interested in Swarnaprashana for Your Child?
              </h3>
              <p className="text-xs text-cream-200/80 font-light leading-relaxed">
                Contact our clinic to confirm the upcoming Pushya Nakshatra date and receive guidance from a qualified Ayurvedic practitioner.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onOpenBooking ? onOpenBooking('Swarnaprashana Pediatric Consultation') : null}
                className="px-6 py-3 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Swarnaprashana</span>
              </button>
              <a
                href={telUri}
                className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full border border-forest-700 transition-all text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-brass-400" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </section>

        {/* SECTION 1: WHAT IS SWARNAPRASHANA? (#overview) */}
        <section id="overview" className="scroll-mt-28 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                  01 • CLASSICAL PEDIATRIC ESSENCE
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950 leading-tight">
                  What is Swarnaprashana?
                </h2>
              </div>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                <strong>Swarnaprashana</strong> (also known as <em>Suvarnaprashana</em> or <em>Swarna Bindu Prashana</em>) is one of the ancient pediatric regimens documented in classical Ayurvedic texts, notably the revered <em>Kashyapa Samhita</em> (*Kaumarabhritya*—pediatric treatise).
              </p>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                The practice involves administering micro-doses of purified, calcined gold ash (*Swarna Bhasma*) combined with medicated ghee and natural honey in unequal proportions. Traditionally prepared under rigorous Ayurvedic pharmaceutical standards (*Shodhana* & *Marana*), it has been cherished for centuries as a supportive regimen for developing children.
              </p>

              <div className="p-4 bg-cream-100/90 rounded-2xl border border-earth-200 flex items-start gap-3.5 text-xs text-forest-950">
                <div className="w-9 h-9 rounded-full bg-forest-900 text-brass-400 flex items-center justify-center shrink-0">
                  <Baby className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <strong className="block text-sm font-serif text-forest-950">Qualified Supervision Essential:</strong>
                  <p className="text-earth-800 leading-relaxed font-light">
                    Formulations, botanical ingredients, and schedules vary according to each child's constitution. Administration should strictly be guided by a qualified Ayurvedic physician.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 pt-1">
                <button
                  onClick={() => onOpenBooking ? onOpenBooking('Swarnaprashana Pediatric Consultation') : null}
                  className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full shadow-elevated transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-brass-400" />
                  <span>Book a Consultation</span>
                </button>

                <a
                  href="#perspective"
                  className="px-6 py-3 bg-white hover:bg-cream-100 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full border border-earth-200 shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Traditional Context</span>
                  <ArrowRight className="w-4 h-4 text-brass-600" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-3xl transform rotate-2 pointer-events-none -z-10" />

                <div className="rounded-3xl overflow-hidden shadow-2xl border border-earth-200 aspect-[4/3] bg-forest-950 relative group">
                  <img
                    src={swarnaImg1}
                    alt="Classical Ayurvedic Pediatric Essence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-5 text-cream-50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-400">
                      Kashyapa Samhita Heritage
                    </span>
                    <p className="font-serif text-lg font-light">Sri Krishna Ayurvedic Clinic</p>
                    <p className="text-xs text-cream-200/80">KR Puram, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: TRADITIONAL AYURVEDIC PERSPECTIVE (#perspective) */}
        <section id="perspective" className="scroll-mt-28 py-10 border-t border-earth-200 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image & Classical Shloka Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-3xl transform -rotate-2 pointer-events-none -z-10" />

                <div className="rounded-3xl overflow-hidden shadow-2xl border border-earth-200 aspect-[4/3] bg-forest-950 relative group">
                  <img
                    src={swarnaImg2}
                    alt="Traditional Ayurvedic Administration of Swarnaprashana"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-5 text-cream-50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-400">
                      Traditional Administration
                    </span>
                    <p className="font-serif text-lg font-light">Suvarna Bindu Prashana</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-forest-950 to-forest-900 text-cream-50 p-5 sm:p-6 rounded-3xl border border-forest-800 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 text-brass-400 border border-brass-500/30 text-[11px] font-semibold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-brass-400" />
                  <span>KASHYAPA SAMHITA • LEHA ADHYAYA</span>
                </div>

                <div className="space-y-1.5 font-serif text-base text-brass-200 italic leading-relaxed pl-3 border-l-2 border-brass-400">
                  <p>
                    "सुवर्णप्राशनं ह्येतन्मेधाग्निबलवर्धनम् ।"
                  </p>
                  <p>
                    "आयुष्यं मङ्गलं पुण्यं वृष्यं ग्रहपहम् ॥"
                  </p>
                </div>

                <p className="text-xs text-cream-200/80 font-light leading-relaxed pt-0.5">
                  Classical verse highlighting the traditional association of gold-infused electuaries with supporting intellect (*Medha*), metabolic strength (*Agni*), physical vigor (*Bala*), and wholesome auspicious vitality.
                </p>
              </div>
            </div>

            {/* Right Perspective Explanation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-ultra font-bold text-brass-600 block">
                  02 • VEDIC CONTEXT & PRINCIPLES
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950 leading-tight">
                  Traditional Ayurvedic Perspective
                </h2>
              </div>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                In classical Ayurveda, childhood (<em>Balyavastha</em>) is viewed as a period of rapid bodily growth where digestive capacity (<em>Dhatvagni</em>) and natural vitality (<em>Ojas</em>) are constantly evolving.
              </p>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                Ancient scholars conceptualized Swarnaprashana as a supportive rasayana measure to nurture equilibrium in growing tissues. While traditional literature associates these botanicals with vitality, modern families should understand these descriptions as a traditional holistic framework rather than guaranteed clinical outcomes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm text-center space-y-1">
                  <span className="text-xl font-serif font-bold text-forest-900 block">Medha</span>
                  <span className="text-xs text-brass-700 font-semibold uppercase tracking-wider block">Cognitive Focus</span>
                  <p className="text-[11px] text-earth-600 font-light">Nurturing clarity and learning</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm text-center space-y-1">
                  <span className="text-xl font-serif font-bold text-forest-900 block">Agni</span>
                  <span className="text-xs text-brass-700 font-semibold uppercase tracking-wider block">Digestive Fire</span>
                  <p className="text-[11px] text-earth-600 font-light">Balanced metabolic assimilation</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-earth-200 shadow-sm text-center space-y-1">
                  <span className="text-xl font-serif font-bold text-forest-900 block">Bala</span>
                  <span className="text-xs text-brass-700 font-semibold uppercase tracking-wider block">Physical Strength</span>
                  <p className="text-[11px] text-earth-600 font-light">Natural stamina and resilience</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: HOW IT IS TRADITIONALLY ADMINISTERED */}
        <section className="py-10 border-t border-earth-200 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                  03 • PROTOCOL & TRADITION
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
                  How It Is Traditionally Administered
                </h2>
              </div>

              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
                Swarnaprashana is administered orally in small, practitioner-prescribed liquid or paste drop forms. The exact composition and administration routine are tailored to the child:
              </p>

              <div className="space-y-2.5 text-xs text-earth-800">
                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-earth-200 shadow-sm">
                  <Sun className="w-4.5 h-4.5 text-brass-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-950 text-xs sm:text-sm font-serif block">Morning Administration on Empty Stomach</strong>
                    <p className="font-light leading-relaxed">Traditionally given early in the morning before breakfast to support optimal bodily assimilation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-earth-200 shadow-sm">
                  <Clock className="w-4.5 h-4.5 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-950 text-xs sm:text-sm font-serif block">Pushya Nakshatra & Periodic Courses</strong>
                    <p className="font-light leading-relaxed">Many families choose monthly administration on auspicious <em>Pushya Nakshatra</em> days, while others follow structured courses guided by the doctor.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-earth-200 shadow-sm">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-950 text-xs sm:text-sm font-serif block">Pharmaceutical Standard Purification</strong>
                    <p className="font-light leading-relaxed">All preparations use authentic *Swarna Bhasma* processed through classical Ayurvedic purification (*Shodhana*) to ensure safety and bio-compatibility.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {/* Image 3: Focus & Learning / Medha Vardhana */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-3xl transform rotate-2 pointer-events-none -z-10" />

                <div className="rounded-3xl overflow-hidden shadow-2xl border border-earth-200 aspect-[4/3] bg-forest-950 relative group">
                  <img
                    src={swarnaImg3}
                    alt="Cognitive Development and Learning in Children"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-5 text-cream-50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-400">
                      Medha & Smriti Vardhana
                    </span>
                    <p className="font-serif text-lg font-light">Supporting Intellect & Focus</p>
                  </div>
                </div>
              </div>

              {/* Guidance card */}
              <div className="bg-cream-100 p-6 sm:p-7 rounded-3xl border border-earth-200 space-y-4">
                <div className="flex items-center gap-2.5 text-forest-950 font-serif text-xl font-medium">
                  <Award className="w-5 h-5 text-brass-600" />
                  <h3>Clinic Consultation Guidance</h3>
                </div>

                <p className="text-xs sm:text-sm text-earth-800 leading-relaxed font-light">
                  At Sri Krishna Ayurvedic Clinic, Dr. Anand Krishna (BAMS, 26+ yrs experience) provides direct consultation for parents. During your visit:
                </p>

                <ul className="space-y-2 text-xs text-earth-800 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>The child's age, dietary patterns, and health history are evaluated.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exact formulation, authentic sourcing, and dosage instructions are explained.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Guidance on supportive daily diet (Ahara) and routine (Vihara) is provided.</span>
                  </li>
                </ul>

                <div className="pt-1">
                  <button
                    onClick={() => onOpenBooking ? onOpenBooking('Swarnaprashana Pediatric Consultation') : null}
                    className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition-all text-center cursor-pointer"
                  >
                    Schedule Child Consultation (₹50)
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: POTENTIAL TRADITIONAL BENEFITS (RESPONSIBLE CARD GRID) */}
        <section className="py-10 border-t border-earth-200 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              04 • CLASSICAL THEMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
              Potential Traditional Benefits
            </h2>
            <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
              Traditional Ayurvedic literature describes the following supportive areas associated with regular, supervised Swarnaprashana practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Card 1: Wellbeing */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-elevated space-y-2.5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-forest-50 text-forest-900 flex items-center justify-center">
                <HeartHandshake className="w-4.5 h-4.5 text-forest-800" />
              </div>
              <h3 className="font-serif text-lg font-medium text-forest-950">Wellbeing</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Traditionally associated with supporting overall child wellbeing, metabolic harmony, and natural equilibrium.
              </p>
            </div>

            {/* Card 2: Strength & Vitality */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-elevated space-y-2.5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-brass-50 text-brass-900 flex items-center justify-center">
                <ShieldCheck className="w-4.5 h-4.5 text-brass-700" />
              </div>
              <h3 className="font-serif text-lg font-medium text-forest-950">Strength & Vitality</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Described in classical pediatric care as supportive of physical stamina (*Bala*) and tissue vigor (*Ojas*).
              </p>
            </div>

            {/* Card 3: Development */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-elevated space-y-2.5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-forest-50 text-forest-900 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-forest-800" />
              </div>
              <h3 className="font-serif text-lg font-medium text-forest-950">Development</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Traditional Ayurvedic literature associates the practice with aspects of cognitive nurturing and sharpness (*Medha*).
              </p>
            </div>

            {/* Card 4: Holistic Care */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-elevated space-y-2.5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-brass-50 text-brass-900 flex items-center justify-center">
                <Baby className="w-4.5 h-4.5 text-brass-700" />
              </div>
              <h3 className="font-serif text-lg font-medium text-forest-950">Holistic Care</h3>
              <p className="text-xs text-earth-800 leading-relaxed font-light">
                Presented as part of a broader, compassionate approach combining balanced pediatric nutrition and healthy routine.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 5: IMPORTANT CONSIDERATIONS & SAFETY */}
        <section className="p-6 sm:p-8 bg-amber-500/10 rounded-3xl border border-amber-500/30 mb-12 space-y-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-serif text-forest-950 font-medium">
              Important Considerations for Parents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-earth-900 leading-relaxed">
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>Professional Consultation:</strong> Always consult a qualified Ayurvedic practitioner (BAMS) before administration.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>Individual Assessment:</strong> Individual suitability, dosage, and frequency must be assessed based on the child's constitution.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>Medical Disclosure:</strong> Disclose known allergies, existing medical conditions, and current medications to the doctor.</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>No DIY Preparation:</strong> Do not attempt home preparation or purchase uncertified/unverified formulations.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>Strict Adherence:</strong> Follow strictly the practitioner's recommended formulation, dosage, and timing schedule.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p><strong>Complementary Role:</strong> Swarnaprashana should not replace routine pediatric medical care or recommended childhood vaccinations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CLINIC APPOINTMENT CTA */}
        <section className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              PEDIATRIC CONSULTATION • KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Considering Swarnaprashana for Your Child?
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Speak with our senior Ayurvedic physician, Dr. Anand Krishna (BAMS), to understand whether this traditional practice is appropriate for your child's individual needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Swarnaprashana Pediatric Consultation') : null}
              className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Swarnaprashana</span>
            </button>
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-full border border-forest-700 transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brass-400" />
              <span>Contact Us</span>
            </Link>
          </div>
        </section>

        {/* SECTION 7: RELATED TREATMENTS */}
        <RelatedTreatments currentTreatmentId="swarnaprashana" count={3} />

      </div>
    </motion.div>
  );
}
