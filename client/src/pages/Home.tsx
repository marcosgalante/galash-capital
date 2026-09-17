/*
 * GALASH CAPITAL — Home Page
 * Design: Modern Industrial Precision
 * Brand palette (from style guide):
 *   Navy dark:  #1A2B4A  (oklch ~0.24 0.07 252)
 *   Gold:       #C9973B  (oklch ~0.68 0.12 65)
 *   Grey mid:   #7A8A9A  (oklch ~0.60 0.02 240)
 *   Grey light: #C5CDD6  (oklch ~0.82 0.015 240)
 * Nav: white background with dark navy logo (as shown in brand guide)
 * Hero: very dark overlay for strong text contrast
 * No CTA buttons in nav
 */

import { useEffect, useRef, useState } from "react";

// ─── Image Assets ────────────────────────────────────────────────────────────
// Dark navy logo — used on white/light nav background
const LOGO_NAVY = "/images/logo-navy.png";
// Navy-background logo with white text — used directly in dark footer (no filter needed)
const LOGO_WHITE = "/images/logo-white.png";

// Team photos
const PHOTO_JOSEPH = ""; // TODO: add /images/team-joseph.png
const PHOTO_ALBERTO = "/images/team-alberto.jpg";
const PHOTO_MARCOS = "/images/team-marcos.jpg";

const HERO_IMG = "/images/hero-aerial.webp";
const WAREHOUSE_IMG = "/images/warehouse-interior.webp";
const SKYLINE_IMG = "/images/skyline-industrial.webp";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// Exact brand palette from style guide
const NAVY      = "#1A2B4A";   // primary dark navy
const NAVY_MID  = "#223060";   // slightly lighter navy for surfaces
const NAVY_CARD = "#1E3055";   // card background
const GOLD      = "#C9973B";   // brand gold
const GOLD_DARK = "#A87C2E";   // darker gold for hover
const GREY_MID  = "#7A8A9A";   // medium grey
const GREY_LIGHT= "#C5CDD6";   // light grey
const WHITE     = "#FFFFFF";
const OFF_WHITE = "#F4F5F7";   // nav background (light, as in brand guide)

// ─── Scroll Animation Hook ────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Navigation — white background, dark navy logo, no CTA button ─────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Strategy", href: "#strategy" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  // Nav is always white/light — matches brand guide showing logo on white
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: WHITE,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${GREY_LIGHT}`,
        boxShadow: scrolled ? "0 2px 16px rgba(26,43,74,0.10)" : "0 1px 0 rgba(26,43,74,0.06)",
        transition: "box-shadow 0.3s",
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: 80 }}>
        {/* Dark navy logo on white nav */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={LOGO_NAVY}
            alt="Galash Capital"
            style={{ height: 58, width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop Links — dark navy text */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: NAVY,
                textDecoration: "none",
                transition: "color 0.2s",
                opacity: 0.75,
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = GOLD; (e.target as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = NAVY; (e.target as HTMLElement).style.opacity = "0.75"; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: NAVY, background: "none", border: "none" }}
        >
          <div style={{ width: 22, height: 2, background: "currentColor", marginBottom: 5, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div style={{ width: 22, height: 2, background: "currentColor", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <div style={{ width: 22, height: 2, background: "currentColor", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: WHITE, borderTop: `1px solid ${GREY_LIGHT}`, padding: "1.5rem" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: NAVY,
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: `1px solid ${GREY_LIGHT}`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section — very dark overlay for strong text contrast ────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Background Image */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }} />

      {/* Dark overlay — balanced for visibility + readability */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, rgba(26,43,74,0.80) 0%, rgba(26,43,74,0.68) 55%, rgba(26,43,74,0.52) 100%)`,
      }} />

      {/* Content */}
      <div className="relative container flex flex-col justify-center" style={{ minHeight: "100vh", paddingTop: "9rem", paddingBottom: "6rem" }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}>
          {/* Main headline — pure white for maximum contrast */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
            lineHeight: 1.05,
            color: WHITE,
            maxWidth: "820px",
            marginBottom: "1.5rem",
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
          }}>
            <span style={{ color: WHITE }}>Galash Capital</span>
            <br />
            <span style={{ fontStyle: "italic", color: GOLD }}>Industrial Real Estate</span>
            <br />
            <span style={{ color: WHITE }}>Investments</span>
          </h1>

          {/* Gold rule */}
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "1.75rem" }} />

          {/* Subheadline — light grey for clear readability */}
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: GREY_LIGHT,
            maxWidth: "520px",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          }}>
            Disciplined acquisition and active management of multi-tenant industrial
            properties across Florida and Sun Belt States.
          </p>


        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2" style={{ transform: "translateX(-50%)", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s" }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${GOLD}, transparent)`, margin: "0 auto" }} />
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: OFF_WHITE, padding: "7rem 0" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <Reveal>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "1rem",
            }}>About Galash Capital</div>
            <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "2rem" }} />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.15,
              color: NAVY,
              marginBottom: "1.5rem",
            }}>
              Data-Driven{" "}
              <span style={{ fontStyle: "italic", color: GOLD }}>Investing</span>
            </h2>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 400,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#3A4A60",
              marginBottom: "1.25rem",
            }}>
              Galash Capital uses proprietary algorithms and technology to analyze
              markets, identify opportunities, and execute disciplined investments
              in industrial properties. Our data-driven approach allows
              us to move with conviction in fragmented markets where institutional
              capital has historically been absent.
            </p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 400,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#3A4A60",
            }}>
              With a focused mandate on multi-tenant small-bay, mid-bay, contractor
              garages, and office-flex properties, we bring institutional rigor to
              an asset class defined by local ownership and operational upside.
            </p>
          </Reveal>

          {/* Right: Image with gold accent */}
          <Reveal delay={150}>
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "visible" }}>
              <img
                src={WAREHOUSE_IMG}
                alt="Small-bay industrial warehouse"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
              />
              {/* Gold accent border offset */}
              <div style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: "55%",
                height: "55%",
                border: `2px solid ${GOLD}`,
                zIndex: 0,
                pointerEvents: "none",
              }} />
              {/* Navy accent bottom-left */}
              <div style={{
                position: "absolute",
                bottom: "-14px",
                left: "-14px",
                width: "40%",
                height: "40%",
                border: `2px solid ${NAVY}`,
                zIndex: 0,
                opacity: 0.3,
                pointerEvents: "none",
              }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Why Small-Bay Section ────────────────────────────────────────────────────
function WhySmallBay() {
  const reasons = [
    { title: "Strong Tenant Demand", body: "Small businesses, logistics operators, and service providers rely on flexible industrial space close to population centers — creating durable, diversified demand." },
    { title: "Fragmented Ownership", body: "The sector remains largely owned by small local landlords, creating acquisition opportunities for disciplined investors with institutional underwriting capabilities." },
    { title: "Limited New Supply", body: "Zoning constraints and rising land costs restrict the development of new small-bay properties, protecting existing assets from competitive oversupply." },
    { title: "Resilient Asset Class", body: "Diverse tenant bases and shorter lease terms allow rents to adjust more quickly to market conditions, providing natural inflation protection." },
    { title: "Operational Upside", body: "Active management and strategic improvements — from lease-up to capital improvements — can unlock meaningful additional value over the hold period." },
    { title: "Mission-Critical Space", body: "Small-bay tenants depend on their space to run their businesses. This operational necessity translates to strong retention and predictable cash flows." },
  ];

  return (
    <section id="strategy" style={{ background: NAVY, padding: "7rem 0", position: "relative", overflow: "hidden" }}>
      {/* Subtle background texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SKYLINE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />

      <div className="container" style={{ position: "relative" }}>
        <Reveal>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
            Investment Thesis
          </div>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "2rem" }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            lineHeight: 1.15,
            color: WHITE,
            marginBottom: "1rem",
            maxWidth: "600px",
          }}>
            Why{" "}
            <span style={{ fontStyle: "italic", color: GOLD }}>Small-Bay Industrial</span>
          </h2>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            color: GREY_LIGHT,
            maxWidth: "560px",
            lineHeight: 1.75,
            marginBottom: "4rem",
          }}>
            A resilient, essential, and under-institutionalized asset class that
            rewards disciplined operators with access to local market intelligence.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                style={{ background: NAVY_CARD, padding: "2.5rem", height: "100%", transition: "background 0.3s, border-top-color 0.3s", borderTop: `2px solid transparent` }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY_MID; el.style.borderTopColor = GOLD; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY_CARD; el.style.borderTopColor = "transparent"; }}
              >
                <div style={{ width: 28, height: 2, background: GOLD, marginBottom: "1.25rem", opacity: 0.6 }} />
                <h3 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: WHITE,
                  marginBottom: "0.75rem",
                }}>
                  {r.title}
                </h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: GREY_LIGHT }}>
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities Section ─────────────────────────────────────────────────────
function Capabilities() {
  // Order: TL=Acquisitions, TR=Development, BL=Asset Management, BR=Value Creation
  const caps = [
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
      title: "Acquisitions",
      body: "Disciplined sourcing and underwriting of small-bay industrial assets in high-demand locations across Florida and the Sun Belt.",
    },
    {
      // Tower crane icon — distinct from the house/acquisitions icon
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="2" x2="12" y2="22" /><line x1="12" y1="4" x2="22" y2="8" /><line x1="12" y1="4" x2="4" y2="7" /><line x1="22" y1="8" x2="22" y2="14" /><rect x="19" y="14" width="6" height="4" rx="0.5" /><line x1="12" y1="6" x2="18" y2="8.5" /><line x1="12" y1="22" x2="8" y2="22" /><line x1="12" y1="22" x2="16" y2="22" /></svg>,
      title: "Development",
      body: "Ground-up development where land cost, zoning, and market fundamentals support new industrial construction. Same underwriting discipline as acquisitions.",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>,
      title: "Asset Management",
      body: "Hands-on oversight of leasing, tenant retention, and operational performance. We manage assets with the same rigor applied to underwriting.",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
      title: "Value Creation",
      body: "Unlocking value through improvements, repositioning, and active management. We target assets with mark-to-market rent potential and expansion upside.",
    },
  ];

  return (
    <section id="capabilities" style={{ background: OFF_WHITE, padding: "7rem 0" }}>
      <div className="container">
        <Reveal>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
            What We Do
          </div>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "2rem" }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            lineHeight: 1.15,
            color: NAVY,
            marginBottom: "4rem",
            maxWidth: "500px",
          }}>
            Integrated{" "}
            <span style={{ fontStyle: "italic", color: GOLD }}>Capabilities</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caps.map((cap, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: WHITE,
                  border: `1px solid ${GREY_LIGHT}`,
                  padding: "2.5rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  height: "100%",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.boxShadow = "0 4px 24px rgba(26,43,74,0.10)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GREY_LIGHT; el.style.boxShadow = "none"; }}
              >
                <div style={{ color: GOLD, flexShrink: 0, marginTop: "0.2rem" }}>{cap.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, marginBottom: "0.75rem" }}>
                    {cap.title}
                  </h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: "0.95rem", lineHeight: 1.75, color: "#3A4A60" }}>
                    {cap.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
function Team() {
  // Order: Alberto left, Marcos right
  const members = [
    {
      name: "Alberto Galante",
      title: "Principal",
      bio: "Alberto brings extensive experience in real estate investment and capital markets. He leads Galash Capital's overall strategy, investor relations, and platform development, drawing on a career spanning acquisitions, asset management, and portfolio construction across multiple asset classes.",
      linkedin: "https://www.linkedin.com/in/alberto-galante-70621238/",
      photo: PHOTO_ALBERTO,
      initials: "AG",
    },
    {
      name: "Marcos Galante",
      title: "Principal",
      bio: "Marcos oversees deal sourcing, underwriting, and transaction execution at Galash Capital. With deep roots in South Florida's industrial market and a data-driven approach to opportunity identification, he leads the firm's acquisition pipeline from initial screening through closing.",
      linkedin: "https://www.linkedin.com/in/marcosgalante/",
      photo: PHOTO_MARCOS,
      initials: "MG",
    },
  ];

  return (
    <section id="team" style={{ background: NAVY, padding: "7rem 0" }}>
      <div className="container">
        <Reveal>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
            Leadership
          </div>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "2rem" }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            lineHeight: 1.15,
            color: WHITE,
            marginBottom: "4rem",
          }}>
            The{" "}
            <span style={{ fontStyle: "italic", color: GOLD }}>Team</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ alignItems: "stretch" }}>
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 80} style={{ height: "100%" }}>
              <div
                style={{ background: NAVY_CARD, border: `1px solid rgba(255,255,255,0.07)`, padding: "2.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start", transition: "border-color 0.3s, background 0.3s", height: "100%", boxSizing: "border-box" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${GOLD}55`; el.style.background = NAVY_MID; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = NAVY_CARD; }}
              >
                {/* Avatar — photo if available, else initials placeholder */}
                <div style={{ width: 72, height: 72, flexShrink: 0, overflow: "hidden", border: `1px solid ${GOLD}44` }}>
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: `${GOLD}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.2rem", color: GOLD }}>{m.initials}</span>
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.25rem", color: WHITE, lineHeight: 1.2 }}>{m.name}</h3>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginTop: "0.2rem", marginBottom: "0.75rem" }}>{m.title}</div>
                    </div>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: GREY_MID, transition: "color 0.2s", flexShrink: 0 }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = GREY_MID)}
                      title={`${m.name} on LinkedIn`}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.75, color: GREY_LIGHT }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:marcos@galashcapital.com?subject=${encodeURIComponent(form.subject || "Inquiry — Galash Capital")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: WHITE,
    border: `1px solid ${GREY_LIGHT}`,
    color: NAVY,
    padding: "0.85rem 1rem",
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 400,
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ background: OFF_WHITE, padding: "7rem 0" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <Reveal>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
              Get In Touch
            </div>
            <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "2rem" }} />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.15,
              color: NAVY,
              marginBottom: "1.5rem",
            }}>
              Let's{" "}
              <span style={{ fontStyle: "italic", color: GOLD }}>Connect</span>
            </h2>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 400,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#3A4A60",
              marginBottom: "3rem",
            }}>
              We welcome inquiries from brokers, owners, and partners. Reach out
              and we'll respond promptly.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <ContactDetail label="Email" value="marcos@galashcapital.com" href="mailto:marcos@galashcapital.com" />
              <ContactDetail label="Phone" value="(305) 965-1454" href="tel:+13059651454" />
              <ContactDetail label="Address" value="3121 W. Hallandale Beach Blvd #103, Hallandale, FL 33009" />
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={150}>
            {submitted ? (
              <div style={{ background: WHITE, border: `1px solid ${GREY_LIGHT}`, padding: "3rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
                <div style={{ width: 52, height: 52, border: `2px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.5rem", color: NAVY, marginBottom: "0.75rem" }}>Message Sent</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: "0.95rem", color: GREY_MID }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: "0.4rem", opacity: 0.7 }}>Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = GOLD)}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = GREY_LIGHT)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: "0.4rem", opacity: 0.7 }}>Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = GOLD)}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = GREY_LIGHT)} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: "0.4rem", opacity: 0.7 }}>Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle} placeholder="How can we help?"
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = GOLD)}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = GREY_LIGHT)} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: "0.4rem", opacity: 0.7 }}>Message</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} placeholder="Tell us about yourself and how we can work together."
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = GOLD)}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = GREY_LIGHT)} />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: WHITE,
                    background: NAVY,
                    padding: "1rem 2rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.background = GOLD)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.background = NAVY)}
                >
                  Send Message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, paddingTop: "0.15rem", minWidth: "72px" }}>
        {label}
      </div>
      {href ? (
        <a href={href} style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: "0.95rem", color: "#3A4A60", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#3A4A60")}>
          {value}
        </a>
      ) : (
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: "0.95rem", color: "#3A4A60" }}>{value}</span>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: NAVY, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
      {/* Upper footer — logo + nav + LinkedIn */}
      <div className="container" style={{ padding: "3rem 0 2.5rem", paddingLeft: undefined, paddingRight: undefined }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* LEFT: Navy-bg logo — renders directly on dark footer, no filter needed */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img
              src={LOGO_WHITE}
              alt="Galash Capital"
              style={{
              height: 58,
              width: "auto",
              display: "block",
            }}
          />
        </a>

          {/* CENTER: Nav links */}
          <div className="flex flex-wrap justify-center gap-8">
            {["About", "Strategy", "Capabilities", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: GREY_MID, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = GREY_MID)}
              >
                {item}
              </a>
            ))}
          </div>

          {/* RIGHT: LinkedIn only */}
          <a
            href="https://www.linkedin.com/in/marcosgalante/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: GREY_MID, textDecoration: "none", transition: "color 0.2s", flexShrink: 0 }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = GOLD; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = GREY_MID; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ borderTop: `1px solid rgba(201,151,59,0.20)` }} />

      {/* Lower footer — copyright */}
      <div className="container" style={{ padding: "1.25rem 0" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: GREY_MID, opacity: 0.65 }}>
            © {new Date().getFullYear()} Galash Capital. All rights reserved.
          </div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: GREY_MID, opacity: 0.65 }}>
            Industrial Real Estate Investment
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <WhySmallBay />
      <Capabilities />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
