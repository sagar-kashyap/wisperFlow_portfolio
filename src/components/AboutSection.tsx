'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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

      // Columns entrance
      [leftColRef.current, rightColRef.current].forEach((col, i) => {
        if (!col) return;
        gsap.set(col, { opacity: 0, y: 35 });
        ScrollTrigger.create({
          trigger: col,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(col, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'back.out(1.4)',
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      {/* Section Header */}
      <div className="about-head">
        <div className="eyebrow">ABOUT ME / 05</div>
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
          ENGINEER &middot; BUILDER &middot; HOST
        </div>
      </div>

      {/* Main Title */}
      <h2
        ref={titleRef}
        className="about-title fade-item"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        A builder at heart,
        <br />
        <em>driven by craft.</em>
      </h2>

      {/* Content Grid */}
      <div className="about-grid">
        {/* Left Column: Story & Philosophy */}
        <div ref={leftColRef} className="about-narrative">
          <p className="about-lead">
            I craft software that balances <em>technical rigor</em> under the hood with tactile, responsive delight on the glass.
          </p>

          <p className="about-p">
            With <strong>3 years of professional experience</strong> engineering enterprise-scale web applications, I&rsquo;ve built mission-critical frontends and resilient client architectures for global teams at Accenture and Deloitte.
          </p>

          <p className="about-p">
            When I&rsquo;m not optimizing production codebases, I spend my time <em>vibe coding</em> &mdash; turning curious questions into shipped tools. Whether that&rsquo;s architecting developer tooling like <a href="https://packagepal.dev/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textDecorationColor: 'var(--red)', fontWeight: 600 }}>PackagePal ↗</a> to bridge code across languages, or leveraging computer vision and generative AI with <strong>Site Supervisor</strong> to transform interior spaces.
          </p>

          <div className="about-highlight-box">
            <p className="about-highlight-quote">
              &ldquo;The best software feels effortless &mdash; solid architecture underneath, clear intentions upfront.&rdquo;
            </p>
          </div>

          <p className="about-p">
            Alongside engineering, I also host travelers on Airbnb. Hosting taught me the tangible side of user experience: how physical comfort, lighting, and thoughtful details can turn a simple stay into a memorable experience.
          </p>

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <span className="about-hand-note">
              &mdash; curiosity-led, craft-focused ✦
            </span>
          </div>
        </div>

        {/* Right Column: Stack & Highlights */}
        <div ref={rightColRef} className="about-aside">
          {/* Card 1: Core Toolkit */}
          <div className="about-card">
            <h3 className="about-card-title">THE TECHNICAL TOOLKIT</h3>

            <div className="about-skills-group">
              <span className="about-skill-cat">LANGUAGES &amp; FOUNDATIONS</span>
              <div className="about-chips">
                <span className="about-chip">TypeScript</span>
                <span className="about-chip">JavaScript (ES6+)</span>
                <span className="about-chip">HTML5 / Modern CSS</span>
                <span className="about-chip">Python</span>
              </div>
            </div>

            <div className="about-skills-group">
              <span className="about-skill-cat">FRONTEND &amp; MOTION</span>
              <div className="about-chips">
                <span className="about-chip">React.js</span>
                <span className="about-chip">Next.js (App Router)</span>
                <span className="about-chip">GSAP &amp; ScrollTrigger</span>
                <span className="about-chip">Tailwind CSS</span>
                <span className="about-chip">State Management</span>
              </div>
            </div>

            <div className="about-skills-group">
              <span className="about-skill-cat">BACKEND &amp; CLOUD</span>
              <div className="about-chips">
                <span className="about-chip">Node.js</span>
                <span className="about-chip">Nest.js</span>
                <span className="about-chip">REST &amp; GraphQL</span>
                <span className="about-chip">Git / CI/CD</span>
              </div>
            </div>
          </div>

          {/* Card 2: Outside The Terminal */}
          <div className="about-card" style={{ background: '#2b2723', color: '#f3eee3' }}>
            <h3 className="about-card-title" style={{ color: '#d1cbc1' }}>BEYOND THE CODE EDITOR</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>🏡</span>
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Superhost &amp; Space Designer</strong>
                  <span style={{ color: '#d1cbc1', fontSize: '0.9rem' }}>
                    Curating tech-enabled, relaxing spaces for travelers from around the world.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>✨</span>
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Micro-Interactions &amp; Motion</strong>
                  <span style={{ color: '#d1cbc1', fontSize: '0.9rem' }}>
                    Obsessed with subtle, springy physics and responsive tactile animations on the web.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>☕</span>
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Pour-Overs &amp; Roadtrips</strong>
                  <span style={{ color: '#d1cbc1', fontSize: '0.9rem' }}>
                    Exploring local specialty roasters and driving scenic highways over the weekends.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

