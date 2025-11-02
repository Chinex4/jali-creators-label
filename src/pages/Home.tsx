import ContactSection from "../components/Home/ContactSection";
import FAQ from "../components/Home/FAQ";
import Hero from "../components/Home/Hero";
import WhatYouGet from "../components/Home/WhatYouGet";
import WhyJoin from "../components/Home/WhyJoin";
import WhyWork from "../components/Home/WhyWork";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyWork />
      <WhyJoin />
      <WhatYouGet />
      <ContactSection />
      <FAQ />
    </>
  );
}
