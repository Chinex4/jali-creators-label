import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import JaliButton from "../ui/JaliButton"; 

export default function WhyJoin() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
      <div className="grid items-center gap-10 md:gap-14 md:grid-cols-2">
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-[48px] overflow-hidden shadow">
            <img
              src="/images/cards-on-wall.png"
              alt="Sticky notes on a planning board"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text block (left on md+) */}
        <motion.div
          className="order-2 md:order-1 text-center md:text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2
            className="font-dela text-primary font-extrabold tracking-wider
                         text-4xl leading-tight
                         sm:text-5xl
                         md:text-5xl"
          >
            Why Join Our
            <br className="hidden sm:block" />
            Creators Label?
          </h2>

          <p className="mt-6 text-primary/70 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
            We build bridges that grow both sides. We do this in a space built
            on trust, transparency, and collaboration.
          </p>

          <p className="mt-5 text-primary/70 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
            Whether you’re a creator looking to grow your career or a business
            seeking visibility, we give you the systems, partnerships, and
            support to make real growth happen.
          </p>

          <div className="mt-8">
            <Link to="/about" className="inline-block">
              {/* Outline style like the mock (secondary variant) */}
              <JaliButton
                variant="secondary"
                right={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 font-dela font-bold"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13.172 12 8.222 7.05a1 1 0 1 1 1.414-1.414l6.364 6.364a1 1 0 0 1 0 1.414l-6.364 6.364a1 1 0 1 1-1.414-1.414L13.172 12Z" />
                  </svg>

                  
                }
              >
                More About Us
              </JaliButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
