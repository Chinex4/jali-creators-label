import { useState, useRef, type FormEvent } from "react";
import JaliButton from "..//ui/JaliButton"; // adjust path if needed

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    // Basic HTML validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Fake submit (wire up to your API later)
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-10 md:gap-16 md:grid-cols-2 items-start">
        {/* Left copy */}
        <div>
          <p className="text-primary/60 mb-3 text-lg">Contact Us Today</p>
          <h2 className="font-extrabold text-primary leading-tight tracking-wide
                         text-3xl sm:text-4xl font-dela">
            Drop A Request Or
            <br /> Feedback About Our
            <br /> Services.
          </h2>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full rounded-2xl bg-[#F3EFEB] placeholder:text-primary/40
                         text-primary px-5 py-4 outline-none ring-0 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <input
              type="text"
              name="fullName"
              required
              minLength={2}
              placeholder="Full name"
              className="w-full rounded-2xl bg-[#F3EFEB] placeholder:text-primary/40
                         text-primary px-5 py-4 outline-none ring-0 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <textarea
              name="message"
              required
              minLength={10}
              rows={6}
              placeholder="Message"
              className="w-full rounded-2xl bg-[#F3EFEB] placeholder:text-primary/40
                         text-primary px-5 py-4 outline-none ring-0 focus:ring-2 focus:ring-primary/15 resize-y"
            />
            <p className="mt-1 text-sm text-primary/40">
              * Minimum 10 characters.
            </p>
          </div>

          <div className="pt-2">
            <JaliButton
              type="submit"
              variant="secondary" // matches your outline pill in the mock
              className="min-w-[220px]"
              disabled={isSubmitting}
              right={
                isSubmitting ? (
                  <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <span className="ml-1 text-xl">➤</span>
                )
              }
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </JaliButton>
          </div>
        </form>
      </div>
    </section>
  );
}
