'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  'ENTERPRISE-LEVEL WEB APPLICATIONS',
  'VIBE CODING EXPERIMENTS',
  'PERSONAL CRAFT PROJECTS',
  'AIRBNB HOST',
  '3 YEARS OF SHIPPING',
  'Things I do',
];

interface LogoItem {
  id: string;
  name: string;
  // Offset relative to resting position when collapsed behind the face
  collapseX: number;
  collapseY: number;
  style: React.CSSProperties;
  icon: React.ReactNode;
}

const LOGOS: LogoItem[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    collapseX: 0,
    collapseY: 70,
    style: { top: '-8%', left: '46%' },
    icon: (
      <svg
        className="orbit-icon"
        width="46"
        height="50"
        viewBox="0 0 32 36"
        fill="none"
        stroke="#FF5A5F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 2.5C12 2.5 7.5 7 7.5 13.5C7.5 19.5 11.5 25.5 16 29.5C20.5 25.5 24.5 19.5 24.5 13.5C24.5 7 20 2.5 16 2.5Z" />
        <path d="M16 12C14.3 12 13 13.3 13 15C13 16.7 14.3 18 16 18C17.7 18 19 16.7 19 15C19 13.3 17.7 12 16 12Z" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    collapseX: 80,
    collapseY: 0,
    style: { top: '38%', left: '-14%' },
    icon: (
      <svg
        className="orbit-icon"
        width="44"
        height="44"
        viewBox="0 0 36 36"
        fill="none"
        stroke="#CC785C"
        strokeWidth="3.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line x1="18" y1="18" x2="18" y2="4" />
        <line x1="18" y1="18" x2="18" y2="32" />
        <line x1="18" y1="18" x2="4" y2="18" />
        <line x1="18" y1="18" x2="32" y2="18" />
        <line x1="18" y1="18" x2="8.1" y2="8.1" />
        <line x1="18" y1="18" x2="27.9" y2="27.9" />
        <line x1="18" y1="18" x2="8.1" y2="27.9" />
        <line x1="18" y1="18" x2="27.9" y2="8.1" />
        <line x1="18" y1="18" x2="11.2" y2="5.5" />
        <line x1="18" y1="18" x2="24.8" y2="30.5" />
        <line x1="18" y1="18" x2="5.5" y2="11.2" />
        <line x1="18" y1="18" x2="30.5" y2="24.8" />
        <line x1="18" y1="18" x2="5.5" y2="24.8" />
        <line x1="18" y1="18" x2="30.5" y2="11.2" />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    collapseX: -80,
    collapseY: 0,
    style: { top: '38%', right: '-14%' },
    icon: (
      <svg
        className="orbit-icon"
        width="44"
        height="44"
        viewBox="0 0 38 38"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="19" cy="19" r="19" fill="#000000" />
        <path
          d="M26 27.5L15.5 13.8V27.5H12.5V10.5H15.5L26 24.2V10.5H29V27.5H26Z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    collapseX: 55,
    collapseY: -55,
    style: { top: '74%', left: '4%' },
    icon: (
      <svg
        className="orbit-icon"
        width="38"
        height="38"
        viewBox="0 0 32 32"
        fill="#1E1C1A"
        aria-hidden="true"
      >
        <path d="M16 3.5C12.5 3.5 9.5 8 7.5 16.5C6.8 19.5 5.8 22 4.2 24.2C3.4 25.4 4.4 27 5.8 26.6C8.8 25.8 11.5 23.4 13 20.2C14.2 17.6 15.2 14.2 16 11C16.8 14.2 17.8 17.6 19 20.2C20.5 23.4 23.2 25.8 26.2 26.6C27.6 27 28.6 25.4 27.8 24.2C26.2 22 25.2 19.5 24.5 16.5C22.5 8 19.5 3.5 16 3.5Z" />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    collapseX: -55,
    collapseY: -55,
    style: { top: '72%', right: '4%' },
    icon: (
      <svg
        className="orbit-icon"
        width="46"
        height="46"
        viewBox="0 0 40 40"
        fill="none"
        style={{ transform: 'rotate(-7deg)' }}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="3" fill="#F7DF1E" />
        <text
          x="20"
          y="28"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="900"
          fontSize="21"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="-0.5px"
        >
          JS
        </text>
      </svg>
    ),
  },
];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const bioRef      = useRef<HTMLParagraphElement>(null);
  const footRef     = useRef<HTMLDivElement>(null);
  const illoRef     = useRef<HTMLDivElement>(null);
  const illoWrapRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const logoRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for hero text
      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(eyebrowRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      })
      .to(titleRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      }, '-=0.4')
      .to(underlineRef.current, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.2')
      .to(bioRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.3')
      .to(footRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.3')
      // Illustration entrance
      .fromTo(illoRef.current,
        { opacity: 0, x: 30, rotate: -3 },
        { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'back.out(1.8)' },
        '-=0.6'
      );

      // Hide all logos initially behind the picture
      logoRefs.current.forEach((el, i) => {
        if (!el) return;
        const logo = LOGOS[i];
        gsap.set(el, {
          scale: 0,
          opacity: 0,
          x: logo.collapseX,
          y: logo.collapseY,
        });
      });

      // Subtle parallax on illustration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.set(illoRef.current, { y: self.progress * 50 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle hover pop out & shrink back behind picture
  const handlePointerEnter = () => {
    setIsHovered(true);

    // Stop existing float tweens
    floatTweens.current.forEach((t) => t.kill());
    floatTweens.current = [];

    logoRefs.current.forEach((el, i) => {
      if (!el) return;

      gsap.killTweensOf(el);
      gsap.to(el, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.52,
        delay: i * 0.04,
        ease: 'back.out(2.4)',
        onComplete: () => {
          // Continuous gentle floating / bobbing
          const tween = gsap.to(el, {
            y: (i % 2 === 0 ? -6 : 6),
            rotate: (i % 2 === 0 ? 3 : -3),
            duration: 1.6 + i * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          floatTweens.current.push(tween);
        },
      });
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);

    // Stop floating tweens
    floatTweens.current.forEach((t) => t.kill());
    floatTweens.current = [];

    logoRefs.current.forEach((el, i) => {
      if (!el) return;
      const logo = LOGOS[i];
      gsap.killTweensOf(el);
      gsap.to(el, {
        scale: 0,
        opacity: 0,
        x: logo.collapseX,
        y: logo.collapseY,
        rotate: 0,
        duration: 0.32,
        delay: (LOGOS.length - 1 - i) * 0.03,
        ease: 'power2.in',
      });
    });
  };

  return (
    <section ref={sectionRef} className="hero-screen">
      <div className="hero-content-wrap">
        <div className="hero-main-content">
          {/* Left Text Column */}
          <div className="hero-text-col">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="eyebrow fade-item">
              <span>Software engineer</span>
              <span className="eyebrow-rule" />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
                Airbnb host.
              </span>
            </div>

            {/* Main title */}
            <h1
              ref={titleRef}
              className="hero-title fade-item"
              style={{ marginTop: 'clamp(14px, 2.5vh, 26px)', opacity: 0, transform: 'translateY(24px)' }}
            >
              <span>SAGAR</span>
              <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <em className="accent-word">KASHYAP</em>
                <svg
                  className="underline-svg"
                  viewBox="0 0 320 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    ref={underlineRef}
                    className="underline-path"
                    d="M2 14 C60 4, 160 20, 318 8"
                    stroke="#c0392b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            {/* Bio */}
            <p
              ref={bioRef}
              className="hero-bio fade-item"
              style={{ marginTop: 'clamp(18px, 3vh, 32px)' }}
            >
              I&rsquo;m Sagar Kashyap &mdash; a software engineer with{' '}
              <strong>3 years of experience</strong> building{' '}
              <a href="#experience">enterprise-level web applications</a>, a growing pile of{' '}
              <a href="#projects">personal projects</a>, and plenty of{' '}
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1em' }}>vibe coding</span>{' '}
              along the way. Also an{' '}
              <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer">Airbnb host</a>.
            </p>
          </div>

          {/* Right Column: Character with floating pop-out logos */}
          <div
            ref={illoRef}
            className="hero-illustration"
            style={{ opacity: 0 }}
            aria-label="Illustration of Sagar Kashyap with floating tech logos that pop out on hover"
          >
            <div
              ref={illoWrapRef}
              className="illo-img-wrap"
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onClick={() => {
                if (isHovered) {
                  handlePointerLeave();
                } else {
                  handlePointerEnter();
                }
              }}
            >
              {/* Floating logo icons behind portrait (clean naked vector logos matching reference) */}
              {LOGOS.map((logo, i) => (
                <div
                  key={logo.id}
                  ref={(el) => { logoRefs.current[i] = el; }}
                  className="orbit-float"
                  title={logo.name}
                  aria-label={logo.name}
                  style={logo.style}
                >
                  {logo.icon}
                </div>
              ))}

              {/* Portrait on top with z-index: 10 */}
              <Image
                src="/images/face-illustration.png"
                alt="Minimal black-and-white illustration of a young man's smiling face"
                width={450}
                height={520}
                priority
                className="illo-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="hero-marquee">
        <div className="marquee-inner">
          {[0, 1].map((pass) => (
            <div key={pass} className="marquee-track marquee-seq">
              {MARQUEE_ITEMS.map((text, i) => (
                <div key={`${pass}-${i}`} className="marquee-item">
                  <span className="marquee-text">{text}</span>
                  <span className="marquee-star">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0l1.6 5.4H15l-4.6 3.4 1.8 5.5L8 11.1 3.8 14.3l1.8-5.5L1 5.4h5.4z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div
        ref={footRef}
        className="hero-footer fade-item"
        style={{ opacity: 0 }}
      >
        <span>© SAGAR KASHYAP</span>
        <span>REACT · GSAP · PENCIL</span>
      </div>
    </section>
  );
}
