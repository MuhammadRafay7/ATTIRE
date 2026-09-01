import Link from "next/link";
import {
  Search,
  Ruler,
  ScanSearch,
  FileCheck2,
  Ship,
  FileStack,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Search,
    pillar: "Procurement & Costing",
    title: "Mill sourcing & open-book costing",
    body: "We match your yarn construction, MOQ and price ceiling against mills we hold standing capacity with, and return an open cost comparison showing raw fiber %, CMT, dyeing and logistics — never an opaque markup.",
    points: ["Open-book cost breakdown", "Greige yarn & fiber provenance", "Guaranteed loom capacity booking"],
  },
  {
    icon: Ruler,
    pillar: "Technical Sampling",
    title: "Technical fit & sealed pre-production",
    body: "Proto, fit, and pre-production samples run through our own on-site merchandisers. We review grading, balance shrinkage, and seal the pre-production sample before bulk yardage is touched.",
    points: ["Tech-pack development & grading", "Pantone TCX spectrophotometer lab dips", "Sealed master PP sample"],
  },
  {
    icon: ScanSearch,
    pillar: "Quality Control",
    title: "Salaried on-site inline & final QC",
    body: "Our own inspectors sit on the factory line during cutting, sewing and pressing, working to AQL 2.5 on majors and 1.5 on criticals — not a third-party checklist received weeks after the fact.",
    points: ["Mid-production inline checkpoints", "AQL 2.5 statistical final inspection", "100% metal detection & dated photo logs"],
  },
  {
    icon: FileCheck2,
    pillar: "Accreditation",
    title: "Accredited testing & chain of custody",
    body: "GOTS, OEKO-TEX Standard 100, BSCI, and Sedex SMETA 4-pillar certifications maintained with accredited SGS and Intertek lab test reports on file for every shipped production lot.",
    points: ["GOTS & OEKO-TEX chain of custody", "BSCI & Sedex labor audits on file", "SGS / Intertek dimensional & colorfastness tests"],
  },
  {
    icon: Ship,
    pillar: "Freight & Customs",
    title: "Freight, duty & customs clearance",
    body: "FCL container contracts, LCL consolidation and chartered air freight quoted under clear Incoterms (FOB, CIF, or landed DDP), with destination duty classifications verified before the vessel sails.",
    points: ["FCL, LCL consolidation & air freight", "Clear FOB, CIF, or landed DDP terms", "Dual-checked HS tariff classification"],
  },
  {
    icon: FileStack,
    pillar: "Trade Documentation",
    title: "Complete international trade documentation",
    body: "Commercial invoice, itemized packing list, clean on-board ocean bill of lading, chamber certificate of origin, and preferential trade duty forms (GSP Form A / EUR.1) completed before sailing.",
    points: ["Full commercial trade document pack", "Chamber of Commerce certificates of origin", "Preferential tariff & duty reduction filings"],
  },
];

export default function Features({
  variant = "full",
  title = "Everything between a tech pack and a landed container",
  lede = "Most sourcing agents introduce a factory and step back once the order leaves port. We buy the goods outright on our own balance sheet, so the same team stays accountable from first yarn spin to loading bay clearance.",
}: {
  variant?: "full" | "teaser";
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  const items = variant === "teaser" ? FEATURES.slice(0, 3) : FEATURES;

  return (
    <section className="bg-canvas-subtle/60 py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {lede}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="paper-card relative flex flex-col justify-between rounded-xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line-subtle pb-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brass-dark">
                    {f.pillar}
                  </span>
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-navy text-brass-light shadow-sm">
                    <f.icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {f.body}
                </p>
              </div>

              {variant === "full" && (
                <div className="mt-6 border-t border-line-subtle pt-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-2 font-medium">
                    Verified Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs font-medium text-ink/85"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Accountability Seam: Agent vs Principal Trading House */}
        {variant === "full" && (
          <div className="mx-auto mt-16 max-w-5xl rounded-xl border border-line bg-canvas p-7 sm:p-9 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
              Commercial Structure &amp; Balance Sheet Accountability
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-line-subtle bg-canvas-subtle p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                  <ShieldAlert className="h-4 w-4" />
                  Commission Broker / Middleman Model
                </div>
                <ul className="mt-3 space-y-2 text-xs text-ink-muted leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>Takes a 5&ndash;10% fee from the factory, hiding real yarn &amp; CMT costs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>Zero balance sheet liability: if a lot fails QC, the buyer must argue with the mill.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>Disappears at the port gate; freight claims and customs delays are your problem.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-brass/30 bg-brass-soft/40 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                  <CheckCircle2 className="h-4 w-4 text-brass" />
                  Attire Services Direct Principal Model
                </div>
                <ul className="mt-3 space-y-2 text-xs text-ink/85 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-brass font-bold">&#10003;</span>
                    <span>We purchase the order from the mill and sell directly to you on one contract.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-brass font-bold">&#10003;</span>
                    <span>Our salaried inspectors have unilateral authority to halt substandard lots.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-brass font-bold">&#10003;</span>
                    <span>Landed DDP delivery: we absorb the delay or freight differential if the error is ours.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {variant === "teaser" && (
          <div className="mt-12 text-center">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-navy-soft"
            >
              <span>Explore Full Capabilities &amp; Compliance Matrix</span>
              <ArrowRight className="h-4 w-4 text-brass-light" strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
