'use client';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/sagar-kashyap';
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/sagar-kashyap';
  const PACKAGEPAL_URL = process.env.NEXT_PUBLIC_PACKAGEPAL_URL || 'https://packagepal.dev/';
  const AIRBNB_BLOG_URL = process.env.NEXT_PUBLIC_AIRBNB_BLOG_URL || 'https://airbnb-blog.vercel.app/';

  return (
    <footer className="site-footer-main">
      <div className="footer-top-grid">
        {/* Brand & Bio Column */}
        <div className="footer-brand">
          <h3 className="footer-brand-name">SAGAR KASHYAP</h3>
          <p className="footer-brand-desc">
            Software engineer building scalable web applications for enterprise clients, shipping vibe-coded products, and curating Airbnb retreats.
          </p>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: '22px', color: 'var(--red)', transform: 'rotate(-2deg)', display: 'inline-block' }}>
              &mdash; thanks for dropping by! ✦
            </span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="footer-col-title">NAVIGATION</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <a href="#experience">01 &middot; Experience</a>
            </li>
            <li className="footer-link-item">
              <a href="#projects">02 &middot; Projects</a>
            </li>
            <li className="footer-link-item">
              <a href="#airbnb">03 &middot; Airbnb Stays</a>
            </li>
            <li className="footer-link-item">
              <a href="#about">04 &middot; About Me</a>
            </li>
            <li className="footer-link-item">
              <a href="#contact">05 &middot; Contact</a>
            </li>
          </ul>
        </div>

        {/* Featured Projects & Links */}
        <div>
          <h4 className="footer-col-title">FEATURED</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <a
                href={PACKAGEPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                PackagePal ↗
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#projects">Site Supervisor</a>
            </li>
            <li className="footer-link-item">
              <a
                href={AIRBNB_BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Airbnb Host Blog ↗
              </a>
            </li>
            <li className="footer-link-item">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </li>
            <li className="footer-link-item">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div>
          <span>&copy; {new Date().getFullYear()} SAGAR KASHYAP</span>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>&middot;</span>
          <span>NEXT.JS &middot; GSAP &middot; CRAFT</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-back-to-top"
          aria-label="Scroll back to top of the page"
        >
          <span>&uarr; Back to Top</span>
        </button>
      </div>
    </footer>
  );
}

