'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const EMAIL = 'sagarkashyapdiyavr@gmail.com';

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

      // Card entrance
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      {/* Section Header */}
      <div className="contact-head">
        <div className="eyebrow">CONTACT / 06</div>
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
          LET&rsquo;S CONNECT &middot; INBOX OPEN
        </div>
      </div>

      {/* Main Title */}
      <h2
        ref={titleRef}
        className="contact-title fade-item"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        Have an idea or project?
        <br />
        <em>Let&rsquo;s talk.</em>
      </h2>

      {/* Hero Contact Card */}
      <div ref={cardRef} className="contact-card">
        {/* Availability Status Beacon */}
        <div className="contact-status-bar">
          <span className="contact-status-dot" />
          <span>OPEN TO SELECT OPPORTUNITIES &amp; COLLABORATIONS</span>
        </div>

        <div>
          <p className="contact-desc">
            Whether you&rsquo;re building an enterprise-grade web application, want to collaborate on developer tooling, swap notes on AI &amp; vibe coding, or book a stay at my Airbnb &mdash; feel free to reach out.
          </p>
        </div>

        {/* Action Row: Send Email + Copy Address */}
        <div className="contact-email-box">
          <a
            href={`mailto:${EMAIL}`}
            className="contact-email-btn"
          >
            <span>Say Hello &rarr;</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="contact-copy-btn"
            title="Click to copy email address"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copied ? 'Copied to clipboard! ✓' : EMAIL}</span>
          </button>
        </div>

        {/* Social / Direct Channels Grid */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#d1cbc1',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            CONNECT ACROSS THE WEB
          </span>

          <div className="contact-channels-grid">
            {/* GitHub */}
            <a
              href="https://github.com/sagar-kashyap"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="contact-channel-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </div>
              <span>↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sagar-kashyap"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="contact-channel-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </div>
              <span>↗</span>
            </a>

            {/* Airbnb Host Blog */}
            <a
              href="https://airbnb-blog.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="contact-channel-left">
                <svg width="18" height="18" viewBox="0 0 32 36" fill="none" stroke="#FF5A5F" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 2.5C12 2.5 7.5 7 7.5 13.5C7.5 19.5 11.5 25.5 16 29.5C20.5 25.5 24.5 19.5 24.5 13.5C24.5 7 20 2.5 16 2.5Z" />
                  <path d="M16 12C14.3 12 13 13.3 13 15C13 16.7 14.3 18 16 18C17.7 18 19 16.7 19 15C19 13.3 17.7 12 16 12Z" />
                </svg>
                <span>Airbnb Blog</span>
              </div>
              <span>↗</span>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="contact-channel-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X / Twitter</span>
              </div>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-hand)', fontSize: '22px', color: '#f3eee3', display: 'inline-block', transform: 'rotate(-2deg)' }}>
            &mdash; replies usually within 24 hours ✦
          </span>
        </div>
      </div>
    </section>
  );
}

