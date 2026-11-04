'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpCard {
  id: string;
  colorClass: string;
  tag: string;
  index: string;
  company: string;
  note?: string;
  role: string;
  blurb: string;
  chips: string[];
}

const CARDS: ExpCard[] = [
  {
    id: 'accenture',
    colorClass: 'card-ink',
    tag: 'CURRENT ROLE',
    index: '01',
    company: 'Accenture',
    role: 'SOFTWARE ENGINEER',
    blurb:
      'The day job today — building enterprise-level web applications for global clients, where the serious engineering ships.',
    chips: ['FULL-TIME · NOW', 'ENTERPRISE WEB APPS'],
  },
  {
    id: 'deloitte',
    colorClass: 'card-clay',
    tag: 'BEFORE THAT',
    index: '02',
    company: 'Deloitte',
    role: 'SOFTWARE ENGINEER',
    blurb:
      'Where the enterprise toolkit got real — big clients, bigger systems, and consulting-grade delivery.',
    chips: ['FULL-TIME', 'CONSULTING'],
  },
  {
    id: 'internship',
    colorClass: 'card-parch',
    tag: 'WHERE IT STARTED',
    index: '03',
    company: 'The Internship',
    note: '— add company name',
    role: 'SOFTWARE DEVELOPMENT INTERN',
    blurb:
      'First real codebase, first production deploys, first taste of shipping software people actually use.',
    chips: ['THE ORIGIN STORY'],
  },
];

export default function ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const deckRef     = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs     = useRef<(HTMLButtonElement | null)[]>([]);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots    = dotRefs.current.filter(Boolean) as HTMLButtonElement[];
    const total   = cards.length;

    // ── Initial state: stack cards, Accenture on top ──────────────
    // z-index: card 0 (Accenture) highest
    const baseRotations = [-1.2, 1.3, -0.6];
    cards.forEach((card, i) => {
      gsap.set(card, {
        zIndex: total - i,
        rotate: baseRotations[i],
        x: 0,
        y: 0,
        opacity: 1,
      });
    });

    // ── Dot helper ─────────────────────────────────────────────────
    const setActiveDot = (idx: number) => {
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    };
    setActiveDot(0);

    // ── Entrance: title + eyebrow ─────────────────────────────────
    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to([eyebrowRef.current, titleRef.current], {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        });
      },
    });

    // ── Build a scrubbed timeline ──────────────────────────────────
    // Each card gets its own "exit" segment.
    // Card 0 exits between progress 0→0.5
    // Card 1 exits between progress 0.5→1
    // Card 2 (last) stays visible at the end
    const tl = gsap.timeline({ paused: true });

    // Segment 1: Card 0 (Accenture) flies off left
    tl.to(cards[0], {
      x: -900,
      y: -60,
      rotate: -22,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
      onStart:    () => setActiveDot(1),
      onReverseComplete: () => setActiveDot(0),
    }, 0);

    // Segment 2: Card 1 (Deloitte) flies off right
    tl.to(cards[1], {
      x: 900,
      y: -60,
      rotate: 22,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
      onStart:    () => setActiveDot(2),
      onReverseComplete: () => setActiveDot(1),
    }, 1);

    // ── ScrollTrigger drives the timeline ─────────────────────────
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(total - 1) * window.innerHeight * 1.2}`,
      scrub: 1.2,
      pin: stickyRef.current,
      anticipatePin: 1,
      animation: tl,
      snap: {
        snapTo: 1 / (total - 1),
        duration: { min: 0.3, max: 0.6 },
        delay: 0.05,
        ease: 'power2.inOut',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section"
    >
      {/* Sticky viewport */}
      <div ref={stickyRef} className="exp-sticky">

        {/* ── Section heading ─────────────────────────────────── */}
        <div ref={eyebrowRef} className="exp-heading" style={{ opacity: 0, transform: 'translateY(16px)' }}>
          <div className="exp-heading-left">
            <span className="eyebrow">EXPERIENCE / 02</span>
            <h2 ref={titleRef} className="exp-title" style={{ opacity: 0, transform: 'translateY(16px)' }}>
              Three stops,<br />
              <em>one journey.</em>
            </h2>
          </div>
          <span className="exp-counter">scroll to explore</span>
        </div>

        {/* ── Card deck ───────────────────────────────────────── */}
        <div ref={deckRef} className="exp-deck">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`exp-card ${card.colorClass}`}
            >
              <div className="exp-card-top">
                <span className="exp-tag">{card.tag}</span>
                <span className="exp-index">{card.index}</span>
              </div>

              <div>
                <div className="exp-company">{card.company}</div>
                {card.note && (
                  <span className="exp-note-hand">{card.note}</span>
                )}
              </div>

              <p className="exp-role">
                <span className="role-dot" />
                {card.role}
              </p>

              <p className="exp-blurb">{card.blurb}</p>

              <div className="exp-meta-row">
                {card.chips.map((chip) => (
                  <span key={chip} className="exp-chip">{chip}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Navigation dots ─────────────────────────────────── */}
        <div className="exp-dots">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="exp-dot"
              aria-label={`View ${card.company}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
