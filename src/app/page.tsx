import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features variant="teaser" />
      <Process />
      <Testimonials />
      <CtaBanner
        title="Ready to cost your next order?"
        body="Send a tech pack or a rough idea — we come back within two working days with mill options and a landed price."
      />
    </>
  );
}
