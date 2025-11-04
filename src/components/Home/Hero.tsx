import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import JaliButton from "../ui/JaliButton";

const GAP_FACTOR = 1;
const MOBILE_SIZE_SCALE = 0.58;
const MOBILE_RAILS_COUNT = 6;

const AVATARS = Array.from(
  { length: 30 },
  (_, i) => `/images/avatars/${(i % 18) + 1}.png`
);

type RailSpec = {
  xPercent: number;
  direction: "up" | "down";
  count: number;
  size: number; // avatar size (px)
  duration: number; // seconds for one travel
  wobbleDelay?: number; // phase offset for gentle bob
  gapFactor?: number; // optional per-rail gap factor (falls back to GAP_FACTOR)
};

/* ——— helpers ——— */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

function Avatar({
  src,
  size = 48,
  delay = 0,
}: {
  src: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay }}
      className="rounded-full ring-2 ring-white/70 shadow-md bg-white overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

function Rail({ spec, sources }: { spec: RailSpec; sources: string[] }) {
  return (
    <div
      className="absolute top-0 bottom-0"
      style={{ left: `${spec.xPercent}%`, transform: "translateX(-50%)" }}
      aria-hidden
    >
      {/* the thin line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-primary/15" />

      {/* avatars on this rail */}
      {sources.map((src, i) => {
        // Packed chain by default; increase gap by raising gapFactor (>1)
        const gap = spec.gapFactor ?? GAP_FACTOR;
        const baseDelay = (i / sources.length) * spec.duration * gap;

        const size = spec.size;
        const start = spec.direction === "down" ? "-12%" : "112%";
        const end = spec.direction === "down" ? "112%" : "-12%";

        return (
          <motion.div
            key={src + i}
            className="absolute left-1/2 -translate-x-1/2 will-change-[top]"
            style={{ width: size, height: size }}
            initial={{ top: start }}
            animate={{ top: [start, end] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: spec.duration,
              ease: "linear",
              delay: baseDelay,
            }}
          >
            <Avatar
              src={src}
              size={size}
              delay={i * 0.1 + (spec.wobbleDelay ?? 0)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  // ----- RAIL SPECS (6 rails, alternating direction) -----
  // 10 avatars per rail as requested (desktop baseline)
  const baseRails: RailSpec[] = [
    {
      xPercent: 8,
      direction: "down",
      count: 10,
      size: 56,
      duration: 14,
      wobbleDelay: 0.0,
    },
    {
      xPercent: 24,
      direction: "up",
      count: 10,
      size: 54,
      duration: 15,
      wobbleDelay: 0.2,
    },
    {
      xPercent: 40,
      direction: "down",
      count: 10,
      size: 52,
      duration: 13,
      wobbleDelay: 0.4,
    },
    {
      xPercent: 60,
      direction: "up",
      count: 10,
      size: 52,
      duration: 15,
      wobbleDelay: 0.6,
    },
    {
      xPercent: 76,
      direction: "down",
      count: 10,
      size: 50,
      duration: 14,
      wobbleDelay: 0.8,
    },
    {
      xPercent: 92,
      direction: "up",
      count: 10,
      size: 48,
      duration: 16,
      wobbleDelay: 1.0,
    },
  ];

  // Apply mobile adjustments: fewer rails + smaller avatars
  const rails: RailSpec[] = useMemo(() => {
    const selected = isMobile
      ? baseRails.slice(0, MOBILE_RAILS_COUNT)
      : baseRails;
    if (!isMobile) return selected;

    return selected.map((r) => ({
      ...r,
      // shrink avatar size
      size: Math.round(r.size * MOBILE_SIZE_SCALE),
      // optionally reduce count a bit on mobile if you want even more space (uncomment to use):
      // count: Math.max(6, Math.round(r.count * 0.9)),
    }));
  }, [isMobile]);

  // Ensure we have enough sources for all rails
  const totalNeeded = rails.reduce((a, r) => a + r.count, 0);
  const pool = Array.from(
    { length: totalNeeded },
    (_, i) => AVATARS[i % AVATARS.length]
  );

  // chunk helper
  let cursor = 0;
  const pick = (n: number) => {
    const out = pool.slice(cursor, cursor + n);
    cursor += n;
    return out;
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-4xl md:rounded-[48px] bg-[#F2EDE7] px-5 md:px-12 py-10 md:py-12">
        {/* decor corners */}
        <img
          src="/images/red.png"
          alt=""
          className="pointer-events-none select-none absolute -top-6 -right-4 w-24 md:w-52"
        />
        <img
          src="/images/yellow.png"
          alt=""
          className="pointer-events-none select-none absolute bottom-0 md:-bottom-10 -left-4 md:-left-14 w-24 md:w-52"
        />

        {/* CONTENT */}
        <div className="relative z-20 mt-4">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="fuzzy-plate pointer-events-none absolute -inset-8 -z-10" />
              <div className="text-center">
                <h1
                  className="font-dela font-bold text-primary tracking-wider
                             text-2xl leading-[1.1] md:text-4xl md:leading-[1.05] lg:text-6xl"
                >
                  <span className="block">We Make Creators</span>
                  <span className="block">&amp; Brands Grow Together</span>
                </h1>

                <p className="mt-3 md:mt-6 text-primary/70 text-[15px] md:text-2xl">
                  Jali Creators Label built to empower{" "}
                  <br className="hidden md:block" /> collaboration, creativity,
                  and fair growth.
                </p>

                <div className="w-[200px] md:w-auto mx-auto md:mx-0 mt-8 md:mt-12 flex flex-col sm:flex-row md:items-center md:justify-center gap-4 md:gap-6">
                  <JaliButton
                    to="/register/creator"
                    variant="primary"
                    right={
                      <img className="w-6" src="/images/emoji.png" alt="" />
                    }
                  >
                    Join as a Creator
                  </JaliButton>
                  <JaliButton
                    to="/register/business"
                    variant="secondary"
                    right={
                      <img className="w-6" src="/images/briefcase.png" alt="" />
                    }
                  >
                    Register as a Brand
                  </JaliButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle top shade overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/5 to-transparent" />

        {/* RAILS CANVAS (behind content) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Taller stage so avatars can enter/exit smoothly */}
          <div className="absolute inset-x-0 top-[-60%] h-[220%]">
            {rails.map((r, i) => (
              <Rail key={i} spec={r} sources={pick(r.count)} />
            ))}
          </div>
        </div>
      </div>

      {/* small responsive tweaks */}
      <style>{`
        @media (max-width: 1024px) {
          .rail-tighten {}
        }
        @media (max-width: 640px) {
          .absolute.inset-x-0.top-\\[-35%\\].h-\\[170%\\] {
            transform: scale(0.85);
            transform-origin: center top;
          }
        }
      `}</style>
    </section>
  );
}
