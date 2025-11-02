import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import CountrySelect from "./CountrySelect";
import NicheSelect from "./NicheSelect";
import JaliButton from "../../components/ui/JaliButton";

type Props = {
  kind: "creator" | "business";
  titleBadge: string; // e.g., "Join as a Creator 🕶️" or "Register as a Brand 💼"
  onSubmitApi?: (payload: any) => Promise<void>; // wire later to your Node API
};

export default function RegisterForm({ kind, titleBadge, onSubmitApi }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  // local state for controlled selects
  const [country, setCountry] = useState("");
  const [niche, setNiche] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    (payload as any).country = country;
    (payload as any).niche = niche;
    (payload as any).kind = kind;

    try {
      setLoading(true);
      // if you pass a real API handler, call it; else simulate
      if (onSubmitApi) {
        await onSubmitApi(payload);
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      alert("Registration submitted ✅ We’ll get back to you shortly.");
      form.reset();
      setCountry("");
      setNiche("");
    } catch (err) {
      alert("Oops, failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[28px] md:rounded-[36px] bg-[#F7F2EC] p-6 md:p-10 shadow"
      >
        {/* Badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-4 py-2 text-sm font-extrabold">
            {titleBadge}
          </span>
        </div>

        <h2 className="font-extrabold text-primary text-2xl md:text-3xl leading-tight tracking-tight mb-6">
          Kindly, Fill the Form to
          <br /> Complete Your Registration
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            required
            placeholder="First Name"
            className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="lastName"
            required
            placeholder="Last Name"
            className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              name="phone"
              required
              placeholder="Phone Number"
              className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <CountrySelect
            id="country"
            required
            value={country}
            onChange={setCountry}
          />
          <NicheSelect id="niche" required value={niche} onChange={setNiche} />

          {/* Socials */}
          <input
            name="instagram"
            placeholder="Input your Instagram Link"
            className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="tiktok"
            placeholder="Input your Tiktok Link"
            className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20"
          />

          <textarea
            name="about"
            required
            minLength={20}
            rows={6}
            placeholder="Tell us a bit about yourself"
            className="w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          />

          <div className="pt-2">
            <JaliButton
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full md:w-auto"
              right={
                loading ? (
                  <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <span className="ml-1 text-xl">➤</span>
                )
              }
            >
              {loading ? "Submitting..." : "Register"}
            </JaliButton>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
