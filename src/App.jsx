import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiExternalLink, FiSend } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiPostgresql, SiTailwindcss, SiTypescript, SiPython, SiJavascript, SiNextdotjs, SiDocker, SiKubernetes, SiFigma, SiTensorflow } from "react-icons/si";
import emailjs from '@emailjs/browser';

// ── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
function useBreakpoint() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const fn = () => setWidth(window.innerWidth);
      window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }, []);
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      width,
    };
  }

// ── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#080808",
  surface: "#0f0f0f",
  card: "#131313",
  cardHover: "#191919",
  border: "#1e1e1e",
  borderHover: "#2e2e2e",
  red: "#C73D4C",
  redDark: "#8B1A24",
  redGlow: "rgba(199,61,76,0.15)",
  redGlowStrong: "rgba(199,61,76,0.35)",
  white: "#f0ece6",
  muted: "#555",
  dim: "#333",
}


// ── MARQUEE ────────────────────────────────────────────────────────────────────
function Marquee({ text, speed = 30, color = C.red, size = "clamp(5rem,12vw,10rem)", bottom = 0 }) {
  const repeated = Array(8).fill(text).join("  ·  ");
  return (
    <div style={{
      position: "absolute", bottom, left: 0, right: 0,
      overflow: "hidden", pointerEvents: "none",
      borderTop: `1px solid ${C.border}`,
    }}>
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{
          display: "flex", whiteSpace: "nowrap",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size,
          color,
          letterSpacing: "0.05em",
          lineHeight: 1,
          padding: "0.1em 0",
          userSelect: "none",
          opacity: 0.18,
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isMobile } = useBreakpoint();
  
    useEffect(() => {
      const fn = () => setScrolled(window.scrollY > 60);
      window.addEventListener("scroll", fn);
      return () => window.removeEventListener("scroll", fn);
    }, []);
  
    return (
      <>
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0,
            zIndex: 1000,
            padding: isMobile ? "1rem 1.25rem" : "1rem 2.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: scrolled ? "rgba(8,8,8,0.9)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? `1px solid ${C.border}` : "none",
            transition: "background 0.4s, backdrop-filter 0.4s, border 0.4s",
          }}
        >
          <motion.span
            whileHover={{ color: C.red }}
            style={{ fontFamily: "'Bebas Neue'", fontSize: "1.5rem", letterSpacing: "0.12em", cursor: "pointer", transition: "color 0.2s" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            OT
          </motion.span>
  
          {isMobile ? (
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.white, fontSize: "1.5rem", padding: "0.25rem",
                display: "flex", flexDirection: "column", gap: "5px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={menuOpen ? {
                    rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                    y: i === 0 ? 8 : i === 2 ? -8 : 0,
                    opacity: i === 1 ? 0 : 1,
                  } : { rotate: 0, y: 0, opacity: 1 }}
                  style={{
                    display: "block", width: 24, height: 1.5,
                    background: C.white, borderRadius: 2,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.button>
          ) : (
            <div style={{ display: "flex", gap: "2rem" }}>
              {["About", "Projects", "Contact"].map((s) => (
                <motion.a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  whileHover={{ color: C.red }}
                  style={{
                    color: C.white, textDecoration: "none",
                    fontFamily: "'Space Mono'", fontSize: "0.75rem",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
          )}
        </motion.nav>
  
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "fixed", top: "60px", left: 0, right: 0,
                zIndex: 999,
                background: "rgba(8,8,8,0.97)",
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${C.border}`,
                padding: "1.5rem",
                display: "flex", flexDirection: "column", gap: "1.5rem",
              }}
            >
              {["About", "Projects", "Contact"].map((s) => (
                <motion.a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ x: 6, color: C.red }}
                  style={{
                    color: C.white, textDecoration: "none",
                    fontFamily: "'Bebas Neue'", fontSize: "2rem",
                    letterSpacing: "0.15em",
                    transition: "color 0.2s",
                  }}
                >
                  {s}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

// ── HERO SECTION ───────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: "relative", height: "100vh", overflow: "hidden",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        background: C.bg,
      }}
    >
      {/* Background red glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 70% at 50% 100%, ${C.redGlow} 0%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Scrolling name BEHIND image */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: "1rem", overflow: "hidden", opacity: 0.12,
          height: "100%",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <motion.div
            key={i}
            animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 18 + i * 3, ease: "linear" }}
            style={{
              fontFamily: "'Bebas Neue', 'Noto Sans Devanagari', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Arabic', sans-serif",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              color: C.white,
              lineHeight: 1.1,
              width: "max-content",
              minWidth: "200vw",
            }}
          >
            流れ  ·  प्रवाह  ·  FLOW  ·  흐름  ·  تدفق  ·  流れ  ·  प्रवाह  ·  FLOW  ·  흐름  ·  تدفق  ·  流れ  ·  प्रवाह  ·  FLOW  ·  흐름  ·  تدفق  ·
          </motion.div>
        ))}
      </motion.div>

      {/* Anime image — full height, centered */}
      <motion.div
  style={{
    position: "absolute",
    inset: 0,
    zIndex: 2,
    y: imageY,
    scale: imageScale,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  }}
>
<img
  src="/anime.svg"
  alt="Om Thote"
  style={{
    height: "100%",          // ✅ big screens stay full height
    width: "auto",
    maxWidth: "min(90vw, 100%)",  // ✅ prevents shrinking on desktop
    objectFit: "contain",
    objectPosition: "bottom center",
    userSelect: "none",
    filter: "drop-shadow(0 0 60px rgba(199,61,76,0.25))",
  }}
/>
</motion.div>

      {/* Overlay gradient at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "35%",
        background: `linear-gradient(to top, ${C.bg} 0%, transparent 100%)`,
        zIndex: 3, pointerEvents: "none",
      }} />

      {/* Bottom text */}
      <motion.div
        style={{
          position: "relative", zIndex: 4,
          textAlign: "center", paddingBottom: "1rem",
          y: textY, opacity,
        }}
      >
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: "clamp(2.5rem, 8vw, 8rem)",
            letterSpacing: "0.06em",
            lineHeight: 0.9,
            color: C.white,
            textShadow: "0px 8px 25px rgba(0,0,0,0.5)",
          }}
        >
          Om Thote
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: "'Space Mono'", 
            fontSize: "clamp(0.65rem, 2vw, 0.9rem)", // responsive
            letterSpacing: "clamp(0.15em, 0.8vw, 0.3em)",
            color: C.white, backgroundColor: C.red,
            textTransform: "uppercase", marginBottom: "0.75rem",
            textShadow: "0px 8px 25px rgba(0,0,0,1)",
          }}
        >
          Full Stack Developer · AI/ML Engineer
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            display: "flex", gap: "1.5rem", justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          {[
            { icon: <FiGithub />, href: "https://github.com/Om-Thote", label: "GitHub" },
            { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/om-thote/", label: "LinkedIn" },
            { icon: <FiMail />, href: "mailto:omthote24@gmail.com", label: "Email" },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, color: C.red }}
              style={{
                color: C.white, fontSize: "1.3rem",
                display: "flex", alignItems: "center",
                transition: "color 0.2s",
              }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ marginTop: "2.5rem" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: C.muted, fontSize: "0.8rem", letterSpacing: "0.2em" }}
          >
            SCROLL ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── FADE-IN WRAPPER ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── SECTION HEADING ───────────────────────────────────────────────────────────
function SectionHeading({ label, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: "3rem" }}>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Space Mono'", fontSize: "0.7rem",
          letterSpacing: "0.3em", color: C.red,
          textTransform: "uppercase", marginBottom: "0.5rem",
        }}
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "'Syne'", fontWeight: 900,
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "-0.02em", lineHeight: 1,
          color: C.white,
        }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
// -- Lightning -------------------------------------------------------------
function Lightning() {
    const [bolts, setBolts] = useState([]);
  
    const generateBranch = (startX, startY, angle, depth, maxDepth, segmentLength) => {
      if (depth > maxDepth) return [];
      
      const points = [[startX, startY]];
      let currentX = startX;
      let currentY = startY;
      let currentAngle = angle;
      const segments = 3 + Math.floor(Math.random() * 4);
  
      for (let i = 0; i < segments; i++) {
        currentAngle += (Math.random() - 0.5) * 35;
        const len = segmentLength * (0.7 + Math.random() * 0.6);
        currentX += Math.sin((currentAngle * Math.PI) / 180) * len;
        currentY += Math.cos((currentAngle * Math.PI) / 180) * len;
        currentX = Math.max(0, Math.min(100, currentX));
        points.push([currentX, currentY]);
        if (currentY >= 100) break;
        if (Math.random() < 0.3 && depth < maxDepth && i > 0) break;
      }
  
      const pathD = points
        .map(([px, py], i) => `${i === 0 ? "M" : "L"} ${px} ${py}`)
        .join(" ");
  
      const branches = [];
      // spawn child branches off random points along this path
      for (let i = 1; i < points.length - 1; i++) {
        if (Math.random() < 0.45) {
          const branchAngle = currentAngle + (Math.random() < 0.5 ? 1 : -1) * (25 + Math.random() * 35);
          const childBranches = generateBranch(
            points[i][0], points[i][1],
            branchAngle,
            depth + 1,
            maxDepth,
            segmentLength * 0.55
          );
          branches.push(...childBranches);
        }
      }
  
      return [{ pathD, depth }, ...branches];
    };
  
    const generateBolt = (id) => {
      const startX = 10 + Math.random() * 80;
      const startAngle = (Math.random() - 0.5) * 20; // mostly downward, slight tilt
      const maxDepth = 3;
      const segmentLength = 8 + Math.random() * 6;
      const paths = generateBranch(startX, 0, startAngle, 0, maxDepth, segmentLength);
  
      return {
        id,
        paths,
        duration: 0.15 + Math.random() * 0.12,
        flashCount: 2 + Math.floor(Math.random() * 3),
      };
    };
  
    useEffect(() => {
      let timers = [];
      let idCounter = 0;
  
      const spawnBolt = () => {
        const id = idCounter++;
        setBolts([generateBolt(id)]);
      
        // remove after flash is done
        const removeTimer = setTimeout(() => {
          setBolts([]);
        }, 900);
        timers.push(removeTimer);
      
        // next bolt after 2–3.5 sec gap
        const next = 1000 + Math.random() * 1500;
        const spawnTimer = setTimeout(spawnBolt, next);
        timers.push(spawnTimer);
      };
      
      // single starter
      const t = setTimeout(spawnBolt, 500);
      timers.push(t);
  
      return () => timers.forEach(clearTimeout);
    }, []);
  
    return (
      <div style={{
        position: "absolute", inset: 0,
        overflow: "hidden", pointerEvents: "none", zIndex: 0,
      }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="lg1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lg2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
  
          <AnimatePresence>
            {bolts.map((bolt) => (
              <motion.g key={bolt.id}>
                {bolt.paths.map((p, i) => {
                  const isMain = p.depth === 0;
                  const opacity = isMain ? 1 : Math.max(0.3, 1 - p.depth * 0.25);
                  const glowWidth = isMain ? 1.8 : Math.max(0.6, 1.4 - p.depth * 0.3);
                  const coreWidth = isMain ? 0.35 : Math.max(0.1, 0.28 - p.depth * 0.06);
  
                  return (
                    <motion.g key={i}>
                      {/* Outer wide glow */}
                      <motion.path
                        d={p.pathD}
                        stroke={`rgba(199,61,76,${0.35 * opacity})`}
                        strokeWidth={glowWidth * 2.2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#lg1)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, opacity, 0, opacity * 0.7, 0, opacity * 0.4, 0] }}
                        transition={{
                          duration: bolt.duration * bolt.flashCount,
                          times: [0, 0.1, 0.25, 0.45, 0.6, 0.8, 1],
                          ease: "easeOut",
                        }}
                      />
                      {/* Inner glow */}
                      <motion.path
                        d={p.pathD}
                        stroke={`rgba(230,100,110,${0.6 * opacity})`}
                        strokeWidth={glowWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#lg2)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, opacity, 0, opacity * 0.7, 0, opacity * 0.4, 0] }}
                        transition={{
                          duration: bolt.duration * bolt.flashCount,
                          times: [0, 0.1, 0.25, 0.45, 0.6, 0.8, 1],
                          ease: "easeOut",
                        }}
                      />
                      {/* Sharp bright core */}
                      <motion.path
                        d={p.pathD}
                        stroke={`rgba(255,220,225,${0.95 * opacity})`}
                        strokeWidth={coreWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 0.8, 0, 0.5, 0] }}
                        transition={{
                          duration: bolt.duration * bolt.flashCount,
                          times: [0, 0.1, 0.25, 0.45, 0.6, 0.8, 1],
                          ease: "easeOut",
                        }}
                      />
                    </motion.g>
                  );
                })}
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>
      </div>
    );
  }
// ── BENTO CARD ─────────────────────────────────────────────────────────────────
function BentoCard({ children, style = {}, glowOnHover = false, span = 1 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      data-hover
      style={{
        background: C.card,
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        borderRadius: "16px",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered && glowOnHover ? `0 0 40px ${C.redGlow}` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
        gridColumn: `span ${span}`,
        ...style,
      }}
    >
      {hovered && glowOnHover && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 30% 30%, ${C.redGlow}, transparent 70%)`,
          pointerEvents: "none", zIndex: 0,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ── SKILL TAG ──────────────────────────────────────────────────────────────────
function Tag({ children, accent = false }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, borderColor: C.red }}
      style={{
        display: "inline-block",
        padding: "0.25rem 0.65rem",
        borderRadius: "6px",
        border: `1px solid ${accent ? C.red : C.border}`,
        background: accent ? `${C.redGlow}` : "transparent",
        fontFamily: "'Space Mono'",
        fontSize: "0.68rem",
        color: accent ? C.red : C.muted,
        letterSpacing: "0.05em",
        cursor: "default",
        transition: "border-color 0.2s",
      }}
    >
      {children}
    </motion.span>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
function About() {

  const { isMobile, isTablet } = useBreakpoint();
  const skills = {
    "Languages": ["Java", "Python"],
    "Web Dev": ["JavaScript", "TypeScript", "React.js", "Next.js", "Express.js"],
    "Tools": ["Git", "TailwindCSS", "Figma", "Framer", "Docker"],
    "Databases": ["SQL", "MongoDB", "PostgreSQL"],
    "AI / ML": ["Machine Learning", "Deep Learning", "Generative AI", "Flask", "Django", "TensorFlow"],
    "DevOps": ["CI/CD", "Linux", "Kubernetes", "Prisma", "Auth", "ZOD", "REST APIs", "JWT"],
  };

  const certs = [
    { title: "DevOps Fundamentals", issuer: "IBM" },
    { title: "Cloud Foundation", issuer: "AWS" },
    { title: "SQL Intermediate", issuer: "HackerRank" },
    { title: "Open Source Contributor", issuer: "Zulip" },
  ];

  const edu = [
    { deg: "Computer Science (AIML)", inst: "MIT ADT University", grade: "CGPA 7.5", year: "2025" },
    { deg: "XII — CBSE", inst: "The Jain International", grade: "93%", year: "2021" },
  ];

  const techIcons = [
    { icon: <SiReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiNodedotjs />, name: "Node" },
    { icon: <SiTypescript />, name: "TS" },
    { icon: <SiJavascript />, name: "JS" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPostgresql />, name: "Postgres" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiKubernetes />, name: "K8s" },
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiTensorflow />, name: "TF" },
  ];
  
  
  return (
    <section id="about" style={{ padding: isMobile ? "5rem 1.25rem" : "8rem 2.5rem", maxWidth: "1200px", margin: "0 auto", position: "relative",
    overflow: "hidden",  }}>
      <Lightning />
      <SectionHeading label="01 — About Me" title="Who I Am" />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
        gap: "1rem",
      }}> 

        {/* Intro card — wide */}
        <FadeIn style={{ gridColumn: isMobile ? "1/-1" : isTablet ? "1/-1" : "span 8" }}>
          <BentoCard glowOnHover style={{ height: "100%" }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.25em", color: C.red, marginBottom: "1rem", textTransform: "uppercase" }}>
              Full Stack Developer · AI/ML Engineer
            </p>
            <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.7rem)", lineHeight: 1.4, color: C.white, marginBottom: "1.25rem" }}>
              I build fast, scalable web apps and intelligent systems — from pixel-perfect UIs to ML-powered backends.
            </p>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.78rem", lineHeight: 1.9, color: C.muted }}>
              Recent CS (AIML) graduate from MIT ADT University. I love solving hard problems at the intersection of web and AI. Currently building projects that merge modern frontend aesthetics with intelligent backends.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <motion.a
                href="mailto:omthote24@gmail.com"
                whileHover={{ scale: 1.03, backgroundColor: C.redDark }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: C.red, color: C.white,
                  padding: "0.6rem 1.25rem", borderRadius: "8px",
                  textDecoration: "none", fontFamily: "'Space Mono'",
                  fontSize: "0.72rem", letterSpacing: "0.08em",
                  transition: "background 0.2s",
                }}
              >
                <FiMail /> omthote24@gmail.com
              </motion.a>
              <motion.a
                href="tel:+918554971288"
                whileHover={{ borderColor: C.red, color: C.red }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  border: `1px solid ${C.border}`, color: C.muted,
                  padding: "0.6rem 1.25rem", borderRadius: "8px",
                  textDecoration: "none", fontFamily: "'Space Mono'",
                  fontSize: "0.72rem", letterSpacing: "0.08em",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <FiPhone /> +91 8554971288
              </motion.a>
            </div>
          </BentoCard>
        </FadeIn>

        {/* Social / quick links */}
        <FadeIn delay={0.1} style={{
           gridColumn: isMobile ? "1/-1" : isTablet ? "1/-1" : "span 4" }}>
          <BentoCard glowOnHover style={{ height: "100%" }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.red, marginBottom: "1rem", textTransform: "uppercase" }}>Links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: <FiGithub />, label: "GitHub", href: "https://github.com/Om-Thote" },
                { icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/om-thote/" },
                { icon: <FiMail />, label: "Email", href: "mailto:omthote24@gmail.com" },
              ].map(({ icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: C.red }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    color: C.muted, textDecoration: "none",
                    fontFamily: "'Space Mono'", fontSize: "0.8rem",
                    transition: "color 0.2s",
                  }}
                >
                  {icon} {label} <FiExternalLink style={{ marginLeft: "auto", opacity: 0.4 }} />
                </motion.a>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", color: C.muted, letterSpacing: "0.1em" }}>Based in</p>
              <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "1rem", color: C.white, marginTop: "0.25rem" }}>India 🇮🇳</p>
            </div>
          </BentoCard>
        </FadeIn>

        {/* Tech Icons orbit / grid */}
        <FadeIn delay={0.15} style={{
          gridColumn: isMobile ? "1/-1" : isTablet ? "span 1" : "span 5" }}>
          <BentoCard glowOnHover style={{ minHeight: "240px" }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.red, marginBottom: "1rem", textTransform: "uppercase" }}>Tech Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
              {techIcons.map(({ icon, name }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.2, color: C.red }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: "0.3rem", color: C.muted, fontSize: "1.4rem",
                    cursor: "default", transition: "color 0.2s",
                  }}
                >
                  {icon}
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "0.55rem", letterSpacing: "0.05em" }}>{name}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={0.2} style={{
          gridColumn: isMobile ? "1/-1" : isTablet ? "span 1" : "span 7" }}>
          <BentoCard glowOnHover style={{ minHeight: "220px" }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.red, marginBottom: "1rem", textTransform: "uppercase" }}>Education</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {edu.map((e) => (
                <div key={e.inst} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: C.red, marginTop: "0.4rem", flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "1rem", color: C.white }}>{e.deg}</p>
                    <p style={{ fontFamily: "'Space Mono'", fontSize: "0.72rem", color: C.muted, marginTop: "0.2rem" }}>{e.inst}</p>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.4rem" }}>
                      <Tag accent>{e.grade}</Tag>
                      <Tag>{e.year}</Tag>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </FadeIn>

        {/* Skills grid — full width */}
        {Object.entries(skills).map(([cat, tags], i) => (
          <FadeIn key={cat} delay={0.05 * i} style={{
            gridColumn: isMobile ? "1/-1" : isTablet ? "span 1" : "span 6" }}>
            <BentoCard glowOnHover style={{ height: "auto", minHeight: "unset" }}>
              <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.red, marginBottom: "0.75rem", textTransform: "uppercase" }}>{cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </BentoCard>
          </FadeIn>
        ))}

        {/* Certs */}
        <FadeIn delay={0.3} style={{ gridColumn: "1/-1" }}>
          <BentoCard glowOnHover style={{ minHeight: "180px" }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.red, marginBottom: "1rem", textTransform: "uppercase" }}>Certificates & Contributions</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
              {certs.map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={{ borderColor: C.red, background: C.redGlow }}
                  style={{
                    padding: "0.875rem 1rem", borderRadius: "10px",
                    border: `1px solid ${C.border}`,
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "0.9rem", color: C.white }}>{c.title}</p>
                  <p style={{ fontFamily: "'Space Mono'", fontSize: "0.68rem", color: C.red, marginTop: "0.25rem" }}>{c.issuer}</p>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </FadeIn>

      </div>
    </section>
  );
}
// ── PROJECTS SECTION ───────────────────────────────────────────────────────────
function Projects() {

  const { isMobile, isTablet } = useBreakpoint();

  const projects = [
    {
      name: "BrainLink",
      emoji: "⚡",
      subtitle: "Social Profile Dashboard",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      highlights: [
        "Centralized social profile dashboard — 50% better link-sharing",
        "Responsive UI cutting mobile bounce rates by 35%",
        "Real-time MongoDB link updates — 60% faster profile edits",
        "JWT-secured backend API — 99.9% uptime",
      ],
      links: { live: "https://brainlink-frontend.onrender.com", github: "https://github.com/Om-Thote/BrainLink-Frontend" },
      color: "#C73D4C",
      span: 7,
    },
    {
      name: "PoseFit",
      emoji: "⚡",
      subtitle: "Real-time Posture Detection",
      stack: ["React.js", "TensorFlow.js", "BlazePose", "HTML5"],
      highlights: [
        "90%+ pose detection accuracy with BlazePose",
        "95% user satisfaction with live pose visualization",
        "25% lower memory via lightweight ML models",
      ],
      links: { github: "https://github.com/Om-Thote/desktop-notifier-python" },
      color: "#C73D4C",
      span: 5,
    },
    {
        name: "Mini Projects",
        emoji: "⚡",
        subtitle: "Quick Builds",
        stack: ["Framer Motion", "WebSockets", "React"],
        highlights: [
          "Sticky Notes — animated drag with Framer Motion",
          "Real-time Chat App — WebSocket powered",
        ],
        links: { github: "https://github.com/Om-Thote/websocket-chatapp" },
        color: "#C73D4C",
        span: 5,
      },
    {
      name: "Personal Finance Tracker",
      emoji: "⚡",
      subtitle: "Browser-based Expense Manager",
      stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
      highlights: [
        "45% better budgeting accuracy",
        "Linear regression for future savings prediction (+30% insights)",
        "40% faster load via optimized DOM rendering",
      ],
      links: { github: "https://github.com/Om-Thote/personal-finance-tracker" },
      color: "#C73D4C",
      span: 7,
    },
  ];

  return (
    <section id="projects" style={{
      padding: isMobile ? "5rem 1.25rem" : "8rem 2.5rem",
      maxWidth: "1200px", margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <Lightning />
      <SectionHeading label="02 — Projects" title="What I've Built" />

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
        gap: "1rem",
      }}>
        {projects.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.08} style={{
            gridColumn: isMobile ? "1/-1" : isTablet ? "span 1" : `span ${p.span}`, }}>
            <ProjectCard project={p} index={i} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.012, y: -4 }}
      transition={{ duration: 0.25 }}
      data-hover
      style={{
        background: C.card,
        border: `1px solid ${hovered ? C.red : C.border}`,
        borderRadius: "20px",
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        transition: "border-color 0.3s",
        boxShadow: hovered ? `0 0 50px ${C.redGlow}` : "none",
      }}
    >
      {/* bg number */}
      <span style={{
        position: "absolute", right: "1.25rem", top: "1rem",
        fontFamily: "'Bebas Neue'", fontSize: "5rem",
        color: C.border, lineHeight: 1,
        transition: "color 0.3s",
        color: hovered ? "rgba(199,61,76,0.12)" : C.border,
      }}>
        0{index + 1}
      </span>

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 10% 10%, rgba(199,61,76,0.1), transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.5rem" }}>{p.emoji}</span>
          <h3 style={{
            fontFamily: "'Syne'", fontWeight: 900,
            fontSize: "1.3rem", color: C.white,
          }}>
            {p.name}
          </h3>
        </div>
        <p style={{ fontFamily: "'Space Mono'", fontSize: "0.68rem", color: C.red, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
          {p.subtitle}
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.25rem" }}>
          {p.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                fontFamily: "'Space Mono'", fontSize: "0.72rem",
                color: C.muted, lineHeight: 1.6,
                display: "flex", gap: "0.5rem",
              }}
            >
              <span style={{ color: C.red, flexShrink: 0 }}>›</span>
              {h}
            </motion.li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {p.links.live && (
            <motion.a
              href={p.links.live}
              whileHover={{ scale: 1.04, backgroundColor: C.redDark }}
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                background: C.red, color: C.white,
                padding: "0.4rem 0.9rem", borderRadius: "6px",
                textDecoration: "none", fontFamily: "'Space Mono'",
                fontSize: "0.65rem", letterSpacing: "0.08em",
                transition: "background 0.2s",
              }}
            >
              <FiExternalLink /> Live
            </motion.a>
          )}
          {p.links.github && (
            <motion.a
              href={p.links.github}
              whileHover={{ borderColor: C.red, color: C.white }}
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                border: `1px solid ${C.border}`, color: C.muted,
                padding: "0.4rem 0.9rem", borderRadius: "6px",
                textDecoration: "none", fontFamily: "'Space Mono'",
                fontSize: "0.65rem", letterSpacing: "0.08em",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <FiGithub /> GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── CONTACT SECTION ────────────────────────────────────────────────────────────
function Contact() {

    const { isMobile } = useBreakpoint();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [focused, setFocused] = useState(null);
  
    const inputStyle = (field) => ({
      background: C.surface,
      border: `1px solid ${focused === field ? C.red : C.border}`,
      borderRadius: "10px",
      padding: "0.85rem 1rem",
      color: C.white,
      fontFamily: "'Space Mono'",
      fontSize: "0.8rem",
      width: "100%",
      outline: "none",
      transition: "border-color 0.2s",
      resize: field === "message" ? "vertical" : "none",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("sending");
  
      try {
        await emailjs.send(
          "service_zhhwbcm",       // ← replace
          "template_e9janeg",      // ← replace
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          "ES4y9DXEbwaZIbGIF"        // ← replace
        );
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    };
  
    return (
      <section id="contact" style={{
        padding: isMobile ? "5rem 1.25rem 4rem" : "8rem 2.5rem 6rem",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(to bottom, ${C.bg} 0%, #0c0608 100%)`,
      }}>
        <Lightning />
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 100%, rgba(199,61,76,0.08), transparent 70%)`,
          pointerEvents: "none",
        }} />
  
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeading label="03 — Contact" title="Let's Work Together" />
  
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
            gap: "1.5rem",
            alignItems: "start",
          }}>
            {/* Left info */}
            <FadeIn>
              <BentoCard style={{ height: "100%" }}>
                <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "1.1rem", color: C.white, marginBottom: "0.5rem" }}>
                  Open to opportunities
                </p>
                <p style={{ fontFamily: "'Space Mono'", fontSize: "0.72rem", color: C.muted, lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Looking for full-stack or AI/ML roles. Let's build something great together.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { icon: <FiMail />, val: "omthote24@gmail.com" },
                    { icon: <FiPhone />, val: "+91 8554971288" },
                    { icon: <FiGithub />, val: "github.com/omthote24" },
                    { icon: <FiLinkedin />, val: "linkedin.com/in/omthote24" },
                  ].map(({ icon, val }) => (
                    <div key={val} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: C.muted, fontFamily: "'Space Mono'", fontSize: "0.68rem" }}>
                      <span style={{ color: C.red }}>{icon}</span> {val}
                    </div>
                  ))}
                </div>
              </BentoCard>
            </FadeIn>
  
            {/* Form */}
            <FadeIn delay={0.15}>
              <BentoCard glowOnHover>
                <AnimatePresence mode="wait">
  
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ textAlign: "center", padding: "2rem 0" }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.4 }}
                        style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
                      >
                        ✅
                      </motion.div>
                      <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "1.1rem", color: C.white }}>
                        Message sent!
                      </p>
                      <p style={{ fontFamily: "'Space Mono'", fontSize: "0.72rem", color: C.muted, marginTop: "0.5rem" }}>
                        I'll get back to you soon.
                      </p>
                    </motion.div>
                  )}
  
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ textAlign: "center", padding: "2rem 0" }}
                    >
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>❌</div>
                      <p style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "1.1rem", color: C.white }}>
                        Something went wrong
                      </p>
                      <p style={{ fontFamily: "'Space Mono'", fontSize: "0.72rem", color: C.muted, marginTop: "0.5rem" }}>
                        Try emailing me directly at omthote24@gmail.com
                      </p>
                    </motion.div>
                  )}
  
                  {(status === "idle" || status === "sending") && (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
                    >
                      <div>
                        <label style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", color: C.muted, letterSpacing: "0.15em", display: "block", marginBottom: "0.4rem", textTransform: "uppercase" }}>Name</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Your name"
                          style={inputStyle("name")}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", color: C.muted, letterSpacing: "0.15em", display: "block", marginBottom: "0.4rem", textTransform: "uppercase" }}>Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="your@email.com"
                          style={inputStyle("email")}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "'Space Mono'", fontSize: "0.65rem", color: C.muted, letterSpacing: "0.15em", display: "block", marginBottom: "0.4rem", textTransform: "uppercase" }}>Message</label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          placeholder="Tell me about your project..."
                          style={inputStyle("message")}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: status === "sending" ? 1 : 1.02, backgroundColor: "#a02030" }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          gap: "0.5rem",
                          background: status === "sending" ? C.redDark : C.red,
                          color: C.white,
                          padding: "0.85rem 1.5rem", borderRadius: "10px",
                          border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                          fontFamily: "'Space Mono'", fontSize: "0.8rem",
                          letterSpacing: "0.1em", fontWeight: 700,
                          transition: "background 0.2s",
                          marginTop: "0.25rem",
                          opacity: status === "sending" ? 0.7 : 1,
                        }}
                      >
                        {status === "sending" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              style={{ width: 14, height: 14, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <><FiSend /> Send Message</>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
  
                </AnimatePresence>
              </BentoCard>
            </FadeIn>
          </div>
        </div>
  
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            fontFamily: "'Space Mono'", fontSize: "0.68rem",
            color: C.dim, letterSpacing: "0.1em",
            borderTop: `1px solid ${C.border}`, paddingTop: "2rem",
            maxWidth: "1200px", margin: "5rem auto 0",
          }}
        >
          <p>Designed & built by <span style={{ color: C.red }}>Om Thote</span> · 2026</p>
          <p style={{ marginTop: "0.4rem", opacity: 0.5 }}>React.js · Framer Motion</p>
        </motion.div>
      </section>
    );
  }

// ── ROOT APP ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <About />
      </div>
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <Projects />
      </div>
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <Contact />
      </div>
    </div>
  );
}