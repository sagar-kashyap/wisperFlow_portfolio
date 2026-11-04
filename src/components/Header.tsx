'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Header() {
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to([leftRef.current, rightRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }, []);

  return (
    <header className="site-header">
      <span ref={leftRef} className="header-badge fade-item" style={{ opacity: 0 }}>
        SAGAR&nbsp;KASHYAP
      </span>
      <span ref={rightRef} className="header-badge fade-item" style={{ opacity: 0 }}>
        SOFTWARE&nbsp;ENGINEER&nbsp;·&nbsp;3&nbsp;YRS
      </span>
    </header>
  );
}

