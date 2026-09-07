import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import {
  getHeroContentAsync,
  getStatsContentAsync,
  getFeaturesContentAsync,
  getProcessContentAsync,
  getTestimonialsContentAsync,
} from "@/lib/server-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [hero, stats, features, process, testimonials] = await Promise.all([
    getHeroContentAsync(),
    getStatsContentAsync(),
    getFeaturesContentAsync(),
    getProcessContentAsync(),
    getTestimonialsContentAsync(),
  ]);

  return (
    <>
      <Hero content={hero} />
      <Stats stats={stats} />
      <Features content={features} variant="teaser" />
      <Process content={process} />
      <Testimonials content={testimonials} />
      <CtaBanner
        title="Ready to cost your next order?"
        body="Send a tech pack or a rough idea — we come back within two working days with mill options and a landed price."
      />
    </>
  );
}
