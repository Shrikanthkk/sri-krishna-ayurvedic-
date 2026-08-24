import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, Activity, Bone, Zap, ShieldCheck, Award, HeartHandshake, Compass } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function Physiotherapy({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const clinicalConditions = [
    "Chronic Low Back Pain, Sciatica (Gridhrasi) & Lumbar Disc Herniation",
    "Cervical Spondylosis, Neck Stiffness, Radiation Numbness & Vertigo",
    "Knee Osteoarthritis (Sandhivata), Cartilage Wear & Joint Immobility",
    "Frozen Shoulder (Apabahuka), Rotator Cuff Injuries & Bursitis",
    "Post-Stroke Paralysis Recovery (Pakshaghata) & Motor Re-education",
    "Nerve Compression, Piriformis Syndrome & Peripheral Neuropathies",
    "Post-Surgical Orthopedic Rehabilitation (Ligament, ACL, Joint Replacements)",
    "Postural Correction, Ergonomic Strain & Sports Injury Recovery"
  ];

  const modalities = [
    {
      name: "Manual Physical Therapy & Spinal Mobilization",
      tag: "Functional Movement",
      icon: Activity,
      desc: "Targeted hands-on physical therapy techniques, gentle joint traction, passive range-of-motion mobilization, and myofascial trigger point release to rapidly restore functional joint biomechanics and reduce mechanical nerve impingement."
    },
    {
      name: "Kati Basti & Janu Basti (Localized Oil Retention)",
      tag: "Classical Panchakarma",
      icon: Bone,
      desc: "A classical Ayurvedic specialized therapy where a reservoir of medicated dough is placed over the spine (Kati) or knees (Janu) and filled with warm, dosha-specific medicated oils (Mahanarayana, Ksheerabala). Deeply lubricates degenerated discs and nourishes spinal cartilage."
    },
    {
      name: "Patra Pinda Sweda (Medicinal Leaf Bolus Fomentation)",
      tag: "Thermo-Therapy",
      icon: Sparkles,
      desc: "Herbal boluses filled with anti-inflammatory leaves (Eranda, Nirgundi, Arka) fried in medicated oils applied rhythmically over painful muscles and joints to reduce severe stiffness, melt inflammatory fluid, and enhance micro-circulation."
    },
    {
      name: "Electrotherapy & Decompression Modalities",
      tag: "Modern Electrotherapy",
      icon: Zap,
      desc: "Integrated application of therapeutic ultrasound, Interferential Therapy (IFT), and TENS to safely block acute pain signals, stimulate deep muscle fibers, and accelerate natural tissue repair without pharmaceutical painkillers."
    },
    {
      name: "Neuromuscular & Post-Stroke Rehabilitation",
      tag: "Neuro-Rehab",
      icon: Compass,
      desc: "Comprehensive motor re-learning protocols for post-stroke hemiplegia, facial palsy, and nerve blockages, combining Shashtika Shali Pinda Sweda (rice-milk bundle muscle nourishment) with progressive gait training."
    },
    {
      name: "Core Stabilization & Ergonomic Re-education",
      tag: "Long-Term Prevention",
      icon: ShieldCheck,
      desc: "Customized therapeutic exercise prescription targeting deep stabilizing muscles (transversus abdominis, multifidus, gluteals) alongside workplace ergonomics to ensure lasting spinal health and prevent symptom recurrence."
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
        badge="NEURO-MUSCULOSKELETAL REHABILITATION"
        title="Ayurvedic Physiotherapy & Rehabilitation"
        subtitle="Integrative neuro-musculoskeletal rehabilitation combining modern physical therapy, spine mobilization, and specialized Ayurvedic Basti therapies for rapid, non-surgical recovery."
        bgImage="/images/physiotherapy_rehab.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Physiotherapy & Rehabilitation' }
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

        {/* Clinical Integrative Care Notice */}
        <div className="p-4 sm:p-5 bg-blue-500/10 border-l-4 border-blue-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">Integrative Rehabilitation Methodology</strong>
            <p className="leading-relaxed">
              Our clinic provides a specialized hybrid model combining evidence-based physical therapy evaluations with authentic classical Ayurvedic spine and joint therapies (Kati Basti, Janu Basti, Patra Pinda Sweda) under the clinical supervision of Dr. Sunithi and Senior Physician Dr. Anand Krishna (BAMS).
            </p>
          </div>
        </div>

        {/* 1. Deep Clinical Overview Section */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-earth-200 shadow-elevated mb-12 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-brass-500" />
              <span>SYNERGY OF AYURVEDA & PHYSICAL MEDICINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-950 font-light">
              Restoring Pain-Free Mobility & Spinal Health
            </h2>
            <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
              Musculoskeletal and neuromuscular disorders—ranging from herniated lumbar discs and severe sciatica to frozen shoulders and post-stroke mobility impairments—require both structural biomechanical correction and cellular tissue rejuvenation. In Ayurveda, joint and spinal degeneration are understood as <strong>Vata-predominant disorders (Sandhigata Vata & Asthi-Majja Dhatu Kshaya)</strong>. By infusing therapeutic physical exercise with deep warm herbal oil basti reservoirs, we accelerate nerve decompression and tissue regeneration without surgery.
            </p>
          </div>

          {/* Two-Column Feature: Image + Core Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-medium">
                Conditions Treated with High Clinical Success
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed">
                Whether you suffer from chronic disc bulge, nerve numbness, arthritis, or are recovering from orthopedic surgery or stroke, our customized programs are tailored to your functional goals:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {clinicalConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-earth-900 bg-cream-50 p-2.5 rounded-xl border border-earth-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-earth-200 group">
                <img 
                  src="/images/physiotherapy_rehab.jpg" 
                  alt="Physiotherapy and Rehabilitation Care at Sri Krishna Clinic" 
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">Clinical Care</span>
                  <h4 className="font-serif text-lg font-medium text-cream-50">Expert Physical Rehabilitation</h4>
                  <p className="text-xs text-cream-200/80 font-light mt-1">Joint mobilization, neuromuscular retraining & core strengthening.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Comprehensive Modalities Grid */}
        <section className="space-y-6 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brass-600 uppercase tracking-widest block">
              INTEGRATIVE MODALITIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-950 font-light">
              Core Rehabilitation Therapies
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Our multidisciplinary approach combines hands-on physical therapy techniques with authentic classical Ayurvedic external treatments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm hover:shadow-elevated transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-forest-900 text-brass-400 flex items-center justify-center shadow-soft">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream-100 text-forest-950 border border-earth-200">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-forest-950 font-medium leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-earth-800 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Spine & Joint Spotlight Feature */}
        <section className="bg-cream-100/70 p-6 sm:p-8 lg:p-10 rounded-3xl border border-earth-200 shadow-sm mb-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-widest block">
                SPECIALIZED PROTOCOLS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-light">
                Spine Decompression & Joint Preservation
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed">
                Why patients choose our integrated therapy instead of relying on long-term painkillers or undergoing invasive spinal surgeries:
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Non-Surgical Disc Nourishment</strong>
                  <p className="text-earth-700 font-light mt-0.5">Kati Basti allows high-potency herbal lipids to permeate deep into spinal intervertebral discs, reducing inflammation around irritated nerve roots.</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Active Rehabilitation & Strengthening</strong>
                  <p className="text-earth-700 font-light mt-0.5">We don't just relieve acute pain; we strengthen weak muscle groups and re-align posture to prevent future flare-ups.</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Recognized Patient Satisfaction</strong>
                  <p className="text-earth-700 font-light mt-0.5">Patients across Bangalore consistently commend our attentive, individualized care and rapid relief from chronic musculoskeletal pain.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-earth-200">
                <img 
                  src="/images/spine_rehab_therapy.jpg" 
                  alt="Ayurvedic Spine Rehabilitation and Posture Care" 
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">Targeted Spine Therapy</span>
                  <h4 className="font-serif text-base font-medium text-cream-50">Lumbar & Cervical Decompression</h4>
                  <p className="text-xs text-cream-200/80 font-light mt-0.5">Gentle mobilization and postural rehabilitation in a serene setting.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Consultation & Appointment CTA */}
        <div className="bg-forest-950 text-cream-50 p-8 sm:p-10 rounded-3xl shadow-elevated text-center space-y-5 border border-brass-500/20 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-400 text-xs font-mono font-bold uppercase tracking-wider border border-brass-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>REHABILITATION & PHYSIOTHERAPY DESK</span>
          </div>
          
          <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-light max-w-2xl mx-auto">
            Experience Freedom from Pain & Regain Your Active Life
          </h3>
          
          <p className="text-xs sm:text-sm text-cream-200/80 font-light max-w-xl mx-auto leading-relaxed">
            Schedule an evaluation with our physical rehabilitation and Ayurvedic clinical team at Sri Krishna Ayurvedic Clinic, Bangalore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking && onOpenBooking('Physiotherapy & Rehabilitation')}
              className="px-6 py-3 bg-brass-500 hover:bg-brass-400 text-forest-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Rehabilitation Session</span>
            </button>

            <a
              href={telUri}
              className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full border border-forest-700 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brass-400" />
              <span>Call Clinic: {clinicData.contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Related Treatments Module */}
        <RelatedTreatments currentTreatmentId="physiotherapy" />

      </div>
    </motion.div>
  );
}
