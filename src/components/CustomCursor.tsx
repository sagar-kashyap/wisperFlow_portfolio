'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on pointer-fine (desktop) devices
    const mql = window.matchMedia('(pointer: fine)');
    if (!mql.matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    dot.style.opacity = '1';
    ring.style.opacity = '1';

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0, overwrite: true });
    };

    const raf = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Expand ring on hoverable elements
    const onEnter = () => {
      gsap.to(ring, { width: 56, height: 56, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { width: 36, height: 36, duration: 0.3 });
    };

    const hoverEls = document.querySelectorAll('a, button, [data-cursor]');
    hoverEls.forEach((el) => {
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);
    });

    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}

