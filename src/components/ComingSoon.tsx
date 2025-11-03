import { motion } from "framer-motion";
import JaliButton from "./ui/JaliButton"; // update path if different
import { useMemo } from "react";

type Props = {
  title?: string,
  subtitle?: string,
  eta?: string, // e.g., "Launching Dec 2025"
  showNotify?: boolean, // show a fake email capture (front-end only)
  actions?: React.ReactNode, // custom actions if you don’t want defaults
  progress?: number, // 0-100 (optional visual)
};

export default function ComingSoon({
  title = "This page is in development",
  subtitle = "We’re crafting something great. Check back soon!",
  eta = "Launching soon",
  showNotify = true,
  actions,
  progress,
}: Props) {
  const clamped = useMemo(() => {
    if (progress == null) return null;
    return Math.max(0, Math.min(100, progress));
  }, [progress]);

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#F7F2EC]">
      {/* soft brand blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#187DD0]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#EB8715]/10 blur-3xl" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm ring-1 ring-black/5"
        >
          <span className="h-2 w-8 rounded-full bg-[#14D699]" />
          <span className="text-sm font-semibold text-primary tracking-wide">
            In Development
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-dela text-3xl sm:text-4xl md:text-5xl text-primary leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-2xl text-primary/70 md:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* Progress (optional) */}
        {clamped != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-8 w-full max-w-md"
          >
            <div className="flex items-center justify-between text-sm text-primary/60 mb-2">
              <span>Progress</span>
              <span>{clamped}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full bg-[#187DD0]"
                style={{ width: `${clamped}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {actions ?? (
            <>
              <JaliButton to="/" right={"🏠"}>
                Go Home
              </JaliButton>
              <JaliButton variant="secondary" href="mailto:jali@gmail.com" right={"✉️"}>
                Contact Us
              </JaliButton>
            </>
          )}
        </motion.div>

        {/* Notify (front-end only stub) */}
        {showNotify && (
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 w-full max-w-lg"
          >
            <div className="rounded-2xl bg-white/80 p-2 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-2 p-2">
                <input
                  type="email"
                  required
                  placeholder="Get notified — enter your email"
                  className="w-full rounded-full bg-transparent px-4 py-3 text-primary placeholder-primary/40 focus:outline-none"
                />
                <JaliButton className="px-6 py-3" right="🚀">
                  Notify Me
                </JaliButton>
              </div>
              <div className="px-4 pb-2 text-left text-xs text-primary/50">
                {eta}
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
