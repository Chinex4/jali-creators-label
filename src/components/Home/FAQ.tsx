import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What makes Jali different?",
    a: "We focus on connection, fairness, and growth — helping creators and brands work together transparently, not transactionally.",
  },
  {
    q: "Is the Creators Label free to join?",
    a: "Yes. Joining is free. We review applications to make sure there’s a good fit, then provide tools, training and opportunities.",
  },
  {
    q: "Do you work with all kind of business?",
    a: "We partner with businesses of all sizes that value creativity, fair terms, and long-term collaboration.",
  },
  {
    q: "Can new creators join the Label?",
    a: "Absolutely. If you’re serious about improving your craft and working professionally with brands, we’ll help you grow.",
  },
  {
    q: "Can small businesses or startups register?",
    a: "Yes. Many of our best partnerships start with SMEs and startups. We’ll help you find the right creators for your goals.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  // Closed = plus; Open = mint minus bar
  if (open) {
    return <span className="inline-block h-1 w-6 rounded-full bg-[#14D699]" />;
  }
  return (
    <span className="relative inline-block h-6 w-6">
      <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      <span className="absolute left-1/2 top-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </span>
  );
}

function FaqItem({
  item,
  defaultOpen = false,
}: {
  item: Faq;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`rounded-2xl border bg-[#F3EFEB] ${
        open ? "border-[#E5DDD3]" : "border-[#E9E1D8]"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center gap-5 px-6 py-5 text-left"
      >
        <PlusIcon open={open} />
        <span className="text-lg md:text-xl font-bold text-primary">
          {item.q}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-primary/60 leading-relaxed md:text-lg">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <h2
        className="text-center font-extrabold text-primary
                     tracking-wide font-dela leading-tight
                     text-3xl sm:text-4xl md:text-5xl"
      >
        Frequently Asked Questions
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* First item open by default to match your mock */}
        <FaqItem item={FAQS[0]} defaultOpen />

        {/* Keep the grid balanced: map rest, preserving order */}
        {FAQS.slice(1).map((it, idx) => (
          <FaqItem key={idx} item={it} />
        ))}
      </div>
    </section>
  );
}
