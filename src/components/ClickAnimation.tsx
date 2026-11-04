'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Helper to generate a logarithmic / Archimedean spiral SVG path
function generateSpiralPath(turns = 2.4, maxRadius = 30, points = 36, clockwise = true): string {
  let d = '';
  const maxTheta = turns * 2 * Math.PI;
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    // Ease radius slightly so the center starts tight and unfurls
    const r = Math.pow(t, 1.1) * maxRadius;
    const theta = (clockwise ? 1 : -1) * t * maxTheta;
    const x = (r * Math.cos(theta)).toFixed(2);
    const y = (r * Math.sin(theta)).toFixed(2);
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return d;
}

// Check whether target or any ancestor is an interactive feature / button
function isInteractiveElement(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;

  const interactiveSelector = [
    'button',
    'a',
    'input',
    'textarea',
    'select',
    'details',
    'summary',
    'label',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="switch"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[data-cursor]',
    '[data-interactive]',
  ].join(',');

  if (target.closest(interactiveSelector)) {
    return true;
  }

  // Check computed cursor style (e.g. elements made clickable via CSS)
  try {
    const style = window.getComputedStyle(target);
    if (style.cursor === 'pointer') {
      return true;
    }
  } catch {
    // fallback safe
  }

  return false;
}

export default function ClickAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let clickCount = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only left clicks or touch taps
      if (e.button !== 0) return;

      // Ignore if user clicked on any button, link, or interactive feature
      if (isInteractiveElement(e.target)) return;

      clickCount++;
      const x = e.clientX;
      const y = e.clientY;

      // Palette alternating between signature terracotta red and ink charcoal
      const isAccent = clickCount % 3 === 0;
      const mainColor = isAccent ? '#c0392b' : '#1e1c1a';
      const secondaryColor = isAccent ? '#e74c3c' : '#6b6760';
      const clockwise = clickCount % 2 === 0;

      // Create an isolated wrapper for this click instance
      const wrap = document.createElement('div');
      wrap.className = 'absolute pointer-events-none select-none';
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      wrap.style.transform = 'translate(-50%, -50%)';
      wrap.style.width = '120px';
      wrap.style.height = '120px';

      // SVG with spiral, ripple circle, central dot, and popping satellite particles
      const spiralPath = generateSpiralPath(2.4, 32, 40, clockwise);
      const satelliteCount = 6;
      let satellitesSvg = '';

      for (let i = 0; i < satelliteCount; i++) {
        const angle = (i / satelliteCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        const dist = 26 + Math.random() * 16;
        const sx = Math.cos(angle) * dist;
        const sy = Math.sin(angle) * dist;
        const r = 1.8 + Math.random() * 1.5;
        satellitesSvg += `<circle class="satellite-dot" cx="60" cy="60" data-tx="${sx}" data-ty="${sy}" r="${r}" fill="${i % 2 === 0 ? mainColor : secondaryColor}" />`;
      }

      wrap.innerHTML = `
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <!-- Expanding ripple ring -->
          <circle class="ripple-ring" cx="60" cy="60" r="8" fill="none" stroke="${mainColor}" stroke-width="1.2" opacity="0.6" />
          
          <!-- Spiral group centered at (60, 60) -->
          <g class="spiral-group" transform="translate(60, 60)">
            <path class="spiral-path" d="${spiralPath}" fill="none" stroke="${mainColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </g>

          <!-- Core pop dot -->
          <circle class="center-dot" cx="60" cy="60" r="4" fill="${mainColor}" />

          <!-- Radiating satellite dots -->
          ${satellitesSvg}
        </svg>
      `;

      container.appendChild(wrap);

      const spiralPathEl = wrap.querySelector<SVGPathElement>('.spiral-path');
      const spiralGroup = wrap.querySelector<SVGGElement>('.spiral-group');
      const centerDot = wrap.querySelector<SVGCircleElement>('.center-dot');
      const rippleRing = wrap.querySelector<SVGCircleElement>('.ripple-ring');
      const satellites = wrap.querySelectorAll<SVGCircleElement>('.satellite-dot');

      if (!spiralPathEl || !spiralGroup || !centerDot || !rippleRing) {
        wrap.remove();
        return;
      }

      const length = spiralPathEl.getTotalLength();
      spiralPathEl.style.strokeDasharray = `${length}`;
      spiralPathEl.style.strokeDashoffset = `${length}`;

      const tl = gsap.timeline({
        onComplete: () => {
          wrap.remove();
        },
      });

      // 1. Center dot pops out with spring bounce, then dissolves
      tl.fromTo(
        centerDot,
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        { scale: 1.3, opacity: 1, duration: 0.22, ease: 'back.out(2.5)' },
        0
      );
      tl.to(
        centerDot,
        { scale: 0, opacity: 0, duration: 0.35, ease: 'power2.in' },
        0.35
      );

      // 2. Unfurl the spiral stroke outward while smoothly rotating
      tl.to(
        spiralPathEl,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        0.05
      );
      tl.fromTo(
        spiralGroup,
        { rotation: clockwise ? -45 : 45, transformOrigin: 'center' },
        {
          rotation: clockwise ? 180 : -180,
          duration: 0.8,
          ease: 'power1.out',
        },
        0.05
      );
      tl.to(
        spiralPathEl,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0.55
      );

      // 3. Delicate ripple ring expands outward and dissolves into the paper
      tl.fromTo(
        rippleRing,
        { attr: { r: 6 }, opacity: 0.7, strokeWidth: 1.5 },
        {
          attr: { r: 38 },
          opacity: 0,
          strokeWidth: 0.5,
          duration: 0.65,
          ease: 'power2.out',
        },
        0
      );

      // 4. Satellite dots burst outward in varied directions and dissipate
      satellites.forEach((dot, idx) => {
        const tx = parseFloat(dot.getAttribute('data-tx') || '0');
        const ty = parseFloat(dot.getAttribute('data-ty') || '0');
        tl.fromTo(
          dot,
          { x: 0, y: 0, opacity: 1, scale: 0.4 },
          {
            x: tx,
            y: ty,
            opacity: 0,
            scale: 1,
            duration: 0.5 + idx * 0.04,
            ease: 'power3.out',
          },
          0.04
        );
      });
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="click-animation-overlay pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
    />
  );
}
