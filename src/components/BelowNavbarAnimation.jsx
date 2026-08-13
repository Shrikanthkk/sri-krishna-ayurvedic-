import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/*
 * ─────────────────────────────────────────────────────────────
 *  BelowNavbarAnimation  —  Premium Ayurvedic Branding Strip
 *
 *  Layout: 3-zone flexbox (LEFT 30% | CENTER flex-1 | RIGHT 30%)
 *
 *  LEFT ZONE:
 *    · background-image, bg-size: 100vw auto, bg-pos: 0% 65%
 *      → shows the LEFTMOST portion of the 4:1 image naturally
 *    · Animated floating petals on top
 *    · Right-edge fade-to-cream overlay
 *
 *  CENTER ZONE:
 *    · Soft cream gradient background
 *    · Animated "SRI KRISHNA / AYURVEDIC CLINIC" text reveal
 *    · Ornamental lotus divider
 *
 *  RIGHT ZONE:
 *    · Same image, bg-pos: 100% 65%
 *      → shows the RIGHTMOST portion (copper pot + valve + oil drip)
 *    · Animated SVG oil-pour stream overlay
 *    · Left-edge fade-to-cream overlay
 *
 *  This approach avoids stretching/distortion at all viewport widths.
 *  Isolated component — zero changes outside this file.
 * ─────────────────────────────────────────────────────────────
 */

// ── CSS Keyframes (injected once) ────────────────────────────
const CSS = `
  @keyframes sk_p1 {
    0%   { transform: translate(0px, 0px) rotate(0deg) scale(1); opacity:0; }
    6%   { opacity: 0.82; }
    50%  { transform: translate(60px,-12px) rotate(40deg) scale(0.93); opacity:0.72; }
    85%  { transform: translate(115px, 9px) rotate(76deg) scale(0.84); opacity:0.4; }
    100% { transform: translate(155px,22px) rotate(108deg) scale(0.7); opacity:0; }
  }
  @keyframes sk_p2 {
    0%   { transform: translate(0px, 7px) rotate(18deg) scale(0.88); opacity:0; }
    7%   { opacity: 0.74; }
    55%  { transform: translate(70px,-7px) rotate(54deg) scale(0.95); opacity:0.62; }
    100% { transform: translate(130px,17px) rotate(98deg) scale(0.73); opacity:0; }
  }
  @keyframes sk_p3 {
    0%   { transform: translate(0px,14px) rotate(-9deg) scale(1.06); opacity:0; }
    9%   { opacity: 0.68; }
    60%  { transform: translate(78px, 3px) rotate(31deg) scale(0.97); opacity:0.54; }
    100% { transform: translate(124px,-5px) rotate(74deg) scale(0.79); opacity:0; }
  }
  @keyframes sk_p4 {
    0%   { transform: translate(0px, 3px) rotate(24deg) scale(0.83); opacity:0; }
    6%   { opacity: 0.62; }
    100% { transform: translate(108px,24px) rotate(92deg) scale(0.70); opacity:0; }
  }
  @keyframes sk_p5 {
    0%   { transform: translate(4px,10px) rotate(-5deg) scale(1.09); opacity:0; }
    10%  { opacity: 0.58; }
    100% { transform: translate(94px,-9px) rotate(60deg) scale(0.76); opacity:0; }
  }
  @keyframes sk_p6 {
    0%   { transform: translate(0px,6px) rotate(30deg) scale(0.90); opacity:0; }
    7%   { opacity: 0.50; }
    100% { transform: translate(82px,21px) rotate(106deg) scale(0.68); opacity:0; }
  }
  @keyframes sk_glow {
    0%,100% { opacity:0.04; }
    50%     { opacity:0.09; }
  }
`;

function injectCSS() {
  if (document.getElementById('sk-anim-v4')) return;
  const s = document.createElement('style');
  s.id = 'sk-anim-v4';
  s.textContent = CSS;
  document.head.appendChild(s);
}

// ── SVG Petal ────────────────────────────────────────────────
function Petal({ top, left, w, anim, dur, delay, opacity = 1 }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', top, left, pointerEvents: 'none', zIndex: 6,
      width: w, height: w * 1.47,
      animation: `${anim} ${dur}s ${delay}s infinite linear`,
      opacity,
    }}>
      <svg viewBox="0 0 22 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <ellipse cx="11" cy="16" rx="10" ry="15" fill="rgba(244,114,182,0.8)" />
        <ellipse cx="11" cy="16" rx="5.5" ry="9"  fill="rgba(253,186,218,0.52)" />
        <line x1="11" y1="2" x2="11" y2="30" stroke="rgba(216,100,150,0.22)" strokeWidth="0.7"/>
      </svg>
    </div>
  );
}

// ── Lotus Ornamental Divider ──────────────────────────────────
function Lotus() {
  return (
    <svg viewBox="0 0 270 20" fill="none" style={{ width: '240px', height: '13px' }}>
      <line x1="0"   y1="10" x2="82"  y2="10" stroke="rgba(178,142,58,0.55)" strokeWidth="0.9"/>
      <polygon points="85,10 91,5 97,10 91,15"  fill="rgba(178,142,58,0.6)"/>
      <circle cx="135" cy="10" r="5.8"   fill="none" stroke="rgba(178,142,58,0.62)" strokeWidth="1"/>
      <circle cx="135" cy="10" r="2.4"   fill="rgba(178,142,58,0.58)"/>
      <ellipse cx="135" cy="3.2"  rx="2.1" ry="3.4" fill="rgba(178,142,58,0.38)"/>
      <ellipse cx="135" cy="16.8" rx="2.1" ry="3.4" fill="rgba(178,142,58,0.38)"/>
      <ellipse cx="127.8" cy="10" rx="3.4" ry="2.1" fill="rgba(178,142,58,0.38)"/>
      <ellipse cx="142.2" cy="10" rx="3.4" ry="2.1" fill="rgba(178,142,58,0.38)"/>
      <polygon points="173,10 179,5 185,10 179,15" fill="rgba(178,142,58,0.6)"/>
      <line x1="188" y1="10" x2="270" y2="10" stroke="rgba(178,142,58,0.55)" strokeWidth="0.9"/>
    </svg>
  );
}


// ── Main Export ───────────────────────────────────────────────
export default function BelowNavbarAnimation() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    injectCSS();
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return <div style={{ height: '130px', background: '#f7f0e6' }} className="w-full" />;
  }

  // Shared image background config:
  // background-size: 100vw auto  → image is exactly the viewport width, height proportional (4:1 image → h = vw/4)
  // background-position: X% 65% → 65% vertically shows slightly more of bottom (valve/oil area)
  const imgBgCommon = {
    backgroundImage: 'url(/ayurvedic-banner-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100vw auto',
  };

  return (
    <div
      style={{
        width: '100%',
        height: '130px',
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(178,142,58,0.15)',
        overflow: 'hidden',
      }}
      aria-label="Sri Krishna Ayurvedic Clinic branding banner"
    >

      {/* ══════════════════════════════════════════════
          LEFT ZONE — Ayurvedic ingredients + pink bokeh + petals
          Shows leftmost 30% of the 4:1 banner image.
         ══════════════════════════════════════════════ */}
      <div style={{
        width: '28%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        ...imgBgCommon,
        backgroundPosition: '0% 65%',
        opacity: 0.88,
      }}>
        {/* Right-edge strong fade to cream */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '72%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(248,242,232,0.7) 40%, rgba(248,242,232,0.97) 100%)',
          zIndex: 4,
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(180deg, rgba(248,242,232,0.6), transparent)',
          zIndex: 4,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(0deg, rgba(248,242,232,0.6), transparent)',
          zIndex: 4,
        }} />

        {/* Floating Petals — staggered, varied sizes & speeds */}
        <Petal top="10%" left="5%"  w={18} anim="sk_p1" dur={9.2}  delay={0.5} />
        <Petal top="45%" left="3%"  w={14} anim="sk_p2" dur={11.0} delay={2.2} />
        <Petal top="22%" left="14%"  w={20} anim="sk_p3" dur={8.4}  delay={1.4} />
        <Petal top="62%" left="8%"  w={12} anim="sk_p4" dur={11.5} delay={3.8} />
        <Petal top="35%" left="7%"  w={16} anim="sk_p5" dur={10.2} delay={1.0} />
        <Petal top="16%" left="22%" w={11} anim="sk_p1" dur={9.2}  delay={5.4} opacity={0.55}/>
        <Petal top="56%" left="20%" w={14} anim="sk_p3" dur={10.4} delay={7.0} opacity={0.48}/>
        <Petal top="30%" left="18%" w={10} anim="sk_p6" dur={12.2} delay={4.2} opacity={0.52}/>
      </div>

      {/* ══════════════════════════════════════════════
          CENTER ZONE — Clean cream, animated brand text
         ══════════════════════════════════════════════ */}
      <div style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(248,242,232,0.98) 0%, rgba(255,253,250,1) 50%, rgba(248,242,232,0.98) 100%)',
        zIndex: 2,
      }}>

        {/* Subtle ambient center glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 80%)',
          animation: 'sk_glow 5s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* "SRI KRISHNA" */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 1.05, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ lineHeight: 1, zIndex: 1 }}
        >
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 700,
            fontSize: 'clamp(22px, 3.2vw, 50px)',
            color: '#183824',
            letterSpacing: '0.1em',
            textShadow: '0 1px 8px rgba(0,0,0,0.06)',
            display: 'block',
            textTransform: 'uppercase',
          }}>
            Sri Krishna
          </span>
        </motion.div>

        {/* "— AYURVEDIC CLINIC —" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', zIndex: 1 }}
        >
          <span style={{ color: '#b5903a', fontSize: 'clamp(11px, 1.5vw, 19px)', lineHeight: 1 }}>—</span>
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1.4vw, 18px)',
            color: '#b5903a',
            letterSpacing: '0.22em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Ayurvedic Clinic
          </span>
          <span style={{ color: '#b5903a', fontSize: 'clamp(11px, 1.5vw, 19px)', lineHeight: 1 }}>—</span>
        </motion.div>

        {/* Lotus ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.15 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '6px', zIndex: 1 }}
        >
          <Lotus />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT ZONE — Copper Shirodhara pot + golden bokeh + oil
          Shows rightmost 30% of the 4:1 banner image.
         ══════════════════════════════════════════════ */}
      <div style={{
        width: '28%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        ...imgBgCommon,
        backgroundPosition: '100% 65%',
        opacity: 0.88,
      }}>
        {/* Left-edge strong fade from cream */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '72%',
          background: 'linear-gradient(90deg, rgba(248,242,232,0.97) 0%, rgba(248,242,232,0.7) 60%, transparent 100%)',
          zIndex: 4,
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(180deg, rgba(248,242,232,0.6), transparent)',
          zIndex: 4,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(0deg, rgba(248,242,232,0.6), transparent)',
          zIndex: 4,
        }} />

        {/* Subtle warm golden ambient glow for pot area */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
          background: 'radial-gradient(ellipse 70% 90% at 65% 50%, rgba(245,158,11,0.07) 0%, transparent 80%)',
          animation: 'sk_glow 4.5s ease-in-out infinite',
        }} />
      </div>

    </div>
  );
}
