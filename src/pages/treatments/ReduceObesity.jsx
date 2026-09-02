import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, Scale, Flame, Activity, Zap, Droplet } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function ReduceObesity({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const areasOfSupport = [
    "Targeted visceral and subcutaneous fat reduction (Medasaha Pravilaapanam)",
    "Correcting sluggish metabolic rate & rekindling tissue fire (Dhatvagni)",
    "Cellulite breakdown, lymphatic drainage & skin tightening via Udwarthanam",
    "Eliminating toxic metabolic residues (Ama) that block lipid channels",
    "Controlling excessive appetite, false hunger spikes & sugar cravings",
    "Supporting healthy lipid profiles, cholesterol balance & liver function",
    "Restoring joint flexibility, stamina & vital energy levels",
    "Personalized long-term Dinacharya (daily routine) to prevent weight rebound"
  ];

  const therapies = [
    {
      name: "Udwarthanam (Herbal Powder Scraping)",
      tag: "Signature Therapy",
      icon: Flame,
      desc: "A vigorous, stimulating full-body massage using dry herbal powders applied in upward strokes against hair follicles (Pratiloma gati). It scrapes stubborn fat deposits (Medas), liquefies subcutaneous adipose tissue, stimulates lymphatic flow, and firms skin tone."
    },
    {
      name: "Lekhana Basti (Medicated Detox Enema)",
      tag: "Ayurvedic Detox",
      icon: Droplet,
      desc: "A specialized classical Ayurvedic therapy utilizing herbal decoctions prepared with Triphala, honey, rock salt, and alkaline herbal extracts. It deeply scrapes visceral toxins (Ama), balances Kapha-Vata, and clears congested fat channels (Medovaha Srotas)."
    },
    {
      name: "Dhatvagni & Metabolic Fire Kindling",
      tag: "Metabolic Balance",
      icon: Zap,
      desc: "Administering potent Dipana (digestive igniting) and Pachana (toxin-clearing) botanicals to revitalize sluggish cellular metabolism, ensuring food is converted into active energy rather than stored as fat."
    },
    {
      name: "Medohara Classical Formulations",
      tag: "Classical Phytotherapy",
      icon: Sparkles,
      desc: "Physician-guided administration of authentic formulations like Navaka Guggulu, Medohar Vidangadi Lauha, Triphala Guggulu, and Varunadi Kashayam to naturally break down stubborn lipids and normalize fat synthesis."
    },
    {
      name: "Kapha-Medas Dietary Guidance (Ahara)",
      tag: "Personalized Nutrition",
      icon: Scale,
      desc: "Tailored food plans rich in wholesome ancient grains (barley/Yava, horsegram/Kulatthi, millets), bitter gourd, and metabolism-spicing teas, strictly minimizing refined carbohydrates, saturated fats, and heavy dairy."
    },
    {
      name: "Therapeutic Movement & Yoga (Vyayama)",
      tag: "Lifestyle & Vihara",
      icon: Activity,
      desc: "Personalized daily physical movement, Surya Namaskar, metabolic yoga postures, and stimulating Pranayama (Bhastrika & Kapalabhati) designed to increase calorie burn and optimize endocrine function."
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
        badge="METABOLIC & WEIGHT MANAGEMENT"
        title="Reduce Obesity – Ayurvedic Weight & Fat Loss"
        subtitle="Holistic, root-cause Ayurvedic weight management combining Udwarthanam herbal powder scraping, gentle metabolic detox, and metabolic revival for sustainable fat loss."
        bgImage="/images/reduce_obesity.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Reduce Obesity' }
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

        {/* Realistic Expectations & Scientific Disclaimer Banner */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">
              Sustainable & Safe Clinical Approach
            </strong>
            <p className="leading-relaxed font-light">
              Ayurveda rejects crash diets and unnatural starvation methods. Our weight reduction protocol focuses on restoring your underlying metabolic fire (<em>Agni</em>), clearing blocked fat channels (<em>Medovaha Srotas</em>), and establishing sustainable lifestyle habits for lifelong weight control.
            </p>
          </div>
        </div>

        {/* Main Grid: Overview & Core Support Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          {/* Left Column: Understanding Sthoulya in Ayurveda */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • AYURVEDIC METABOLIC PERSPECTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Root-Cause Weight Loss (Sthoulya & Medoroga)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  In classical Ayurveda, obesity is termed <strong>Sthoulya</strong> or <strong>Medoroga</strong>. It is primarily caused by an aggravated <em>Kapha Dosha</em> and impaired <em>Medodhatvagni</em> (fat tissue metabolism). When digestive fire is sluggish, food is not properly metabolized and transforms into <strong>Ama</strong> (metabolic toxins), which selectively accumulates as excess <em>Meda Dhatu</em> (adipose tissue) while starving other vital tissues.
                </p>
                <p>
                  At <strong>Sri Krishna Ayurvedic Clinic</strong>, Dr. Anand Krishna conducts a thorough <strong>Nadi Pariksha</strong> (Pulse Diagnosis) to identify your metabolic constitution and endocrine imbalances. We then apply specialized <em>Apatarpana</em> (depletion and scraping therapies) to burn stubborn fat safely and restore vitality.
                </p>
              </div>

              {/* 3 Key Clinical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200 text-center">
                  <Flame className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <strong className="text-forest-950 text-xs font-serif block">Kindle Agni</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-0.5">Revives basal metabolic rate.</p>
                </div>

                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200 text-center">
                  <Scale className="w-5 h-5 text-forest-800 mx-auto mb-1" />
                  <strong className="text-forest-950 text-xs font-serif block">Scrape Fat (Lekhana)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-0.5">Clears stubborn adipose tissue.</p>
                </div>

                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200 text-center">
                  <Activity className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <strong className="text-forest-950 text-xs font-serif block">No Rebound</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-0.5">Builds sustainable daily habits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Support Areas Checklist */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                02 • DOMAINS OF CARE
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Key Benefits of Our Program
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                Comprehensive therapeutic interventions to ensure healthy, energized weight management:
              </p>

              <ul className="space-y-2 text-xs text-forest-950 font-medium">
                {areasOfSupport.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-earth-200/80 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Section 03: Comprehensive Ayurvedic Weight Reduction Therapies */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • SIGNATURE THERAPIES & MODALITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              How We Treat Obesity & Excess Weight
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Every weight reduction regimen is tailored to your unique Prakriti, metabolic rate, and health goals:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapies.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2.5 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-forest-900 text-brass-400 flex items-center justify-center">
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brass-500/10 text-brass-800 border border-brass-300/40">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-medium text-forest-950 group-hover:text-forest-800 transition-colors">
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
        </div>

        {/* Section 04: Actionable Daily Lifestyle & Dietary Tips for Weight Loss */}
        <div className="bg-gradient-to-r from-forest-950 to-forest-900 text-cream-50 p-6 sm:p-8 rounded-3xl shadow-elevated mb-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              04 • PRACTICAL AYURVEDIC TIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light">
              Daily Habits for Metabolic Ignition
            </h2>
            <p className="text-cream-200/80 text-xs sm:text-sm font-light">
              Simple yet powerful classical lifestyle practices you can integrate right away:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-forest-900/80 rounded-2xl border border-brass-500/20 space-y-1.5">
              <strong className="text-brass-300 font-semibold block text-sm">1. Warm Water Sips</strong>
              <p className="text-cream-200/75 font-light leading-relaxed">
                Drink warm water or dry ginger-infused tea throughout the day to kindle Agni and flush liquefied metabolic waste.
              </p>
            </div>

            <div className="p-4 bg-forest-900/80 rounded-2xl border border-brass-500/20 space-y-1.5">
              <strong className="text-brass-300 font-semibold block text-sm">2. Avoid Daytime Sleep</strong>
              <p className="text-cream-200/75 font-light leading-relaxed">
                Daytime sleeping (Divasvapna) drastically aggravates Kapha and slows down fat metabolism. Keep daytime active.
              </p>
            </div>

            <div className="p-4 bg-forest-900/80 rounded-2xl border border-brass-500/20 space-y-1.5">
              <strong className="text-brass-300 font-semibold block text-sm">3. Light & Early Dinner</strong>
              <p className="text-cream-200/75 font-light leading-relaxed">
                Consume dinner before 7:30 PM consisting of light barley soups or steamed greens to prevent nighttime fat accumulation.
              </p>
            </div>

            <div className="p-4 bg-forest-900/80 rounded-2xl border border-brass-500/20 space-y-1.5">
              <strong className="text-brass-300 font-semibold block text-sm">4. Morning Movement</strong>
              <p className="text-cream-200/75 font-light leading-relaxed">
                Engage in 30 minutes of brisk walking or Surya Namaskars during early morning Kapha hours (6 AM – 8 AM).
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card: Consultation Booking */}
        <div className="bg-cream-100/90 rounded-3xl p-6 sm:p-10 border border-earth-200 shadow-sm text-center max-w-4xl mx-auto space-y-6 mb-16">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              BEGIN YOUR HEALTHY WEIGHT JOURNEY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-forest-950 font-light">
              Schedule Your Ayurvedic Weight Consultation
            </h2>
            <p className="text-xs sm:text-sm text-earth-800 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the fat-scraping benefits of authentic Udwarthanam and personalized Medoroga management under Senior Physician Dr. Anand Krishna.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 rounded-full font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-elevated"
            >
              <Calendar className="w-4 h-4 text-brass-400" />
              <span>Book Weight Loss Consultation</span>
            </button>

            <a
              href={telUri}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-cream-50 text-forest-950 border border-earth-300 rounded-full font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-forest-700" />
              <span>Call Clinic ({clinicData.contact.phone})</span>
            </a>
          </div>
        </div>

        {/* Related Treatments Component */}
        <RelatedTreatments currentTreatmentId="reduce-obesity" />

      </div>
    </motion.div>
  );
}
