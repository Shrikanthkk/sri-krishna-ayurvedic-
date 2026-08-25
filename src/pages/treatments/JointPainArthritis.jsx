import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, Activity, ShieldCheck, HeartPulse, Flame } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function JointPainArthritis({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const concerns = [
    "Joint pain & inflammation",
    "Joint stiffness (especially morning stiffness)",
    "Knee discomfort & crepitus",
    "Shoulder discomfort & frozen shoulder",
    "Back discomfort & lumbar strain",
    "Reduced joint mobility & range of motion",
    "Arthritis-related discomfort (Osteoarthritis, Rheumatoid, Spondylosis)"
  ];

  const therapies = [
    {
      name: "Abhyanga",
      desc: "Full body or targeted warm medicated oil massage with classical anti-Vata oils (Mahanarayana, Ksheerabala) to nourish dry cartilage, lubricate joint capsules, and enhance circulation."
    },
    {
      name: "Swedana",
      desc: "Medicated herbal steam and warm fomentation therapies to relieve stiffness, open subtle tissue channels (Srotas), and eliminate deep-seated metabolic toxins (Ama)."
    },
    {
      name: "Localized Ayurvedic Therapies (Vastis)",
      desc: "Targeted localized oil retaining reservoirs like Janu Vasti (knees), Kati Vasti (lower back), and Greeva Vasti (cervical spine) providing deep tissue nourishment."
    },
    {
      name: "Herbal Applications & Lepas",
      desc: "Topical application of warm anti-inflammatory herbal pastes (Nagaradi, Rasnadi) to soothe localized swelling and relieve acute joint tenderness."
    },
    {
      name: "Yoga & Gentle Movement",
      desc: "Customized low-impact joint freeing exercises (Sukshma Vyayama) and restorative asanas to preserve joint flexibility without mechanical overload."
    },
    {
      name: "Diet & Lifestyle Guidance",
      desc: "Individualized Vata-pacifying nutrition emphasizing warm, unctuous, easily digestible meals, anti-inflammatory spices (ginger, turmeric), and daily joint care routines."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <PageHero
        badge="MUSCULOSKELETAL AYURVEDA"
        title="Joint Pain & Arthritis – Ayurvedic Care"
        subtitle="Ayurvedic care focusing on supporting joint mobility, flexibility, cartilage nourishment, and long-term musculoskeletal wellness."
        bgImage="/images/joint_pain_arthritis.png"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Joint Pain & Arthritis' }
            ]}
          />

          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-900 hover:text-brass-700 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 text-brass-600" />
            <span>Back to All Treatments</span>
          </Link>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Activity className="w-4 h-4 text-brass-500" />
            <span>Root-Cause Musculoskeletal Healing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Care for Joint Pain & Arthritis
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            At Sri Krishna Ayurvedic Clinic, our Ayurvedic care for joint pain and arthritis focuses on restoring healthy mobility, alleviating painful stiffness, and nourishing structural connective tissues. Through personalized clinical evaluations by Dr. Anand Krishna (BAMS), we create a holistic therapeutic plan combining classical external therapies, internal herbal rasayanas, and restorative lifestyle practices.
          </p>
        </div>

        {/* 2-Column: Common Concerns & Classical Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Common Concerns */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • SYMPTOMS & PRESENTATIONS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Common Concerns Addressed
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We evaluate and provide individualized supportive care for a wide range of joint and musculoskeletal discomforts:
              </p>

              <ul className="space-y-2.5 text-xs text-forest-950 font-medium">
                {concerns.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-earth-200/80 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Ayurvedic Perspective */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                02 • CLASSICAL PATHOLOGY & PRINCIPLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective on Joint Health (Sandhi & Vata)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  In Ayurveda, joints are referred to as <strong>Sandhi</strong> and are primary seats of <strong>Vata Dosha</strong> and <strong>Sleshaka Kapha</strong> (the natural protective synovial fluid that provides smooth lubrication and cushioning).
                </p>
                <p>
                  When Vata increases due to age, stress, cold climates, or poor digestion, its dry (*Ruksha*) and cold (*Sheeta*) qualities deplete synovial fluid, leading to <em>Sandhivata</em> (degenerative osteoarthritis) characterized by crepitation, pain on movement, and restricted flexibility.
                </p>
                <p>
                  Conversely, when poor digestive fire (*Agni*) creates metabolic toxicity (*Ama*), it circulates and lodges within joints alongside aggravated Vata, manifesting as <em>Amavata</em> (inflammatory rheumatoid-like conditions) with morning stiffness, swelling, and burning discomfort.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Sandhivata (Vata in Joints)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Degenerative joint dryness, cartilage wear, cracking sounds, and stiffness.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Amavata (Toxin Accumulation)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Systemic inflammation, severe morning stiffness, joint heat, and tenderness.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Ayurvedic Care & Therapies */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • COMPREHENSIVE PROTOCOLS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Personalized Ayurvedic Care Protocols
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Based on your specific Dosha constitution and joint assessment, Dr. Anand Krishna prescribes an integrative regimen:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapies.map((th, i) => (
              <div key={i} className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif text-base font-medium text-forest-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-900 text-brass-400 text-xs flex items-center justify-center font-mono font-bold">
                    0{i + 1}
                  </span>
                  <span>{th.name}</span>
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {th.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              CONSULTATION IN KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Ready to Restore Your Joint Comfort & Mobility?
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Schedule an in-person consultation with senior physician Dr. Anand Krishna (BAMS, 26+ years clinical practice) for a thorough joint assessment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Joint Pain & Arthritis Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
            <a
              href={telUri}
              className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>

        {/* Explore Other Treatments */}
        <RelatedTreatments currentTreatmentId="joint-pain-arthritis" />

      </div>
    </motion.div>
  );
}
