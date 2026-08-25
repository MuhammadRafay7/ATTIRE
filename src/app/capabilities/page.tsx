import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Features from "@/components/Features";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Mill sourcing, sampling, quality control, compliance, freight and trade documentation — everything between a tech pack and a landed container.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Everything between a tech pack and a landed container"
        lede="Most sourcing agents introduce you to a factory and step back once the order ships. We buy the goods outright, so the same team is accountable at every stage."
      />
      <Features variant="full" eyebrow="Capabilities" title="Six functions, one contract" lede="Each of these can be bought separately from a broker. We run them as one accountable service, on one invoice." />
      <CtaBanner
        title="Not sure which of this you need?"
        body="Tell us what you're making and we'll scope it — most buyers only need three or four of these to start."
      />
    </>
  );
}
