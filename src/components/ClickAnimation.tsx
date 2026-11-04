'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

    const onPointerDown = (e: PointerEvent) => {
      // Only left clicks or touch taps
      if (e.button !== 0) return;

      // Ignore if user clicked on any button, link, or interactive feature
      if (isInteractiveElement(e.target)) return;

      const x = e.clientX;
      const y = e.clientY;

      // Create an isolated wrapper for this click instance
      const wrap = document.createElement('div');
      wrap.className = 'absolute pointer-events-none select-none';
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      wrap.style.transform = 'translate(-50%, -50%)';
      wrap.style.width = '140px';
      wrap.style.height = '140px';

      // Launch trajectory: rocket naturally points ~45deg up-right
      // Slight natural variation between -35deg and -65deg
      const angleDeg = -48 + (Math.random() * 20 - 10);
      const angleRad = (angleDeg * Math.PI) / 180;
      const launchDist = 95 + Math.random() * 25;
      const tx = Math.cos(angleRad) * launchDist;
      const ty = Math.sin(angleRad) * launchDist;

      // Exhaust colors for launch smoke and sparks
      const exhaustColors = ['#c0392b', '#e67e22', '#f39c12', '#6b6760', '#e8e1d4'];

      let exhaustDots = '';
      for (let i = 0; i < 6; i++) {
        // opposite of launch direction with spread
        const backAngle = angleRad + Math.PI + (Math.random() * 0.8 - 0.4);
        const dist = 14 + Math.random() * 20;
        const ex = Math.cos(backAngle) * dist;
        const ey = Math.sin(backAngle) * dist;
        const size = 3 + Math.random() * 3;
        const color = exhaustColors[i % exhaustColors.length];
        exhaustDots += `<span class="exhaust-dot" style="position: absolute; left: 70px; top: 70px; width: ${size}px; height: ${size}px; border-radius: 9999px; background-color: ${color}; transform: translate(-50%, -50%);" data-tx="${ex}" data-ty="${ey}"></span>`;
      }

      wrap.innerHTML = `
        <!-- Launch shockwave ring -->
        <span class="launch-ring" style="position: absolute; left: 70px; top: 70px; width: 16px; height: 16px; border: 1.5px solid #c0392b; border-radius: 9999px; transform: translate(-50%, -50%); opacity: 0.7;"></span>

        <!-- Exhaust smoke/spark particles -->
        ${exhaustDots}

        <!-- Launching Rocket Emoji -->
        <div class="rocket-emoji" style="position: absolute; left: 70px; top: 70px; font-size: 28px; line-height: 1; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.18));">
          🚀
        </div>
      `;

      container.appendChild(wrap);

      const rocket = wrap.querySelector<HTMLElement>('.rocket-emoji');
      const ring = wrap.querySelector<HTMLElement>('.launch-ring');
      const exhaust = wrap.querySelectorAll<HTMLElement>('.exhaust-dot');

      if (!rocket || !ring) {
        wrap.remove();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          wrap.remove();
        },
      });

      // 1. Shockwave ring expands and dissolves
      tl.fromTo(
        ring,
        { scale: 0.4, opacity: 0.8 },
        { scale: 3.2, opacity: 0, duration: 0.45, ease: 'power2.out' },
        0
      );

      // 2. Exhaust particles burst out from behind the rocket thruster
      exhaust.forEach((dot, idx) => {
        const dtx = parseFloat(dot.getAttribute('data-tx') || '0');
        const dty = parseFloat(dot.getAttribute('data-ty') || '0');
        tl.fromTo(
          dot,
          { scale: 0.4, opacity: 0.9 },
          {
            x: dtx,
            y: dty,
            scale: 1.2,
            opacity: 0,
            duration: 0.4 + idx * 0.03,
            ease: 'power2.out',
          },
          0.02
        );
      });

      // 3. Rocket pops in with punch, then blasts off along the trajectory
      tl.fromTo(
        rocket,
        { scale: 0, opacity: 0, x: 0, y: 0, rotate: angleDeg + 45 },
        {
          scale: 1.2,
          opacity: 1,
          duration: 0.16,
          ease: 'back.out(2.2)',
        },
        0
      );

      // Blast off acceleration
      tl.to(
        rocket,
        {
          x: tx,
          y: ty,
          scale: 0.85,
          duration: 0.52,
          ease: 'power2.in',
        },
        0.16
      );

      // Fade out at end of flight
      tl.to(
        rocket,
        {
          opacity: 0,
          duration: 0.18,
          ease: 'power1.out',
        },
        0.5
      );
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
