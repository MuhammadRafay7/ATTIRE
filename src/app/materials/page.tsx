import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Materials from "@/components/Materials";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Fabric and garment constructions Attire Services holds mill capacity for today — weights, compositions, minimum order quantities and tariff headings.",
};

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Material library"
        title="Cloth we already hold capacity for"
        lede="Everything in the library below is in production at a mill we contract with today. Minimums are per colour, per construction."
      />
      <Materials variant="full" />
      <CtaBanner
        title="Working from a spec that isn't listed?"
        body="Send it anyway — most of what we run in bulk today started as a buyer's tech pack for something we hadn't made before."
      />
    </>
  );
}
