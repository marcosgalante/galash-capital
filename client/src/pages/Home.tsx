/*
 * GALASH CAPITAL — Home Page
 * Design: Modern Industrial Precision
 * Dark navy (#0F1C2E) + warm gold (#C9973B)
 * Sections: Nav → Hero → About → Why Small-Bay → Capabilities → Team → Contact → Footer
 */

import { useEffect, useRef, useState } from "react";

// ─── Image Assets ────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663426917592/VvzoS3oAhYEAPu2Zui9gx4/galash_hero_aerial-NVsCuaraMQKfcoYLND5rcR.webp";
const WAREHOUSE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663426917592/VvzoS3oAhYEAPu2Zui9gx4/galash_warehouse_interior-2eTduYmGNVTRpbeM2E9HMv.webp";
const SKYLINE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663426917592/VvzoS3oAhYEAPu2Zui9gx4/galash_skyline_industrial-NgisGRVGqJ8YCVUWNnM6Ww.webp";

// ─── Scroll Animation Hook ────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────
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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "oklch(0.18 0.04 245 / 0.97)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <GalashLogo />
          <div className="hidden sm:block" style={{ lineHeight: 1.2 }}>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.18em",
                color: "oklch(0.95 0.005 75)",
              }}
            >
              GALASH
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                color: "oklch(0.68 0.12 65)",
                textTransform: "uppercase",
              }}
            >
              CAPITAL
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(0.75 0.01 75)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "oklch(0.68 0.12 65)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "oklch(0.75 0.01 75)")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "oklch(0.18 0.04 245)",
              background: "oklch(0.68 0.12 65)",
              padding: "0.5rem 1.25rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background =
                "oklch(0.78 0.10 65)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background =
                "oklch(0.68 0.12 65)")
            }
          >
            Submit a Deal
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "oklch(0.95 0.005 75)" }}
        >
          <div
            style={{
              width: 22,
              height: 2,
              background: "currentColor",
              marginBottom: 5,
              transition: "transform 0.2s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "currentColor",
              marginBottom: 5,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "currentColor",
              transition: "transform 0.2s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "oklch(0.18 0.04 245 / 0.98)",
            borderTop: "1px solid oklch(1 0 0 / 10%)",
            padding: "1.5rem",
          }}
        >
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
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(0.75 0.01 75)",
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              marginTop: "1rem",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "oklch(0.18 0.04 245)",
              background: "oklch(0.68 0.12 65)",
              padding: "0.75rem 1.25rem",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Submit a Deal
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Galash Logo SVG ──────────────────────────────────────────────────────────
function GalashLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer square */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        stroke="oklch(0.68 0.12 65)"
        strokeWidth="3"
        fill="none"
      />
      {/* G letterform */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontWeight="600"
        fontSize="62"
        fill="oklch(0.68 0.12 65)"
      >
        G
      </text>
    </svg>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.18 0.04 245 / 0.65) 0%, oklch(0.18 0.04 245 / 0.55) 50%, oklch(0.18 0.04 245 / 0.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative container flex flex-col justify-center"
        style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "6rem" }}
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          {/* Label */}
          <div className="section-label mb-6">
            South Florida · Industrial Real Estate
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
              lineHeight: 1.05,
              color: "oklch(0.97 0.005 75)",
              maxWidth: "800px",
              marginBottom: "1.5rem",
            }}
          >
            Galash
            <br />
            <span
              style={{
                fontStyle: "italic",
                color: "oklch(0.68 0.12 65)",
              }}
            >
              Small-Bay Industrial
            </span>
            <br />
            Investments
          </h1>

          {/* Gold rule */}
          <div className="gold-rule mb-6" />

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "oklch(0.80 0.008 75)",
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Disciplined acquisition and active management of multi-tenant industrial
            properties across South Florida and the Southeast United States.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.18 0.04 245)",
                background: "oklch(0.68 0.12 65)",
                padding: "0.85rem 2rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background =
                  "oklch(0.78 0.10 65)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background =
                  "oklch(0.68 0.12 65)")
              }
            >
              Submit a Deal
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.95 0.005 75)",
                border: "1px solid oklch(1 0 0 / 30%)",
                padding: "0.85rem 2rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor =
                  "oklch(0.68 0.12 65)";
                (e.target as HTMLElement).style.color = "oklch(0.68 0.12 65)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor =
                  "oklch(1 0 0 / 30%)";
                (e.target as HTMLElement).style.color = "oklch(0.95 0.005 75)";
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{
          transform: "translateX(-50%)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, oklch(0.68 0.12 65), transparent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "$50M+", label: "Equity Available" },
    { value: "$150M", label: "Target Asset Value" },
    { value: "24–36", label: "Month Deployment" },
    { value: "FL · TX · GA · NC · SC", label: "Target Markets" },
  ];

  return (
    <section
      style={{
        background: "oklch(0.68 0.12 65)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center md:text-left"
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid oklch(0.18 0.04 245 / 0.2)"
                    : "none",
                padding: "0.25rem 1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "1.75rem",
                  color: "oklch(0.18 0.04 245)",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "oklch(0.25 0.04 245)",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      style={{
        background: "oklch(0.22 0.04 245)",
        padding: "7rem 0",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <Reveal>
            <div className="section-label mb-4">About Galash Capital</div>
            <div className="gold-rule mb-8" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                lineHeight: 1.15,
                color: "oklch(0.95 0.005 75)",
                marginBottom: "1.5rem",
              }}
            >
              Technology-Driven{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.68 0.12 65)" }}>
                Industrial Real Estate
              </span>{" "}
              Investing
            </h2>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "oklch(0.75 0.01 75)",
                marginBottom: "1.25rem",
              }}
            >
              Galash Capital uses proprietary algorithms and technology to analyze
              markets, identify opportunities, and execute disciplined investments
              in small-bay industrial properties. Our data-driven approach allows
              us to move with conviction in fragmented markets where institutional
              capital has historically been absent.
            </p>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "oklch(0.75 0.01 75)",
              }}
            >
              With a focused mandate on multi-tenant small-bay, mid-bay, contractor
              garages, and office-flex properties, we bring institutional rigor to
              an asset class defined by local ownership and operational upside.
            </p>
          </Reveal>

          {/* Right: Image */}
          <Reveal delay={150}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <img
                src={WAREHOUSE_IMG}
                alt="Small-bay industrial warehouse interior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Gold accent border */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  width: "60%",
                  height: "60%",
                  border: "2px solid oklch(0.68 0.12 65)",
                  pointerEvents: "none",
                }}
              />
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
    {
      number: "01",
      title: "Strong Tenant Demand",
      body: "Small businesses, logistics operators, and service providers rely on flexible industrial space close to population centers — creating durable, diversified demand.",
    },
    {
      number: "02",
      title: "Fragmented Ownership",
      body: "The sector remains largely owned by small local landlords, creating acquisition opportunities for disciplined investors with institutional underwriting capabilities.",
    },
    {
      number: "03",
      title: "Limited New Supply",
      body: "Zoning constraints and rising land costs restrict the development of new small-bay properties, protecting existing assets from competitive oversupply.",
    },
    {
      number: "04",
      title: "Resilient Asset Class",
      body: "Diverse tenant bases and shorter lease terms allow rents to adjust more quickly to market conditions, providing natural inflation protection.",
    },
    {
      number: "05",
      title: "Operational Upside",
      body: "Active management and strategic improvements — from lease-up to capital improvements — can unlock meaningful additional value over the hold period.",
    },
    {
      number: "06",
      title: "Mission-Critical Space",
      body: "Small-bay tenants depend on their space to run their businesses. This operational necessity translates to strong retention and predictable cash flows.",
    },
  ];

  return (
    <section
      id="strategy"
      style={{
        background: "oklch(0.18 0.04 245)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image with heavy overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${SKYLINE_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.07,
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <Reveal>
          <div className="section-label mb-4">Investment Thesis</div>
          <div className="gold-rule mb-8" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.15,
              color: "oklch(0.95 0.005 75)",
              marginBottom: "1rem",
              maxWidth: "600px",
            }}
          >
            Why{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.68 0.12 65)" }}>
              Small-Bay Industrial
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "oklch(0.65 0.01 75)",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "4rem",
            }}
          >
            A resilient, essential, and under-institutionalized asset class that
            rewards disciplined operators with access to local market intelligence.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                style={{
                  background: "oklch(0.22 0.04 245)",
                  padding: "2.5rem",
                  height: "100%",
                  transition: "background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.26 0.035 245)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.22 0.04 245)";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "2.5rem",
                    color: "oklch(0.68 0.12 65 / 0.35)",
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {r.number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "oklch(0.95 0.005 75)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "oklch(0.65 0.01 75)",
                  }}
                >
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
  const caps = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: "Acquisitions",
      body: "Disciplined sourcing and underwriting of small-bay industrial assets in high-demand locations. We evaluate deals across South Florida and the broader Southeast with speed and conviction.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Research & Technology",
      body: "Data-driven insights powered by proprietary algorithms and market analysis. Our technology stack enables us to identify opportunities before they reach the open market.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Asset Management",
      body: "Hands-on oversight focused on leasing, tenant retention, and operational performance. We manage assets with the same rigor we apply to underwriting.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
      title: "Value Creation",
      body: "Executing strategies that unlock value through improvements, repositioning, and active management. We target assets with mark-to-market rent potential and expansion upside.",
    },
  ];

  return (
    <section
      id="capabilities"
      style={{
        background: "oklch(0.22 0.04 245)",
        padding: "7rem 0",
      }}
    >
      <div className="container">
        <Reveal>
          <div className="section-label mb-4">What We Do</div>
          <div className="gold-rule mb-8" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.15,
              color: "oklch(0.95 0.005 75)",
              marginBottom: "4rem",
              maxWidth: "500px",
            }}
          >
            Integrated{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.68 0.12 65)" }}>
              Capabilities
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {caps.map((cap, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: "oklch(0.26 0.035 245)",
                  padding: "3rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  transition: "background 0.3s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.30 0.035 245)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.26 0.035 245)";
                }}
              >
                <div
                  style={{
                    color: "oklch(0.68 0.12 65)",
                    flexShrink: 0,
                    marginTop: "0.2rem",
                  }}
                >
                  {cap.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.95 0.005 75)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      lineHeight: 1.75,
                      color: "oklch(0.65 0.01 75)",
                    }}
                  >
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
  const members = [
    {
      name: "Alberto Galante",
      title: "Principal",
      bio: "Alberto brings extensive experience in real estate investment and capital markets. He leads Galash Capital's overall strategy, investor relations, and platform development, drawing on a career spanning acquisitions, asset management, and portfolio construction across multiple asset classes.",
      linkedin: "https://www.linkedin.com/in/alberto-galante-70621238/",
      initials: "AG",
    },
    {
      name: "Marcos Galante",
      title: "Director of Acquisitions",
      bio: "Marcos oversees deal sourcing, underwriting, and transaction execution at Galash Capital. With deep roots in South Florida's industrial market and a data-driven approach to opportunity identification, he leads the firm's acquisition pipeline from initial screening through closing.",
      linkedin: "https://www.linkedin.com/in/marcosgalante/",
      initials: "MG",
    },
    {
      name: "Joseph Ashkenazi",
      title: "Principal",
      bio: "Joseph is a co-founder and Principal of Galash Capital, contributing expertise in real estate investment strategy, capital structuring, and operational oversight. He plays a central role in shaping the firm's investment thesis and building its institutional-grade platform.",
      linkedin: "https://www.linkedin.com/in/joseph-ashkenazi-07a27694/",
      initials: "JA",
    },
    {
      name: "Mayer Ashkenazi",
      title: "Director of Investor Relations",
      bio: "Mayer leads investor communications, capital raising, and relationship management at Galash Capital. He brings a background in financial services and a commitment to transparency, ensuring investors receive clear, timely reporting and a best-in-class experience throughout the investment lifecycle.",
      linkedin: "https://www.linkedin.com/in/mayer-ashkenazi-077579121/",
      initials: "MA",
    },
  ];

  return (
    <section
      id="team"
      style={{
        background: "oklch(0.18 0.04 245)",
        padding: "7rem 0",
      }}
    >
      <div className="container">
        <Reveal>
          <div className="section-label mb-4">Leadership</div>
          <div className="gold-rule mb-8" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.15,
              color: "oklch(0.95 0.005 75)",
              marginBottom: "4rem",
            }}
          >
            The{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.68 0.12 65)" }}>
              Team
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: "oklch(0.22 0.04 245)",
                  padding: "2.5rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.26 0.035 245)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.22 0.04 245)";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "oklch(0.68 0.12 65 / 0.15)",
                    border: "1px solid oklch(0.68 0.12 65 / 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "oklch(0.68 0.12 65)",
                    }}
                  >
                    {m.initials}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 600,
                          fontSize: "1.3rem",
                          color: "oklch(0.95 0.005 75)",
                          lineHeight: 1.2,
                        }}
                      >
                        {m.name}
                      </h3>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "oklch(0.68 0.12 65)",
                          marginTop: "0.2rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {m.title}
                      </div>
                    </div>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "oklch(0.55 0.01 75)",
                        transition: "color 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "oklch(0.68 0.12 65)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "oklch(0.55 0.01 75)")
                      }
                      title={`${m.name} on LinkedIn`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      color: "oklch(0.62 0.01 75)",
                    }}
                  >
                    {m.bio}
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

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const mailtoLink = `mailto:marcos@galashcapital.com?subject=${encodeURIComponent(form.subject || "Deal Submission")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "oklch(0.26 0.035 245)",
    border: "1px solid oklch(1 0 0 / 10%)",
    color: "oklch(0.95 0.005 75)",
    padding: "0.85rem 1rem",
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 300,
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        background: "oklch(0.22 0.04 245)",
        padding: "7rem 0",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <Reveal>
            <div className="section-label mb-4">Get In Touch</div>
            <div className="gold-rule mb-8" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                lineHeight: 1.15,
                color: "oklch(0.95 0.005 75)",
                marginBottom: "1.5rem",
              }}
            >
              Submit a{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.68 0.12 65)" }}>
                Deal
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "oklch(0.65 0.01 75)",
                marginBottom: "3rem",
              }}
            >
              We review every submission and respond promptly. Whether you're a
              broker, owner, or intermediary, we welcome the opportunity to evaluate
              your deal.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <ContactDetail
                label="Email"
                value="marcos@galashcapital.com"
                href="mailto:marcos@galashcapital.com"
              />
              <ContactDetail
                label="Miami"
                value="+1 (754) 777-7959"
                href="tel:+17547777959"
              />
              <ContactDetail
                label="Mexico City"
                value="Bosque de Ciruelos 160, Mexico City, MX 11700"
              />
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={150}>
            {submitted ? (
              <div
                style={{
                  background: "oklch(0.26 0.035 245)",
                  padding: "3rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "400px",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: "2px solid oklch(0.68 0.12 65)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="oklch(0.68 0.12 65)"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: "oklch(0.95 0.005 75)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Message Sent
                </h3>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "oklch(0.65 0.01 75)",
                  }}
                >
                  We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="section-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "oklch(0.68 0.12 65)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "oklch(1 0 0 / 10%)")
                      }
                    />
                  </div>
                  <div>
                    <label className="section-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "oklch(0.68 0.12 65)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "oklch(1 0 0 / 10%)")
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="section-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle}
                    placeholder="e.g. Deal Submission — Miami Flex Industrial"
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "oklch(0.68 0.12 65)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "oklch(1 0 0 / 10%)")
                    }
                  />
                </div>
                <div>
                  <label className="section-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Tell us about the property — location, size, asking price, and any relevant details."
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "oklch(0.68 0.12 65)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        "oklch(1 0 0 / 10%)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "oklch(0.18 0.04 245)",
                    background: "oklch(0.68 0.12 65)",
                    padding: "1rem 2rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "oklch(0.78 0.10 65)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "oklch(0.68 0.12 65)")
                  }
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

function ContactDetail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "oklch(0.68 0.12 65)",
          paddingTop: "0.15rem",
          minWidth: "80px",
        }}
      >
        {label}
      </div>
      {href ? (
        <a
          href={href}
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "oklch(0.80 0.008 75)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "oklch(0.68 0.12 65)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "oklch(0.80 0.008 75)")
          }
        >
          {value}
        </a>
      ) : (
        <span
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "oklch(0.80 0.008 75)",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.14 0.035 245)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <GalashLogo size={32} />
            <div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  color: "oklch(0.95 0.005 75)",
                }}
              >
                GALASH CAPITAL
              </div>
              <div
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  color: "oklch(0.50 0.01 75)",
                  marginTop: "0.1rem",
                }}
              >
                Small-Bay Industrial Investments
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["About", "Strategy", "Capabilities", "Team", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.50 0.01 75)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "oklch(0.68 0.12 65)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "oklch(0.50 0.01 75)")
                  }
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Copyright */}
          <div
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              color: "oklch(0.45 0.01 75)",
            }}
          >
            © {new Date().getFullYear()} Galash Capital. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 245)" }}>
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <WhySmallBay />
      <Capabilities />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
