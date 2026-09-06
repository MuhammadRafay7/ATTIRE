import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Features from "@/components/Features";
import CtaBanner from "@/components/CtaBanner";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { getFeaturesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sourcing & Export Capabilities",
  description:
    "Mill procurement, sampling, on-site quality control, laboratory compliance testing, customs, and landed container logistics across South and Southeast Asia.",
};

export default function CapabilitiesPage() {
  const content = getFeaturesContent();

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
                  alt="Modern high-speed air-jet weaving floor with automated yarn tension sensors"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="font-semibold text-brass-light">Air-Jet Weaving Facility &middot; Sindh Mill Unit #08</div>
                  <div className="text-white/70 text-[11px]">480,000m monthly standing allocation &middot; PDM audited</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Loom capacity booked direct &mdash; not through an open-market middleman
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                When you place a seasonal order with Attire Services, we do not shop your tech pack
                around unverified sub-vendors. We hold direct capacity agreements across 63 audited spinning,
                weaving, dyeing, and garment manufacturing units in South and Southeast Asia.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-ink/85">
                  <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <span>Standing quarterly yarn allocation locks in greige prices before the seasonal spike.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-ink/85">
                  <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <span>Permanent floor inspectors oversee yarn tension, weft density, and skew controls on-site.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-ink/85">
                  <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                  <span>Every lot receives spectrophotometer color testing under multiple illuminant standards.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Testing Standards Matrix */}
      <section id="compliance" className="bg-canvas-subtle/70 py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Physical &amp; Chemical Laboratory Testing Matrix
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Every production lot undergoes mandatory physical and chemical validation in accredited SGS, Intertek,
              or on-site certified laboratories prior to commercial carton packing.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
            <div className="border-b border-line bg-canvas-subtle px-6 py-4 flex items-center justify-between">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brass" />
                <span>Mandatory Lot Sign-off Thresholds</span>
              </div>
              <span className="font-mono text-[11px] text-ink-muted">Standard ISO / AATCC Matrix</span>
            </div>

            <div className="divide-y divide-line text-xs font-mono">
              {content.labTests.map((t) => (
                <div
                  key={t.parameter}
                  className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-12 sm:items-center hover:bg-canvas-subtle/50 transition-colors"
                >
                  <div className="font-bold text-ink sm:col-span-5">{t.parameter}</div>
                  <div className="text-ink-muted sm:col-span-4">{t.method}</div>
                  <div className="text-brass-dark font-semibold sm:col-span-3 sm:text-right">
                    {t.standard}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Have custom compliance or CSR specifications?"
        body="We provide existing Sedex SMETA, BSCI, and GOTS audit dossiers upon request, or arrange tailored protocol audits to match your brand's specific vendor manual."
      />
    </>
  );
}
