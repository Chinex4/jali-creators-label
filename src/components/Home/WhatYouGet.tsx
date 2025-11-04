import { motion } from "framer-motion";

type CardProps = {
  tone: "blue" | "orange";
  label: string;
  title: string;
  blurb: string;
  bullets: string[];
  image: string; // /images/emoji.png or /images/briefcase.png
  pattern: string; // /images/pattern.png
};

const COLORS = {
  blue: { base: "#187DD0" }, // JALI blue
  orange: { base: "#EB8715" }, // JALI orange
};

function BenefitCard({
  tone,
  label,
  title,
  blurb,
  bullets,
  image,
  pattern,
}: CardProps) {
  const base = COLORS[tone].base;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative overflow-hidden rounded-[36px] md:rounded-[40px] shadow"
      style={{ backgroundColor: base }}
    >
      {/* Pattern layer – stronger and guaranteed visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Layout: left text, right image space */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-6 md:gap-10 p-6 sm:p-8 md:p-10 lg:p-12 text-[#F2EDE7]">
        {/* TEXT */}
        <div>
          {/* Label pill */}
          <span className="inline-block rounded-full bg-white/15 text-[#F2EDE7] px-3 py-1 text-[11px] md:text-xs font-extrabold tracking-wide">
            {label.toUpperCase()}
          </span>

          <h3
            className="mt-4 font-extrabold leading-tight text-[#F2EDE7] font-dela
                         text-2xl sm:text-3xl md:text-4xl"
          >
            {title}
          </h3>

          <p className="mt-3 max-w-2xl text-[#F2EDE7]/95 text-base sm:text-lg leading-relaxed">
            {blurb}
          </p>

          {/* Bullets in 2 columns on sm+ */}
          <ul className="mt-5 grid gap-x-10 gap-y-2 text-[#F2EDE7] text-base sm:text-lg leading-relaxed sm:grid-cols-2">
            {bullets.map((b, i) => (
              <li key={i} className="relative pl-5">
                <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-white" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* IMAGE (right) */}
        <div className="relative h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px]">
          {/* Keep a gap from text */}
          <div className="absolute inset-y-0 left-0 right-0 md:left-6 md:right-2 flex items-center justify-end">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="
                max-h-full w-auto object-contain select-none pointer-events-none
                mix-blend-screen
                drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]
              "
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function WhatYouGet() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-8 md:space-y-10">
      {/* Creators card */}
      <BenefitCard
        tone="blue"
        label="For Creators"
        title="What You Get From Joining Our Label"
        blurb="Jali helps creators turn content into career growth. From mentorship to brand deals, we give you the tools and partnerships to grow sustainably."
        bullets={[
          "Brand campaigns",
          "Good payments",
          "Training, Growth tools, & strategy support",
          "A community that pushes you higher",
        ]}
        image="/images/emoji.png"
        pattern="/images/pattern.png"
      />

      {/* Businesses card */}
      <BenefitCard
        tone="orange"
        label="For Businesses"
        title="What You Get From Joining Our Label"
        blurb="We help brands find creators who get it. No bots, no random collabs, just creators who fit your message, voice, and goals."
        bullets={[
          "Access to vetted, professional creators",
          "Custom campaign planning & strategy",
          "Authentic storytelling that converts",
          "Transparent results & analytics",
        ]}
        image="/images/briefcase.png"
        pattern="/images/pattern.png"
      />
    </section>
  );
}
