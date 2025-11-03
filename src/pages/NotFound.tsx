import { motion } from "framer-motion";
import JaliButton from "../components/ui/JaliButton";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function NotFound() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#F7F2EC]">
      {/* soft brand blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#187DD0]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#EB8715]/10 blur-3xl" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm ring-1 ring-black/5"
        >
          <span className="h-2 w-2 rounded-full bg-[#EB8715]" />
          <span className="text-sm font-semibold text-primary">404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-dela text-primary text-3xl sm:text-4xl md:text-5xl leading-tight"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-2xl text-primary/70 md:text-lg"
        >
          The link may be broken or the page might have moved. Try searching or head back home.
        </motion.p>

        {/* Search (front-end only) */}
        <motion.form
          onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav(`/search?q=${encodeURIComponent(q)}`); }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-7 w-full max-w-xl"
          role="search"
        >
          <div className="rounded-2xl bg-white/80 p-2 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2 p-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search Jali…"
                className="w-full rounded-full bg-transparent px-4 py-3 text-primary placeholder-primary/40 focus:outline-none"
                aria-label="Search"
              />
              <JaliButton className="px-6 py-3" right="🔎">
                Search
              </JaliButton>
            </div>
          </div>
        </motion.form>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <JaliButton to="/" right="🏠">Go Home</JaliButton>
          <JaliButton variant="secondary" onClick={() => nav(-1)} right="↩︎">
            Go Back
          </JaliButton>
          <JaliButton variant="secondary" href="mailto:jali@gmail.com" right="✉️">
            Contact Us
          </JaliButton>
        </motion.div>

        {/* Helpful quick links */}
        <div className="mt-6 text-sm text-primary/60">
          Try:{" "}
          <Link to="/about" className="underline hover:no-underline">About</Link>{" "}
          ·{" "}
          <Link to="/resources" className="underline hover:no-underline">Resources</Link>{" "}
          ·{" "}
          <Link to="/register/creator" className="underline hover:no-underline">Creators</Link>{" "}
          ·{" "}
          <Link to="/register/business" className="underline hover:no-underline">Businesses</Link>
        </div>
      </div>
    </section>
  );
}
