import { motion } from "framer-motion";
import JaliButton from "../ui/JaliButton";

const AVATARS = Array.from(
  { length: 18 },
  (_, i) => `/images/avatars/${i + 1}.png`
);

type OrbitAvatarProps = {
  src: string;
  radius: number;
  size?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
};

function OrbitAvatar({
  src,
  radius,
  size = 48,
  duration = 40,
  delay = 0,
  reverse,
}: OrbitAvatarProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{
        animation: `${
          reverse ? "orbit-rev" : "orbit"
        } ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ transform: `translateX(${radius}px)` }}>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            delay,
            ease: "easeInOut",
          }}
          className="rounded-full ring-2 ring-white/60 shadow-md overflow-hidden bg-white"
          style={{ width: size, height: size }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
}

type RingProps = { scale: number };

function Ring({ scale }: RingProps) {
  return (
    <div
      className="absolute inset-0 rounded-full border border-primary/10"
      style={{ transform: `scale(${scale})` }}
    />
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-4xl md:rounded-[48px] bg-[#F2EDE7] px-5 md:px-12 py-10 md:py-12">
        <img
          src="/images/red.png"
          alt=""
          className="pointer-events-none select-none absolute -top-6 -right-4 w-24 md:w-52"
          loading="lazy"
        />
        <img
          src="/images/yellow.png"
          alt=""
          className="pointer-events-none select-none absolute bottom-0 md:-bottom-10 -left-4 md:-left-14 w-24 md:w-52"
          loading="lazy"
        />
        {/* Decorative orbit canvas */}
        <div className="absolute inset-0">
          {/* fix class: bg-gradient-to-b (not bg-linear-to-b) and subtlety */}
          <div className="absolute inset-0 bg-linear-to-b from-black/5 to-transparent pointer-events-none" />
          <Ring scale={0.28} />
          <Ring scale={0.48} />
          <Ring scale={0.68} />
          <Ring scale={0.88} />
          <Ring scale={1.1} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto md:mt-12">
          <h1
            className="font-dela font-extrabold text-primary tracking-wider
                         text-4xl leading-tight
                         md:text-4xl md:leading-[1.05]
                         lg:text-6xl"
          >
            <span className="block">We Make Creators</span>
            <span className="block">&amp; Brands Grow Together</span>
          </h1>

          <p className="mt-5 md:mt-6 text-primary/70 text-lg md:text-2xl">
            Jali Creators Label built to empower collaboration, creativity, and
            fair growth.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <JaliButton
              variant="primary"
              right={
                <span>
                  <img className="w-6" src="/images/emoji.png" alt="" />
                </span>
              }
            >
              Join as a Creator
            </JaliButton>
            <JaliButton
              variant="secondary"
              right={
                <span>
                  <img className="w-6" src="/images/briefcase.png" alt="" />
                </span>
              }
            >
              Register as a Brand
            </JaliButton>
          </div>
        </div>

        {/* Reserve less vertical space than before */}
        {/* <div className="relative z-0 aspect-28/9 md:aspect-32/9"></div> */}

        {/* Orbiting avatars */}
        <div className="pointer-events-none absolute inset-0 hero-orbits">
          {/* Use different radii to sprinkle the avatars across rings */}
          <OrbitAvatar
            src={AVATARS[0]}
            radius={140}
            size={52}
            duration={52}
            delay={0.2}
          />
          <OrbitAvatar
            src={AVATARS[1]}
            radius={180}
            size={48}
            duration={58}
            delay={1.1}
            reverse
          />
          <OrbitAvatar
            src={AVATARS[2]}
            radius={220}
            size={44}
            duration={46}
            delay={0.6}
          />
          <OrbitAvatar
            src={AVATARS[3]}
            radius={260}
            size={50}
            duration={64}
            delay={0.9}
            reverse
          />
          <OrbitAvatar
            src={AVATARS[4]}
            radius={300}
            size={46}
            duration={54}
            delay={0.4}
          />
          <OrbitAvatar
            src={AVATARS[5]}
            radius={340}
            size={42}
            duration={70}
            delay={1.7}
            reverse
          />
          <OrbitAvatar
            src={AVATARS[6]}
            radius={380}
            size={48}
            duration={60}
            delay={1.3}
          />
          <OrbitAvatar
            src={AVATARS[7]}
            radius={420}
            size={44}
            duration={66}
            delay={0.8}
            reverse
          />
          <OrbitAvatar
            src={AVATARS[8]}
            radius={460}
            size={46}
            duration={72}
            delay={1.9}
          />
          <OrbitAvatar
            src={AVATARS[9]}
            radius={500}
            size={42}
            duration={62}
            delay={0.5}
            reverse
          />
          <OrbitAvatar
            src={AVATARS[10]}
            radius={540}
            size={44}
            duration={68}
            delay={1.5}
          />
          <OrbitAvatar
            src={AVATARS[11]}
            radius={580}
            size={46}
            duration={76}
            delay={1.0}
            reverse
          />
        </div>

        {/* Responsive tuning using CSS var instead of that long class selector */}
        <style>{`
          .hero-orbits [data-orbit] > div > div { transform: translateX(var(--r)); }
          @media (max-width: 1024px) {
            .hero-orbits [data-orbit] > div > div { transform: translateX(calc(var(--r) * .62)); }
          }
          @media (max-width: 640px) {
            .hero-orbits [data-orbit] > div > div { transform: translateX(calc(var(--r) * .50)); }
          }
        `}</style>
      </div>
    </section>
  );
}
