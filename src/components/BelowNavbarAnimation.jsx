import React, { useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

/*
 * ─────────────────────────────────────────────────────────────
 *  BelowNavbarAnimation — Continuous Clinic Timings Marquee
 *
 *  Displays seamless, continuously moving horizontal ticker
 *  advertising exact clinic timings for Anandapura & KR Puram.
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
    width: max-content;
    will-change: transform;
    animation: sk_timing_marquee 32s linear infinite;
  }

  @media (max-width: 768px) {
    .sk-timing-track {
      animation-duration: 26s;
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

  // Single repeatable timing announcement block
  const timingBlock = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center gap-5 sm:gap-7 shrink-0 text-xs sm:text-[13px] font-medium tracking-wide pr-5 sm:pr-7">
      {/* Clinic Timings Tag */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-900/90 text-brass-400 border border-brass-500/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shrink-0 shadow-xs">
        <Clock className="w-3 h-3 text-brass-400 shrink-0" />
        <span>CLINIC TIMINGS</span>
      </span>

      <span className="text-brass-400/70 select-none">✦</span>

      {/* Anandapura Timings */}
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0">
        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs">ANANDAPURA:</span>
        <span className="text-brass-300 font-semibold tracking-normal">6:00 PM to 9:30 PM</span>
      </span>

      <span className="text-brass-400/70 select-none">✦</span>

      {/* Krishnarajapuram Timings */}
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0">
        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs">KRISHNARAJAPURAM:</span>
        <span className="text-brass-300 font-semibold tracking-normal">9:00 AM to 12:30 PM</span>
        <span className="text-cream-300/40 px-0.5">|</span>
        <span className="text-brass-300 font-semibold tracking-normal">5:00 PM to 7:00 PM</span>
      </span>

      <span className="text-brass-400/70 select-none">✦</span>
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Clinic Hours Announcement"
      className="w-full bg-forest-950 text-cream-50 border-b border-brass-500/20 overflow-hidden relative z-20 py-2 sm:py-2.5 shadow-sm select-none"
    >
      {/* Background ambient gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/60 to-forest-950 pointer-events-none" />

      {/* Edge Vignette Fades for Smooth Seamless Ticker Flow */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-forest-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-forest-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Outer Container */}
      <div className="w-full overflow-hidden flex items-center">
        {/* Infinite Moving Track (Duplicated 2 Sets of 3 blocks for 100% seamless transition) */}
        <div className="sk-timing-track flex items-center">
          {/* First Set */}
          <div className="flex items-center">
            {timingBlock('set1-a')}
            {timingBlock('set1-b')}
            {timingBlock('set1-c')}
          </div>

          {/* Second Duplicate Set for Continuous Seamless Loop */}
          <div className="flex items-center">
            {timingBlock('set2-a')}
            {timingBlock('set2-b')}
            {timingBlock('set2-c')}
          </div>
        </div>
      </div>
    </div>
  );
}
