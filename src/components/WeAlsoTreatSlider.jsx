import React, { useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  Wind, 
  Activity, 
  ShieldCheck, 
  Flame, 
  Sun, 
  Moon, 
  Droplet, 
  Droplets,
  Feather, 
  Smile, 
  HeartHandshake
} from 'lucide-react';

/*
 * ─────────────────────────────────────────────────────────────
 *  WeAlsoTreatSlider — Dual-Track Opposite-Direction Carousel
 *
 *  Row 1: Moves smoothly Right to Left (←)
 *  Row 2: Moves smoothly Left to Right (→)
 *  Hovering pauses the animation instantly; unhovering resumes it.
 * ─────────────────────────────────────────────────────────────
 */

const DUAL_CAROUSEL_CSS = `
  @keyframes sk_treatments_left {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes sk_treatments_right {
    0% {
      transform: translate3d(-50%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  .sk-treatments-track-left {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: sk_treatments_left 42s linear infinite;
  }

  .sk-treatments-track-right {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: sk_treatments_right 42s linear infinite;
  }

  .sk-treatments-slider-container:hover .sk-treatments-track-left,
  .sk-treatments-slider-container:hover .sk-treatments-track-right {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    .sk-treatments-track-left,
    .sk-treatments-track-right {
      animation-duration: 34s;
    }
  }
`;

function injectDualCarouselCSS() {
  if (document.getElementById('sk-treatments-dual-style')) return;
  const style = document.createElement('style');
  style.id = 'sk-treatments-dual-style';
  style.textContent = DUAL_CAROUSEL_CSS;
  document.head.appendChild(style);
}

export default function WeAlsoTreatSlider({ onOpenBooking }) {
  useEffect(() => {
    injectDualCarouselCSS();
  }, []);

  const treatmentsData = [
    {
      id: "allergies",
      title: "Allergies",
      description: "Personalized Ayurvedic care focused on supporting respiratory and immune balance.",
      icon: Wind
    },
    {
      id: "anemia",
      title: "Anemia",
      description: "Traditional nutritional and Rasayana approaches to support healthy blood and vitality.",
      icon: Droplet
    },
    {
      id: "anxiety",
      title: "Anxiety",
      description: "Mind-calming therapies, herbal nervines, and lifestyle harmonization for emotional balance.",
      icon: Smile
    },
    {
      id: "arthritis",
      title: "Arthritis",
      description: "Classical Vata-pacifying therapies, medicated herbal oils, and joint mobility support.",
      icon: Activity
    },
    {
      id: "asthma",
      title: "Asthma",
      description: "Herbal broncho-supportive regimens and Pranayama techniques for respiratory ease.",
      icon: Wind
    },
    {
      id: "backache",
      title: "Backache",
      description: "Targeted spinal care, Kati Vasti therapies, and herbal oils for muscular comfort.",
      icon: ShieldCheck
    },
    {
      id: "blood-pressure",
      title: "Blood Pressure",
      description: "Holistic lifestyle and herbal protocols for balanced cardiovascular well-being.",
      icon: Heart
    },
    {
      id: "bronchitis",
      title: "Bronchitis",
      description: "Classical herbal formulations to soothe bronchial passages and clear congestion.",
      icon: Wind
    },
    {
      id: "cholesterol",
      title: "Cholesterol",
      description: "Metabolic Agni stimulation and dietary guidance to support healthy lipid equilibrium.",
      icon: Flame
    },
    {
      id: "dandruff",
      title: "Dandruff",
      description: "Medicated herbal scalp oils and natural cleansers to balance scalp flora and minimize flaking.",
      icon: Sparkles
    },
    {
      id: "dermatitis",
      title: "Dermatitis",
      description: "Blood-purifying herbs and soothing topical botanical preparations for sensitive skin.",
      icon: Sparkles
    },
    {
      id: "diabetes",
      title: "Diabetes",
      description: "Classical Madhumeha principles, digestive Agni rejuvenation, and glycemic dietary plans.",
      icon: Activity
    },
    {
      id: "hair-problems",
      title: "Hair Problems",
      description: "Holistic scalp nourishment, Shiro Abhyanga, and root-strengthening botanical formulations.",
      icon: Feather
    },
    {
      id: "headache",
      title: "Headache",
      description: "Stress-relieving therapies, Shirodhara guidance, and customized trigger management.",
      icon: Sun
    },
    {
      id: "hyperacidity",
      title: "Hyperacidity",
      description: "Cooling Pitta-pacifying botanicals and digestive diet adjustments for gastric comfort.",
      icon: Flame
    },
    {
      id: "hypertension",
      title: "Hypertension",
      description: "Ayurvedic lifestyle and wellness support for healthy blood-pressure management.",
      icon: Heart
    },
    {
      id: "menopausal-syndrome",
      title: "Menopausal Syndrome",
      description: "Natural hormonal transition support, Rasayana herbs, and rejuvenating lifestyle care.",
      icon: Sun
    },
    {
      id: "overweight",
      title: "Overweight",
      description: "Metabolic Agni enhancement, dietary realignment, and gentle detoxifying therapies.",
      icon: Activity
    },
    {
      id: "piles",
      title: "Piles",
      description: "Gentle digestive correction, bowel regulation, and soothing local herbal remedies.",
      icon: ShieldCheck
    },
    {
      id: "prostate-problems",
      title: "Prostate Problems",
      description: "Targeted herbal regimens supporting healthy urinary flow and prostate vitality.",
      icon: Activity
    },
    {
      id: "psoriasis",
      title: "Psoriasis",
      description: "Holistic Pitta-Kapha skin balancing, dietary guidance, and botanical external care.",
      icon: Sparkles
    },
    {
      id: "sinusitis",
      title: "Sinusitis",
      description: "Nasya therapies and herbal steam formulations to relieve chronic sinus congestion.",
      icon: Wind
    },
    {
      id: "sleep-disorders",
      title: "Sleep Disorders",
      description: "Nidra-promoting therapies, herbal adaptogens, and evening wind-down routines.",
      icon: Moon
    },
    {
      id: "stress",
      title: "Stress",
      description: "Comprehensive stress reduction via Ayurvedic consultations, Pranayama, and herbs.",
      icon: Heart
    },
    {
      id: "urinary-tract-infection",
      title: "Urinary Tract Infection",
      description: "Soothing diuretic herbs, hydration protocols, and Pitta-clearing urinary care.",
      icon: Droplets
    },
    {
      id: "alopecia",
      title: "Alopecia",
      description: "Targeted Ayurvedic hair and scalp therapy addressing patchy hair loss naturally.",
      icon: Feather
    },
    {
      id: "and-many-more",
      title: "And Many More",
      description: "Explore personalized Ayurvedic care for additional health and wellness concerns.",
      icon: HeartHandshake
    }
  ];

  // Split into 2 Rows
  const row1Data = treatmentsData.slice(0, 14);
  const row2Data = treatmentsData.slice(14);

  const renderCard = (item, idx, keyPrefix) => {
    const IconComponent = item.icon;
    return (
      <div
        key={`${keyPrefix}-${item.id}`}
        className="w-[260px] sm:w-[280px] shrink-0 px-2 sm:px-2.5"
      >
        <div
          className="h-full min-h-[175px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between select-none bg-white text-forest-950 border-earth-200 shadow-sm hover:shadow-elevated hover:border-brass-400/50"
        >
          {/* Top Icon & Index */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-cream-100 text-forest-800 transition-colors">
              <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-forest-900" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="font-serif text-[17px] sm:text-[19px] font-semibold leading-snug text-forest-950">
              {item.title}
            </h3>
            <p className="text-xs sm:text-[13.5px] font-medium leading-relaxed text-earth-900">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-cream-50/80 border-t border-earth-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>WE ALSO TREAT</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950">
            Comprehensive Ayurvedic Care
          </h2>
          <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
            Personalized Ayurvedic support for a wide range of health and wellness concerns.
          </p>
        </div>

      </div>

      {/* Dual Opposite-Direction Continuous Marquee Tracks (Hover to Pause) */}
      <div 
        className="sk-treatments-slider-container w-full overflow-hidden relative space-y-3 sm:space-y-4"
      >
        
        {/* Subtle Edge Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-cream-50/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-cream-50/95 to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Right to Left (←) */}
        <div className="sk-treatments-track-left">
          {/* First Copy */}
          <div className="flex items-center">
            {row1Data.map((item, idx) => renderCard(item, idx, 'row1-set1'))}
          </div>
          {/* Duplicate Copy for Continuous Loop */}
          <div className="flex items-center">
            {row1Data.map((item, idx) => renderCard(item, idx, 'row1-set2'))}
          </div>
        </div>

        {/* ROW 2: Left to Right (→) */}
        <div className="sk-treatments-track-right">
          {/* First Copy */}
          <div className="flex items-center">
            {row2Data.map((item, idx) => renderCard(item, idx + 14, 'row2-set1'))}
          </div>
          {/* Duplicate Copy for Continuous Loop */}
          <div className="flex items-center">
            {row2Data.map((item, idx) => renderCard(item, idx + 14, 'row2-set2'))}
          </div>
        </div>

      </div>
    </section>
  );
}
