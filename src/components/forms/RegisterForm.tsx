import { type FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountrySelect from "./CountrySelect";
import NicheSelect from "./NicheSelect";
import JaliButton from "../../components/ui/JaliButton";
import toast from "react-hot-toast";
import SuccessModal from "../../components/ui/SuccessModal";

type Props = {
  kind: "creator" | "business";
  titleBadge: string;
  onSubmitApi?: (
    payload: Record<string, any>
  ) => Promise<{ ok: boolean; message?: string }>;
};

type FieldErrors = Record<string, string[]>;

export default function RegisterForm({ kind, titleBadge, onSubmitApi }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [niche, setNiche] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const payload: Record<string, any> = Object.fromEntries(fd.entries());
    payload.country = country;
    payload.niche = niche;
    payload.kind = kind;

    setFirstName(String(payload.firstName || "").trim());

    try {
      setLoading(true);
      setFieldErrors({});

      const res = onSubmitApi
        ? await onSubmitApi(payload)
        : (await new Promise((r) => setTimeout(r, 600)), { ok: true });

      if (res?.ok) {
        toast.success(res?.message || "Registration submitted ✅");
        setShowSuccess(true);
        form.reset();
        setCountry("");
        setNiche("");
      } else {
        toast.error(res?.message || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      if (err?.status === 422 && err?.errors) {
        const errors: FieldErrors = err.errors;
        setFieldErrors(errors);

        const messages = Object.values(errors).flat().slice(0, 2).join(" • ");
        toast.error(messages || err.message || "Validation failed");

        const firstErrorField = Object.keys(errors)[0];
        const form = formRef.current;
        if (form) {
          const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            `[name="${firstErrorField}"]`
          );
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus();
          }
        }
      } else {
        toast.error(
          err?.message || "Oops, failed to submit. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const ICONS: Record<string, string> = {
    creator: "/images/emoji.png",
    business: "/images/briefcase.png",
  };
  const iconSrc = ICONS[kind];
  const RightEmoji = (
    <img src={iconSrc} alt="" className="h-6 w-6 object-contain" />
  );

  const Err = (name: string) =>
    fieldErrors?.[name]?.length ? (
      <p className="mt-1 text-sm text-red-600">{fieldErrors[name][0]}</p>
    ) : null;

  const errRing = (name: string) =>
    fieldErrors?.[name]?.length
      ? "ring-2 ring-red-400 focus:ring-red-400"
      : "focus:ring-primary/20";

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[28px] md:rounded-[36px] bg-[#F7F2EC] p-6 md:p-10 shadow"
        >
          <div className="mb-5">
            <JaliButton
              type="button"
              className="pointer-events-none select-none"
              right={RightEmoji}
            >
              {titleBadge}
            </JaliButton>
          </div>

          <h2 className="font-extrabold text-primary text-2xl md:text-3xl leading-tight tracking-tight mb-6">
            Kindly, Fill the Form to
            <br /> Complete Your Registration
          </h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div>
              <input
                name="firstName"
                required
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                  "firstName"
                )}`}
                aria-invalid={!!fieldErrors?.firstName}
              />
              {Err("firstName")}
            </div>

            <div>
              <input
                name="lastName"
                required
                placeholder="Last Name"
                className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                  "lastName"
                )}`}
                aria-invalid={!!fieldErrors?.lastName}
              />
              {Err("lastName")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                    "email"
                  )}`}
                  aria-invalid={!!fieldErrors?.email}
                />
                {Err("email")}
              </div>
              <div>
                <input
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                    "phone"
                  )}`}
                  aria-invalid={!!fieldErrors?.phone}
                />
                {Err("phone")}
              </div>
            </div>

            <div>
              <CountrySelect
                id="country"
                required
                value={country}
                onChange={(v) => setCountry(v ?? "")}
              />
              {Err("country")}
            </div>

            <div>
              <NicheSelect
                id="niche"
                required
                value={niche}
                onChange={(v) => setNiche(v ?? "")}
              />
              {Err("niche")}
            </div>

            <div>
              <input
                name="instagram"
                placeholder="Input your Instagram Link"
                className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                  "instagram"
                )}`}
                aria-invalid={!!fieldErrors?.instagram}
              />
              {Err("instagram")}
            </div>

            <div>
              <input
                name="tiktok"
                placeholder="Input your Tiktok Link"
                className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none ${errRing(
                  "tiktok"
                )}`}
                aria-invalid={!!fieldErrors?.tiktok}
              />
              {Err("tiktok")}
            </div>

            <div>
              <textarea
                name="about"
                required
                minLength={20}
                rows={6}
                placeholder="Tell us a bit about yourself"
                className={`w-full rounded-2xl bg-[#F3EFEB] px-5 py-4 outline-none resize-y ${errRing(
                  "about"
                )}`}
                aria-invalid={!!fieldErrors?.about}
              />
              {Err("about")}
            </div>

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

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={`Thanks${firstName ? `, ${firstName}` : ""}!`}
        subtitle={`Your ${
          kind === "creator" ? "Creator" : "Brand"
        } registration was received.`}
        details="We’ve emailed you a confirmation. Our team will review and get back to you shortly."
        ctaText="Okay"
      />
    </>
  );
}
