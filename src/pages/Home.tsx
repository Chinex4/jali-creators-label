import JaliButton from "../components/ui/JaliButton";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="font-display text-4xl md:text-6xl text-primary mb-8">
        JALI Creators Label
      </h1>

      <p className="max-w-2xl text-primary/80 text-lg">
        Build your creator–brand collaborations with style.
      </p>

      <div className="mt-10 flex flex-wrap gap-6">
        <JaliButton variant="primary" right={<span>😎</span>} large>
          Join as a Creator
        </JaliButton>
        <JaliButton variant="secondary" right={<span>👜</span>} large>
          Register as a Brand
        </JaliButton>
      </div>
    </section>
  );
}
