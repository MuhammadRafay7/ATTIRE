import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Materials from "@/components/Materials";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Textile & Material Archive",
  description:
    "Explore fabric constructions Attire Services holds direct mill contract capacity for: selvedge denim, 120s combed shirting poplin, chino twill, circular knits, and heavy duck canvas.",
};

const FIBER_STANDARDS = [
  {
    title: "100% Ring-Spun Long-Staple Cotton",
    detail: "Sourced from certified Indus Basin & Xinjiang long-staple crops with staple length > 32mm for high tensile durability and minimal pilling.",
  },
  {
    title: "GOTS & BCI Certified Traceability",
    detail: "Every bale of organic fiber carries a verified transaction certificate (TC) tracking lot number from ginner through ring spinning frames.",
  },
  {
    title: "Liquid Ammonia & Mercerization",
    detail: "Permanent luster and fiber swell achieved via tension mercerization tanks, resulting in superior wash fastness and silky tactile hand-feel.",
  },
  {
    title: "Eco-Conscious Dyeing & Zero Discharge (ZDHC)",
    detail: "Reactive and sulfur dyehouses operating under Level 3 ZDHC chemical discharge guidelines with closed-loop effluent treatment plants (ETP).",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Textile & Material Library"
        title="Fabric constructions running on our contracted mill looms today"
        lede="We do not source stock-lot fabrics or open-market remnants. Everything in our library is manufactured to buyer specification under direct contractual allocations across our partner mills."
      />

      <Materials variant="full" />

      {/* Fiber & Chemical Finishing Standards */}
      <section className="bg-canvas py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Chemical &amp; Mechanical Finishing Benchmarks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Great garments start at the blowroom and carding machine. Here is how we verify
              raw fiber before a single bobbin of yarn is loaded into a loom.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FIBER_STANDARDS.map((s) => (
              <div
                key={s.title}
                className="paper-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="h-1.5 w-8 bg-brass mb-4 rounded-full" />
                  <h3 className="font-display text-base font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Technical Weight Conversion Chart */}
          <div className="mt-14 rounded-2xl border border-line bg-canvas-subtle p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4 mb-4">
              <div>
                <h4 className="font-display text-lg font-bold text-ink">
                  Fabric Weight Reference Table
                </h4>
                <p className="text-xs text-ink-muted">
                  Standard metric to imperial fabric weight conversion across common garment applications.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-muted uppercase">
                Tolerance: &plusmn; 5% GSM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs font-mono">
              <div className="rounded-lg bg-paper p-3 border border-line">
                <div className="text-ink font-semibold">Lightweight Shirting</div>
                <div className="text-brass-dark mt-0.5">110 &ndash; 140 GSM</div>
                <div className="text-ink-muted text-[11px]">3.2 &ndash; 4.1 oz/yd&sup2;</div>
              </div>
              <div className="rounded-lg bg-paper p-3 border border-line">
                <div className="text-ink font-semibold">T-Shirt &amp; Polo Knits</div>
                <div className="text-brass-dark mt-0.5">180 &ndash; 240 GSM</div>
                <div className="text-ink-muted text-[11px]">5.3 &ndash; 7.1 oz/yd&sup2;</div>
              </div>
              <div className="rounded-lg bg-paper p-3 border border-line">
                <div className="text-ink font-semibold">Chinos &amp; Overshirts</div>
                <div className="text-brass-dark mt-0.5">260 &ndash; 320 GSM</div>
                <div className="text-ink-muted text-[11px]">7.7 &ndash; 9.4 oz/yd&sup2;</div>
              </div>
              <div className="rounded-lg bg-paper p-3 border border-line">
                <div className="text-ink font-semibold">Heavy Denim &amp; Canvas</div>
                <div className="text-brass-dark mt-0.5">380 &ndash; 510 GSM</div>
                <div className="text-ink-muted text-[11px]">11.2 &ndash; 15.0 oz/yd&sup2;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Costing a specialized custom construction?"
        body="If your target spec isn't in our active library, submit your tech pack. We engineer custom yarn counts, blends and chemical finishes on 30-day sampling lead times."
      />
    </>
  );
}
