import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Features from "@/components/Features";
import CtaBanner from "@/components/CtaBanner";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sourcing & Export Capabilities",
  description:
    "Mill procurement, sampling, on-site quality control, laboratory compliance testing, customs, and landed container logistics across South and Southeast Asia.",
};

const LAB_TESTS = [
  {
    parameter: "Dimensional Stability (Shrinkage)",
    method: "ISO 6330 / AATCC 135 (3 washes @ 40°C)",
    standard: "Warp < 2.0% / Weft < 1.5%",
  },
  {
    parameter: "Colorfastness to Washing & Water",
    method: "ISO 105-C06 / AATCC 61",
    standard: "Grade 4-5 color change / staining",
  },
  {
    parameter: "Rubbing Fastness (Crocking)",
    method: "ISO 105-X12 / AATCC 8",
    standard: "Dry: Grade 4-5 / Wet: Grade 3-4",
  },
  {
    parameter: "Tensile & Tear Resistance",
    method: "ISO 13934-1 / ASTM D5034",
    standard: "Warp > 750 N / Weft > 550 N",
  },
  {
    parameter: "Pilling & Surface Abrasion",
    method: "Martindale ISO 12945-2 (2,000 revs)",
    standard: "Grade 4 minimum resistance",
  },
  {
    parameter: "Chemical & Toxicity Screen",
    method: "OEKO-TEX Standard 100 Class I/II",
    standard: "Zero banned azo dyes, formaldehyde < 16 ppm",
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities & Infrastructure"
        title="Complete technical apparel sourcing on a single balance sheet"
        lede="Most sourcing agents introduce you to a factory and step back once the order ships. We purchase the goods outright, so the same team remains legally and commercially accountable from fiber selection to warehouse dock."
      />

      <Features
        variant="full"
        eyebrow="Six Core Functions"
        title="Everything between a tech pack and a landed container"
        lede="Each of these can be pieced together from separate brokers, forwarders and third-party auditors. We execute them as one coordinated, accountable service."
      />

      {/* Production floor documentary break */}
      <section className="bg-canvas py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-line shadow-md sm:h-[440px]">
                <Image
                  src="/images/weaving.jpg"
                  alt="Modern industrial air-jet weaving floor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="font-semibold text-brass-light">Air-Jet Weaving Facility &middot; Sindh Unit #08</div>
                  <div className="text-white/70 text-[11px]">Direct contract capacity &middot; 480,000 m/month running capacity</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                We contract line capacity directly &mdash; not broker excess
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                Brokers trade whatever spare machine time a factory has open that month. We negotiate
                annualized loom allocations and dedicated sewing lines with pre-audited mills. This guarantees
                that your order is run on the exact machinery calibrated during sampling, without sudden subcontracting.
              </p>

              <div className="mt-6 space-y-3 text-xs text-ink/85">
                <div className="flex items-start gap-3 rounded-lg border border-line bg-canvas-subtle p-3.5">
                  <ShieldCheck className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink">Disclosed Unit Traceability:</span> Every mill, dyehouse, and laundry facility touching your order is registered and inspected prior to cutting.
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-line bg-canvas-subtle p-3.5">
                  <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink">Dedicated Line Merchandisers:</span> Our salaried technicians monitor stitching tension, seam slippage, and needle detectors every shift.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Testing Protocols */}
      <section id="compliance" className="bg-canvas-subtle/60 py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Accredited Laboratory Testing Benchmarks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Every production lot ships with certified test documentation from our internal calibrated lab
              or accredited third parties (SGS, Intertek, Bureau Veritas).
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-line bg-canvas-subtle font-mono uppercase tracking-wider text-ink-muted">
                  <tr>
                    <th className="py-3.5 px-5 font-semibold">Test Parameter</th>
                    <th className="py-3.5 px-5 font-semibold">Standard Test Method</th>
                    <th className="py-3.5 px-5 font-semibold">Standard Attire Services Minimum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-subtle text-ink">
                  {LAB_TESTS.map((t) => (
                    <tr key={t.parameter} className="hover:bg-canvas-subtle/50 transition-colors">
                      <td className="py-3.5 px-5 font-medium">{t.parameter}</td>
                      <td className="py-3.5 px-5 font-mono text-ink-muted">{t.method}</td>
                      <td className="py-3.5 px-5 font-mono font-semibold text-emerald-800">
                        {t.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-line bg-canvas-subtle/40 p-4 text-center text-xs font-mono text-ink-muted">
              Full lab reports and digital spectrophotometer spectral data are archived with every shipment manifest.
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need a feasibility review for an upcoming season?"
        body="Send us your tech pack or reference garment. Our London desk reviews specifications same-day and returns an indicative cost comparison within 48 hours."
      />
    </>
  );
}
