'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  tag: string;
  num: string;
  name: string;
  sub: string;
  desc: string;
  chips: string[];
  note: string;
  img: string;
  imgAlt: string;
  rotate: string;
  youtubeId: string;
  websiteUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'packagepal',
    tag: 'VS CODE EXTENSION',
    num: 'PERSONAL PROJECT · 01',
    name: 'PackagePal',
    sub: 'VS CODE',
    desc: 'A VS Code extension that migrates your code from one source language to any target language — pick a pair, point it at the code, and let it carry your codebase across.',
    chips: ['ANY LANGUAGE PAIR', 'any → any, one click'],
    note: 'Ship it ↗',
    img: '/images/project-vscode.png',
    imgAlt: 'Illustration of PackagePal VS Code extension code migration tool',
    rotate: '-1.4deg',
    youtubeId: 'RlDwJ43qvLk',
    websiteUrl: 'https://packagepal.dev/',
  },
  {
    id: 'site-supervisor',
    tag: 'MOBILE APP',
    num: 'PERSONAL PROJECT · 02',
    name: 'Site Supervisor',
    sub: 'CAMERA · AI',
    desc: 'Point your camera at any room and snap a picture — the app works like a professional interior designer and styles your space, perfect for Airbnb listings or any kind of decoration.',
    chips: ['AIRBNB-READY', 'point. shoot. styled.'],
    note: 'Demo available ✦',
    img: '/images/project-interior.png',
    imgAlt: 'Illustration of Site Supervisor phone app restyling a space',
    rotate: '1.2deg',
    youtubeId: 'qawX2qZ-Toc',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          });
        },
      });

      // Cards entrance, staggered
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, y: 50, rotate: PROJECTS[i].rotate });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1, y: 0, duration: 0.8,
              delay: i * 0.12,
              ease: 'back.out(1.5)',
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleVideo = (id: string) => {
    setOpenVideoId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} id="projects" className="projects">
      {/* Section header */}
      <div className="proj-head">
        <div className="eyebrow">PROJECTS / 03</div>
        <div
          className="eyebrow"
          style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
            textTransform: 'none',
            letterSpacing: '0.02em',
            fontSize: '0.95rem',
          }}
        >
          PERSONAL WORK
        </div>
      </div>

      {/* Title */}
      <h2
        ref={titleRef}
        className="proj-title fade-item"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        The <em>highlighted</em>
        <br />projects.
      </h2>

      {/* Grid */}
      <div className="proj-grid">
        {PROJECTS.map((proj, i) => {
          const isVideoOpen = openVideoId === proj.id;

          return (
            <div
              key={proj.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="proj-card"
            >
              {/* Visual Preview */}
              <div className="proj-visual">
                <Image
                  src={proj.img}
                  alt={proj.imgAlt}
                  width={600}
                  height={380}
                  className="proj-img"
                />
              </div>

              {/* Body */}
              <div className="proj-body">
                <span className="proj-tag">{proj.tag}</span>
                <div>
                  <p className="proj-sub">{proj.num}</p>
                  <h3 className="proj-name">{proj.name}</h3>
                </div>
                <p className="proj-sub">{proj.sub}</p>
                <p className="proj-desc">{proj.desc}</p>

                {/* Video Dropdown & Site Link Action */}
                <div className="proj-video-action">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      className={`proj-video-btn ${isVideoOpen ? 'active' : ''}`}
                      onClick={() => toggleVideo(proj.id)}
                      aria-expanded={isVideoOpen}
                    >
                      <span className="proj-video-play-icon">▶</span>
                      <span>{isVideoOpen ? 'Close video' : 'Click to view video'}</span>
                      <span className="proj-video-arrow">{isVideoOpen ? '▴' : '▾'}</span>
                    </button>

                    {proj.websiteUrl && (
                      <a
                        href={proj.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-website-btn"
                      >
                        <span>Visit Website ↗</span>
                      </a>
                    )}
                  </div>

                  {/* Dropdown Embedded Video */}
                  {isVideoOpen && (
                    <div className="proj-video-dropdown">
                      <div className="proj-video-wrapper">
                        <iframe
                          src={`https://www.youtube.com/embed/${proj.youtubeId}?autoplay=1&rel=0`}
                          title={`${proj.name} demo walkthrough`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="proj-video-iframe"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with tags & hand-drawn note */}
                <div className="proj-foot">
                  <div className="proj-chips">
                    {proj.chips.map((chip) => (
                      <span key={chip} className="proj-chip">{chip}</span>
                    ))}
                  </div>
                  {proj.websiteUrl ? (
                    <a
                      href={proj.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-note"
                      style={{ textDecoration: 'none' }}
                    >
                      {proj.note}
                    </a>
                  ) : (
                    <span className="proj-note">{proj.note}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
