import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
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
  AlertCircle,
  HelpCircle,
  PlusCircle,
  Stethoscope,
  Calendar
} from 'lucide-react';

export default function WeAlsoTreatSlider({ onOpenBooking }) {
  const treatmentsData = [
    {
      id: "allergies",
      title: "Allergies",
      description: "Personalized Ayurvedic care focused on supporting respiratory and immune balance.",
      icon: Wind,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "anemia",
      title: "Anemia",
      description: "Traditional nutritional and Rasayana approaches to support healthy blood and natural vitality.",
      icon: Droplet,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "anxiety",
      title: "Anxiety",
      description: "Mind-calming therapies, herbal nervines, and lifestyle harmonization for emotional balance.",
      icon: Smile,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "arthritis",
      title: "Arthritis",
      description: "Classical Vata-pacifying therapies, medicated herbal oils, and joint mobility support.",
      icon: Activity,
      link: "/treatments/joint-pain-arthritis",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "asthma",
      title: "Asthma",
      description: "Herbal broncho-supportive regimens and Pranayama techniques for respiratory ease.",
      icon: Wind,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "backache",
      title: "Backache",
      description: "Targeted spinal care, Kati Vasti therapies, and herbal oils for muscular and spine comfort.",
      icon: ShieldCheck,
      link: "/treatments/joint-pain-arthritis",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "blood-pressure",
      title: "Blood Pressure",
      description: "Holistic lifestyle and herbal protocols for balanced cardiovascular well-being.",
      icon: Heart,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "bronchitis",
      title: "Bronchitis",
      description: "Classical herbal formulations to soothe bronchial passages and support respiratory comfort.",
      icon: Wind,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "cholesterol",
      title: "Cholesterol",
      description: "Metabolic Agni stimulation and dietary guidance to support healthy lipid equilibrium.",
      icon: Flame,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "dandruff",
      title: "Dandruff",
      description: "Medicated herbal scalp oils and natural cleansers to balance scalp flora and minimize flaking.",
      icon: Sparkles,
      link: "/treatments/hair-fall",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "dermatitis",
      title: "Dermatitis",
      description: "Blood-purifying herbs and soothing topical botanical preparations for sensitive skin.",
      icon: Sparkles,
      link: "/treatments/skin-problems",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "diabetes",
      title: "Diabetes",
      description: "Classical Madhumeha principles, digestive Agni rejuvenation, and glycemic dietary plans.",
      icon: Activity,
      link: "/treatments/diabetes",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "hair-problems",
      title: "Hair Problems",
      description: "Holistic scalp nourishment, Shiro Abhyanga, and root-strengthening botanical formulations.",
      icon: Feather,
      link: "/treatments/hair-fall",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "headache",
      title: "Headache",
      description: "Stress-relieving therapies, Shirodhara guidance, and customized trigger management.",
      icon: Sun,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "hyperacidity",
      title: "Hyperacidity",
      description: "Cooling Pitta-pacifying botanicals and digestive diet adjustments for gastric comfort.",
      icon: Flame,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "hypertension",
      title: "Hypertension",
      description: "Ayurvedic lifestyle and wellness support for healthy blood-pressure management.",
      icon: Heart,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "menopausal-syndrome",
      title: "Menopausal Syndrome",
      description: "Natural hormonal transition support, Rasayana herbs, and rejuvenating lifestyle care.",
      icon: Sun,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "overweight",
      title: "Overweight",
      description: "Metabolic Agni enhancement, dietary realignment, and gentle detoxifying therapies.",
      icon: Activity,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "piles",
      title: "Piles",
      description: "Gentle digestive correction, bowel regulation, and soothing local herbal remedies.",
      icon: ShieldCheck,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "prostate-problems",
      title: "Prostate Problems",
      description: "Targeted herbal regimens supporting healthy urinary flow and prostate vitality.",
      icon: Activity,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "psoriasis",
      title: "Psoriasis",
      description: "Holistic Pitta-Kapha skin balancing, dietary guidance, and botanical external care.",
      icon: Sparkles,
      link: "/treatments/skin-problems",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "sinusitis",
      title: "Sinusitis",
      description: "Nasya therapies and herbal steam formulations to relieve chronic sinus congestion.",
      icon: Wind,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "sleep-disorders",
      title: "Sleep Disorders",
      description: "Nidra-promoting therapies, herbal adaptogens, and evening wind-down routines.",
      icon: Moon,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "stress",
      title: "Stress",
      description: "Comprehensive stress reduction via Ayurvedic consultations, Pranayama, and herbs.",
      icon: Heart,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "urinary-tract-infection",
      title: "Urinary Tract Infection",
      description: "Soothing diuretic herbs, hydration protocols, and Pitta-clearing urinary care.",
      icon: Droplets,
      link: "/treatments",
      btnText: "Learn More",
      isCustomLink: false
    },
    {
      id: "alopecia",
      title: "Alopecia",
      description: "Targeted Ayurvedic hair and scalp therapy addressing patchy hair loss naturally.",
      icon: Feather,
      link: "/treatments/hair-fall",
      btnText: "Learn More",
      isCustomLink: true
    },
    {
      id: "and-many-more",
      title: "And Many More",
      description: "Explore personalized Ayurvedic care for additional health and wellness concerns.",
      icon: PlusCircle,
      link: "/contact",
      btnText: "Consult Us",
      isCustomLink: true,
      isFeatured: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive Items Per View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 cards
      } else {
        setItemsPerView(4); // Desktop: 4 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, treatmentsData.length - itemsPerView);

  // Auto Slider Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-cream-50/80 border-t border-earth-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block flex items-center gap-1.5">
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

          {/* Desktop Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              aria-label="Previous treatment"
              className="w-10 h-10 rounded-full border border-earth-200 bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-900 transition-all flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next treatment"
              className="w-10 h-10 rounded-full border border-earth-200 bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-900 transition-all flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Viewport */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {treatmentsData.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="px-2.5 shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div
                    className={`h-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group select-none ${
                      item.isFeatured
                        ? 'bg-gradient-to-br from-forest-950 to-forest-900 text-cream-50 border-brass-500/40 shadow-elevated'
                        : 'bg-white text-forest-950 border-earth-200 shadow-sm hover:shadow-elevated hover:-translate-y-1'
                    }`}
                  >
                    {/* Top Icon and Index Badge */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            item.isFeatured
                              ? 'bg-forest-800 text-brass-400 border border-brass-500/30'
                              : 'bg-cream-100 text-forest-800 group-hover:bg-forest-900 group-hover:text-brass-400'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          item.isFeatured ? 'text-brass-400' : 'text-earth-400'
                        }`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h3 className={`font-serif text-lg sm:text-xl font-medium leading-snug ${
                          item.isFeatured ? 'text-cream-50' : 'text-forest-950 group-hover:text-forest-800'
                        }`}>
                          {item.title}
                        </h3>
                        <p className={`text-xs font-light leading-relaxed line-clamp-3 ${
                          item.isFeatured ? 'text-cream-200/80' : 'text-earth-800'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-4 mt-3 border-t border-earth-200/60">
                      {item.id === 'and-many-more' ? (
                        <button
                          onClick={() => onOpenBooking ? onOpenBooking('General Ayurvedic Consultation') : null}
                          className="w-full py-2 px-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-soft"
                        >
                          <span>{item.btnText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link
                          to={item.link}
                          className={`w-full py-2 px-3.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-between group-hover:translate-x-0.5 ${
                            item.isFeatured
                              ? 'bg-brass-500 text-forest-950 hover:bg-brass-400'
                              : 'bg-cream-100 text-forest-900 hover:bg-forest-900 hover:text-cream-50'
                          }`}
                        >
                          <span>{item.btnText}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: Math.ceil(treatmentsData.length / itemsPerView) }).map((_, dotIdx) => {
            const isActive = Math.floor(currentIndex / itemsPerView) === dotIdx;
            return (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(Math.min(dotIdx * itemsPerView, maxIndex))}
                aria-label={`Go to slide page ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-6 bg-forest-900' : 'w-2 bg-earth-300 hover:bg-earth-400'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
