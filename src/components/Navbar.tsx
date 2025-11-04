import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const TABS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Resources", to: "/resources" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF7F2]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img className="w-40 md:w-[201px]" src="/images/logo.png" alt="" />
        </Link>

        {/* Center: Segmented control (desktop) */}
        <nav className="hidden md:block">
          <LayoutGroup id="nav">
            <ul className="relative flex items-center gap-2 rounded-full bg-[#EFE8E1] px-3 py-4">
              {TABS.map((t) => {
                const active =
                  pathname === t.to ||
                  (t.to !== "/" && pathname.startsWith(t.to));
                return (
                  <li key={t.to} className="relative">
                    <NavLink
                      to={t.to}
                      className="relative z-10 rounded-full px-6 py-4 text-base font-extrabold text-primary"
                    >
                      {active && (
                        <motion.span
                          layoutId="activePill"
                          className="absolute inset-0 -z-10 rounded-full bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          }}
                        />
                      )}
                      <span
                        className={active ? "text-[#F2EDE7]" : "text-primary/70"}
                      >
                        {t.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>

        {/* Right: CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex rounded-full bg-primary text-[#F2EDE7] font-extrabold px-6 py-4"
        >
          Chat With Us{" "}
          <span className="ml-2 text-xl">
            <img src="/images/chat.png" alt="" />
          </span>
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-full border border-primary/20"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiOutlineMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden"
      >
        <LayoutGroup id="nav-mobile">
          <ul className="mx-4 mb-4 rounded-2xl border border-primary/10 bg-[#EFE8E1] overflow-hidden">
            {TABS.map((t) => {
              const active =
                pathname === t.to ||
                (t.to !== "/" && pathname.startsWith(t.to));

              return (
                <li key={t.to} className="relative">
                  <NavLink
                    to={t.to}
                    // isolate => create a new stacking context so the pill (z-0) stays behind text but above background
                    className="block px-5 py-4 text-lg font-extrabold relative isolate"
                  >
                    {active && (
                      <motion.span
                        layoutId="activePill"
                        // use z-0 (not -z-10) so it isn't pushed behind the UL background
                        className="absolute inset-0 z-0 rounded-xl bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                        }}
                      />
                    )}

                    {/* Keep label above the pill */}
                    <span
                      className={
                        active
                          ? "relative z-10 text-[#F2EDE7]"
                          : "relative z-10 text-primary/70"
                      }
                    >
                      {t.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        <div className="px-4 pb-4">
          <Link
            to="/contact"
            className="flex justify-center items-center text-center rounded-full bg-primary text-[#F2EDE7] font-extrabold px-6 py-5"
          >
            <span>Chat With Us</span>
            <span className="ml-2 text-xl">
              <img src="/images/chat.png" alt="" />
            </span>
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
