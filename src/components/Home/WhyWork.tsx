import { motion } from "framer-motion";

type CardProps = {
  bg: string; // tailwind class for bg color
  image: string; // /images/pic1.png ...
  title: string; // can include \n for line break
  body: string;
};

function PillImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-20 md:h-24 w-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}

function InfoCard({ bg, image, title, body }: CardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={[
        "rounded-[36px] p-6 md:p-8 text-white shadow",
        "flex flex-col gap-5 md:gap-6",
        bg,
      ].join(" ")}
    >
      <div className="max-w-[520px]">
        <PillImage src={image} alt="" />
      </div>

      <h3 className="font-extrabold leading-tight text-white text-2xl md:text-3xl font-dela">
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="text-white/95 text-base md:text-lg leading-relaxed">
        {body}
      </p>
    </motion.article>
  );
}

export default function WhyWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <InfoCard
          bg="bg-[#187DD0]" // JALI blue
          image="/images/pic1.png"
          title={"Why Work With\nOur Creators"}
          body={
            "Our creators are not just content makers, they’re culture shapers and storytellers trained by the Jali Creator Label.\n\nEach one is vetted, trained, and supported to deliver stories that inspire, influence, and convert."
          }
        />

        <InfoCard
          bg="bg-[#EB8715]" // JALI orange
          image="/images/pic2.png"
          title={"Why Work With\nOur Businesses"}
          body={
            "The businesses registered under Jali share our commitment to creativity, fairness, and mutual growth.\n\nThey believe in creators, respecting intellectual property, and building long-term partnerships."
          }
        />
      </div>
    </section>
  );
}
