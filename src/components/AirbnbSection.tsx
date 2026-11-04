'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AirbnbSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const blogCardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });

      // Cards entrance
      [card1Ref.current, card2Ref.current, blogCardRef.current].forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'back.out(1.5)',
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="airbnb" className="airbnb-section">
      {/* Section Header */}
      <div className="airbnb-head">
        <div className="eyebrow">AIRBNB HOST / 04</div>
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
          HOSPITALITY &amp; SPACES
        </div>
      </div>

      {/* Main Title & Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2
          ref={titleRef}
          className="airbnb-title fade-item"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          What I do beside coding?
          <br />
          <em>Hosting people.</em>
        </h2>

        {/* Credibility badges */}
        <div className="airbnb-badge-row">
          <span className="airbnb-badge airbnb-badge-superhost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#E11D48" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            SUPERHOST STATUS
          </span>
          <span className="airbnb-badge">
            ★ 4.9+ GUEST RATING
          </span>
          <span className="airbnb-badge">
            100% RESPONSE RATE
          </span>
          <a
            href="https://airbnb-blog.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="airbnb-badge"
            style={{ textDecoration: 'none', color: 'var(--ink)' }}
          >
            📖 HOST BLOG ↗
          </a>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="airbnb-grid">
        {/* Card 1: Hospitality Philosophy & Tech Amenities */}
        <div ref={card1Ref} className="airbnb-card">
          <div className="airbnb-card-top">
            <span className="airbnb-tag">THE HOST PHILOSOPHY</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.6 }}>01</span>
          </div>

          <div>
            <h3 className="airbnb-card-title">Where code meets comfort.</h3>
          </div>

          <p className="airbnb-card-desc">
            Hosting isn’t just about providing a bed — it’s about debugging every friction point before you even step through the door. 
            From automated keyless check-ins to dedicated high-speed fiber setups and cozy lighting, every corner is designed like a well-crafted product.
          </p>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.7,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              HIGHLIGHTED AMENITIES
            </span>
            <div className="airbnb-amenities-grid">
              <div className="airbnb-amenity-item">
                <span>🔑</span>
                <span>Smart Self Check-in</span>
              </div>
              <div className="airbnb-amenity-item">
                <span>⚡</span>
                <span>300+ Mbps Fiber Wi-Fi</span>
              </div>
              <div className="airbnb-amenity-item">
                <span>☕</span>
                <span>Curated Coffee Station</span>
              </div>
              <div className="airbnb-amenity-item">
                <span>💻</span>
                <span>Ergonomic Work Desk</span>
              </div>
              <div className="airbnb-amenity-item">
                <span>🌿</span>
                <span>Local Food &amp; Spots Guide</span>
              </div>
              <div className="airbnb-amenity-item">
                <span>🛋️</span>
                <span>Hotel-Grade Linens</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <span className="airbnb-hand-note">
              &mdash; tested on real humans, optimized for calm ✦
            </span>
          </div>
        </div>

        {/* Card 2: Spaces, Reviews & Booking */}
        <div ref={card2Ref} className="airbnb-card airbnb-card-highlight">
          <div className="airbnb-card-top">
            <span className="airbnb-tag">SPACES &amp; REVIEWS</span>
            <svg width="22" height="24" viewBox="0 0 32 36" fill="none" stroke="#FF5A5F" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 2.5C12 2.5 7.5 7 7.5 13.5C7.5 19.5 11.5 25.5 16 29.5C20.5 25.5 24.5 19.5 24.5 13.5C24.5 7 20 2.5 16 2.5Z" />
              <path d="M16 12C14.3 12 13 13.3 13 15C13 16.7 14.3 18 16 18C17.7 18 19 16.7 19 15C19 13.3 17.7 12 16 12Z" />
            </svg>
          </div>

          <div>
            <h3 className="airbnb-card-title">Spaces with soul.</h3>
          </div>

          <p className="airbnb-card-desc">
            Warm ambient lights, textured earth tones, and quiet cozy corners built for weekend getaways, restful remote workations, and city explorers.
          </p>

          <div className="airbnb-quote-box">
            <p className="airbnb-quote">
              &ldquo;Sagar is the most thoughtful host. Every little detail was dialed in &mdash; from the lighting to the check-in guide. Truly felt like home.&rdquo;
            </p>
            <span className="airbnb-quote-author">
              ★ 5.0 · Verified Airbnb Guest Review
            </span>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="airbnb-cta-row">
              <a
                href="https://www.airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="airbnb-cta-btn"
              >
                <svg width="16" height="18" viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 2.5C12 2.5 7.5 7 7.5 13.5C7.5 19.5 11.5 25.5 16 29.5C20.5 25.5 24.5 19.5 24.5 13.5C24.5 7 20 2.5 16 2.5Z" />
                  <path d="M16 12C14.3 12 13 13.3 13 15C13 16.7 14.3 18 16 18C17.7 18 19 16.7 19 15C19 13.3 17.7 12 16 12Z" />
                </svg>
                <span>Explore on Airbnb ↗</span>
              </a>

              <a
                href="https://airbnb-blog.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="airbnb-blog-btn"
              >
                <span>Read Host Blog ↗</span>
              </a>
            </div>

            <span className="airbnb-hand-note" style={{ color: '#f3eee3', fontSize: '20px' }}>
              &mdash; come as guests, leave as friends ↗
            </span>
          </div>
        </div>

        {/* Featured Host Blog Card (Full Width) */}
        <a
          ref={blogCardRef}
          href="https://airbnb-blog.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="airbnb-blog-card"
        >
          <div className="airbnb-blog-info">
            <span className="airbnb-blog-tag">HOSTING CHRONICLES · STORIES &amp; TIPS</span>
            <h3 className="airbnb-blog-headline">
              The Airbnb Host Blog &mdash; <em>stories, spaces &amp; lessons.</em>
            </h3>
            <p className="airbnb-blog-snippet">
              Behind-the-scenes stories on how I design and automate rental spaces, guest experience design, local hosting guides, and lessons learned hosting hundreds of guests.
            </p>
          </div>

          <div className="airbnb-blog-action">
            <span>Visit Blog</span>
            <span>&rarr;</span>
          </div>
        </a>
      </div>
    </section>
  );
}
