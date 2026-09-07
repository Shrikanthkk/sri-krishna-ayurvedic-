import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Sparkles, Phone, Award, Heart, Star, Calendar, Info } from 'lucide-react';
import { getRunningBarSettings, fetchClinicSettingsFromDb, defaultRunningBar } from '../utils/adminStorage';

/*
 * ─────────────────────────────────────────────────────────────
 *  BelowNavbarAnimation — Dynamic Continuous Clinic Announcement Marquee
 *
 *  Displays seamless, continuously moving horizontal ticker
 *  manageable directly from the Admin Dashboard.
 * ─────────────────────────────────────────────────────────────
 */

export function renderRunningBarIcon(iconName, className = "w-3.5 h-3.5 shrink-0") {
  switch (iconName) {
    case 'Clock':
      return <Clock className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Star':
      return <Star className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Info':
      return <Info className={className} />;
    case 'None':
    case null:
    case undefined:
    case '':
      return null;
    default:
      return <Sparkles className={className} />;
  }
}

export function getSpeedSeconds(speed) {
  switch (speed) {
    case 'slow':
      return { desktop: 65, mobile: 50 };
    case 'fast':
      return { desktop: 25, mobile: 20 };
    case 'normal':
    default:
      return { desktop: 45, mobile: 35 };
  }
}

const MARQUEE_BASE_KEYFRAMES = `
  @keyframes sk_timing_marquee {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }
`;

function injectMarqueeKeyframes() {
  if (document.getElementById('sk-timing-marquee-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'sk-timing-marquee-keyframes';
  style.textContent = MARQUEE_BASE_KEYFRAMES;
  document.head.appendChild(style);
}

export default function BelowNavbarAnimation({ previewData = null }) {
  const [runningBar, setRunningBar] = useState(() => previewData || getRunningBarSettings() || defaultRunningBar);

  useEffect(() => {
    injectMarqueeKeyframes();
  }, []);

  // Update if previewData changes (in admin live preview)
  useEffect(() => {
    if (previewData) {
      setRunningBar(previewData);
    }
  }, [previewData]);

  // In live site mode: fetch from DB and listen to custom updates
  useEffect(() => {
    if (previewData) return;

    // Load initial from DB
    fetchClinicSettingsFromDb()
      .then((settings) => {
        if (settings && settings.runningBar) {
          setRunningBar(settings.runningBar);
        }
      })
      .catch(() => {});

    // Listen for custom event from admin dashboard updates
    const handleUpdate = (e) => {
      if (e.detail) {
        setRunningBar(e.detail);
      }
    };

    window.addEventListener('sk_running_bar_updated', handleUpdate);
    return () => {
      window.removeEventListener('sk_running_bar_updated', handleUpdate);
    };
  }, [previewData]);

  const activeItems = (runningBar?.items || []).filter((item) => item.enabled !== false);

  // If no items are enabled, do not render ticker
  if (activeItems.length === 0) {
    return null;
  }

  const speedSec = getSpeedSeconds(runningBar?.speed);
  const separatorChar = runningBar?.separator || '✦';
  const isPaused = Boolean(runningBar?.isPaused);

  // Single repeatable timing announcement block
  const renderItemContent = (item) => {
    if (item.type === 'badge') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-900/90 text-brass-400 border border-brass-500/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shrink-0 shadow-xs whitespace-nowrap">
          {renderRunningBarIcon(item.icon || 'Clock', "w-3.5 h-3.5 text-brass-400 shrink-0")}
          <span className="whitespace-nowrap">{item.text || item.label}</span>
        </span>
      );
    }

    if (item.type === 'timing') {
      return (
        <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0 whitespace-nowrap">
          {renderRunningBarIcon(item.icon || 'MapPin', "w-3.5 h-3.5 text-emerald-400 shrink-0")}
          {item.label && (
            <strong className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap">
              {item.label.trim().endsWith(':') ? item.label : `${item.label}:`}
            </strong>
          )}
          <span className="text-brass-300 font-semibold tracking-normal whitespace-nowrap">
            {item.text}
          </span>
        </span>
      );
    }

    // Default: announcement / general text
    return (
      <span className="inline-flex items-center gap-1.5 text-cream-100 shrink-0 whitespace-nowrap">
        {renderRunningBarIcon(item.icon || 'Sparkles', "w-3.5 h-3.5 text-brass-400 shrink-0")}
        {item.label && (
          <strong className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap">
            {item.label}
          </strong>
        )}
        <span className="text-cream-50 font-medium tracking-normal text-xs sm:text-[13px] whitespace-nowrap">
          {item.text}
        </span>
      </span>
    );
  };

  const timingBlock = (keyPrefix) => (
    <div 
      key={keyPrefix} 
      className="inline-flex items-center gap-6 sm:gap-8 shrink-0 text-xs sm:text-sm font-medium tracking-wide pr-6 sm:pr-8 whitespace-nowrap"
    >
      {activeItems.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${item.id || idx}`}>
          {renderItemContent(item)}
          <span className="text-brass-400/70 select-none shrink-0 font-serif">
            {separatorChar}
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  const dynamicTrackStyle = {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    whiteSpace: 'nowrap',
    willChange: 'transform',
    animation: `sk_timing_marquee ${speedSec.desktop}s linear infinite`,
    animationPlayState: isPaused ? 'paused' : 'running'
  };

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
        <div style={dynamicTrackStyle} className="flex items-center whitespace-nowrap">
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
