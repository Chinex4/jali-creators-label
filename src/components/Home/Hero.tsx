import { motion } from "framer-motion";
import JaliButton from "../ui/JaliButton";

const AVATARS = Array.from({ length: 18 }, (_, i) => `/images/avatars/${i + 1}.png`);

type TrackSpec = {
  radius: number;        // px from center
  count: number;         // avatars on this track
  duration: number;      // secs per full revolution
  reverse?: boolean;     // anticlockwise if true
  size: number;          // avatar size
  wobbleDelay?: number;  // start offset for gentle bob
};

const TRACKS: TrackSpec[] = [
  { radius: 380, count: 6, duration: 56, reverse: false, size: 56, wobbleDelay: 0.0 }, // 1st: CW
  { radius: 520, count: 5, duration: 64, reverse: true,  size: 52, wobbleDelay: 0.3 }, // 2nd: CCW
  { radius: 660, count: 4, duration: 58, reverse: false, size: 52, wobbleDelay: 0.6 }, // 3rd: CW
  { radius: 800, count: 3, duration: 70, reverse: true,  size: 48, wobbleDelay: 0.9 }, // 4th: CCW
];

function Avatar({ src, size = 48, delay = 0 }: { src: string; size?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay }}
      className="rounded-full ring-2 ring-white/70 shadow-md bg-white overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}

/**
 * A rotating track (big square, centered) with avatars positioned on a circle.
 * We rotate the whole track for continuous orbit. Each avatar is counter-rotated
 * to stay upright while moving.
 */
function OrbitTrack({ spec, sources }: { spec: TrackSpec; sources: string[] }) {
  const step = 360 / spec.count;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: spec.radius * 2,
        height: spec.radius * 2,
        transform: "translate(-50%, -50%)",
        animation: `${spec.reverse ? "orbit-rev" : "orbit"} ${spec.duration}s linear infinite`,
        transformOrigin: "center",
      }}
    >
      {/* ring line */}
      <div
        className="absolute inset-0 rounded-full border border-primary/10"
        aria-hidden
      />

      {/* avatars */}
      {sources.map((src, i) => {
        const angle = i * step; // degrees
        return (
          <div
            key={src + i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${angle}deg) translate(${spec.radius}px) rotate(${-angle}deg)`,
              transformOrigin: "0 0",
              willChange: "transform",
            }}
          >
            <Avatar src={src} size={spec.size} delay={(i * 0.12) + (spec.wobbleDelay ?? 0)} />
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  // slice the first 18 avatars across 6/5/4/3
  const [six, five, four, three] = [
    AVATARS.slice(0, 6),
    AVATARS.slice(6, 11),
    AVATARS.slice(11, 15),
    AVATARS.slice(15, 18),
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-4xl md:rounded-[48px] bg-[#F2EDE7] px-5 md:px-12 py-10 md:py-12">
        {/* decor corners */}
        <img src="/images/red.png" alt="" className="pointer-events-none select-none absolute -top-6 -right-4 w-24 md:w-52" />
        <img src="/images/yellow.png" alt="" className="pointer-events-none select-none absolute bottom-0 md:-bottom-10 -left-4 md:-left-14 w-24 md:w-52" />

        <div className="relative z-20">
          <div className="mx-auto max-w-4xl">
            {/* overlay plate */}
            <div className="relative">
              <div className="fuzzy-plate pointer-events-none absolute -inset-8 -z-10" />
              <div className="text-center">
                <h1 className="font-dela font-bold text-primary tracking-wider
                                text-4xl leading-tight md:text-4xl md:leading-[1.05] lg:text-6xl">
                  <span className="block">We Make Creators</span>
                  <span className="block">&amp; Brands Grow Together</span>
                </h1>

                <p className="mt-5 md:mt-6 text-primary/70 text-lg md:text-2xl">
                  Jali Creators Label built to empower{" "}
                  <br className="hidden md:block" /> collaboration, creativity, and fair growth.
                </p>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                  <JaliButton to="/register/creator" variant="primary" right={<img className="w-6" src="/images/emoji.png" alt="" />}>
                    Join as a Creator
                  </JaliButton>
                  <JaliButton to="/register/business" variant="secondary" right={<img className="w-6" src="/images/briefcase.png" alt="" />}>
                    Register as a Brand
                  </JaliButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/5 to-transparent" />
        {/* ORBIT CANVAS (behind everything) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* BIG orbit stage: make it taller than the hero so only arcs show */}
          <div className="absolute inset-x-0 top-[-45%] h-[180%]">
            {/* tracks */}
            <OrbitTrack spec={TRACKS[0]} sources={six} />
            <OrbitTrack spec={TRACKS[1]} sources={five} />
            <OrbitTrack spec={TRACKS[2]} sources={four} />
            <OrbitTrack spec={TRACKS[3]} sources={three} />
          </div>
        </div>

        {/* CONTENT + BLURRED OVERLAY (avatars pass behind this) */}

        {/* extra subtle shade */}
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes orbit { from { transform: translate(-50%, -50%) rotate(0deg); }
                           to   { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes orbit-rev { from { transform: translate(-50%, -50%) rotate(0deg); }
                               to   { transform: translate(-50%, -50%) rotate(-360deg); } }

        /* responsive: compress radii so more of each circle hides, preserving the half-arc vibe */
        @media (max-width: 1024px) {
          .absolute.left-1\\/2.top-1\\/2[style*="width:"] { /* track container */
            transform: translate(-50%, -50%) scale(0.82);
          }
        }
        @media (max-width: 640px) {
          .absolute.left-1\\/2.top-1\\/2[style*="width:"] {
            transform: translate(-50%, -50%) scale(0.68);
          }
        }
      `}</style>
    </section>
  );
}
