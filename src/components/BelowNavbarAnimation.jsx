import React, { useEffect } from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';

/*
 * ─────────────────────────────────────────────────────────────
 *  BelowNavbarAnimation — Continuous Clinic Announcement Marquee
 *
 *  Displays seamless, continuously moving horizontal ticker
 *  advertising clinic timings and specialized Ayurvedic cancer care.
 * ─────────────────────────────────────────────────────────────
 */

const MARQUEE_CSS = `
  @keyframes sk_timing_marquee {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .sk-timing-track {
    display: flex;
    align-items: center;
    width: max-content;
    white-space: nowrap;
    will-change: transform;
    animation: sk_timing_marquee 45s linear infinite;
  }

  @media (max-width: 768px) {
    .sk-timing-track {
      animation-duration: 35s;
    }
  }
`;

function injectMarqueeCSS() {
  if (document.getElementById('sk-timing-marquee-style')) return;
  const style = document.createElement('style');
  style.id = 'sk-timing-marquee-style';
  style.textContent = MARQUEE_CSS;
  document.head.appendChild(style);
}

export default function BelowNavbarAnimation() {
  useEffect(() => {
    injectMarqueeCSS();
  }, []);

  // Single repeatable timing announcement item
  const timingBlock = (keyPrefix) => (
    <div 
      key={keyPrefix} 
      className="inline-flex items-center gap-6 sm:gap-8 shrink-0 text-xs sm:text-sm font-medium tracking-wide pr-6 sm:pr-8 whitespace-nowrap"
    >
      {/* Clinic Timings Tag */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-900/90 text-brass-400 border border-brass-500/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shrink-0 shadow-xs whitespace-nowrap">
        <Clock className="w-3.5 h-3.5 text-brass-400 shrink-0" />
        <span className="whitespace-nowrap">CLINIC TIMINGS</span>
      </span>

      <span className="text-brass-400/70 select-none shrink-0 font-serif">✦</span>

      {/* Specialized Cancer Care Announcement */}
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0 whitespace-nowrap">
        <Sparkles className="w-3.5 h-3.5 text-brass-400 shrink-0" />
        <span className="text-cream-50 font-medium tracking-normal text-xs sm:text-[13px] whitespace-nowrap">
          We provide Ayurvedic care for all types of cancer
        </span>
      </span>

      <span className="text-brass-400/70 select-none shrink-0 font-serif">✦</span>

      {/* Anandapura Timings */}
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0 whitespace-nowrap">
        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <strong className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap">ANANDAPURA:</strong>
        <span className="text-brass-300 font-semibold tracking-normal whitespace-nowrap">6:30 PM to 9:30 PM</span>
      </span>

      <span className="text-brass-400/70 select-none shrink-0 font-serif">✦</span>

      {/* Krishnarajapuram Timings */}
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0 whitespace-nowrap">
        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <strong className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap">KRISHNARAJAPURAM:</strong>
        <span className="text-brass-300 font-semibold tracking-normal whitespace-nowrap">9:00 AM to 10:30 AM</span>
      </span>

      <span className="text-brass-400/70 select-none shrink-0 font-serif">✦</span>
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Clinic Hours & Care Announcement"
      className="w-full bg-forest-950 text-cream-50 border-b border-brass-500/20 overflow-hidden relative z-20 h-10 sm:h-11 flex items-center shadow-sm select-none whitespace-nowrap"
    >
      {/* Background ambient gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/60 to-forest-950 pointer-events-none" />

      {/* Edge Vignette Fades for Smooth Seamless Ticker Flow */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-forest-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-forest-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Outer Container */}
      <div className="w-full overflow-hidden flex items-center whitespace-nowrap">
        {/* Infinite Moving Track (Duplicated 2 Sets of 3 blocks for 100% seamless transition) */}
        <div className="sk-timing-track flex items-center whitespace-nowrap">
          {/* First Set */}
          <div className="inline-flex items-center whitespace-nowrap">
            {timingBlock('set1-a')}
            {timingBlock('set1-b')}
            {timingBlock('set1-c')}
          </div>

          {/* Second Duplicate Set for Continuous Seamless Loop */}
          <div className="inline-flex items-center whitespace-nowrap">
            {timingBlock('set2-a')}
            {timingBlock('set2-b')}
            {timingBlock('set2-c')}
          </div>
        </div>
      </div>
    </div>
  );
}
