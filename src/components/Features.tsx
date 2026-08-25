import Link from "next/link";
import {
  Search,
  Ruler,
  ScanSearch,
  FileCheck2,
  Ship,
  FileStack,
  ArrowRight,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Search,
    title: "Mill sourcing & costing",
    body: "We match your construction, MOQ and price ceiling against mills we already hold capacity with, and return an open cost comparison — not a single quote.",
    points: ["Fabric & trim sourcing", "Open cost breakdowns", "Capacity booking"],
  },
  {
    icon: Ruler,
    title: "Sampling & development",
    body: "Proto, fit and pre-production samples run through our own merchandisers. Nothing goes to bulk until the PP sample is signed off.",
    points: ["Tech-pack development", "Lab dips & fit samples", "Sealed PP sample"],
  },
  {
    icon: ScanSearch,
    title: "Inline & final QC",
    body: "Our own inspectors sit on the line at cutting, mid-production and packing, to AQL 2.5 on majors — not a report read after the fact.",
    points: ["Inline inspection", "AQL 2.5 final inspection", "Dated photo reports"],
  },
  {
    icon: FileCheck2,
    title: "Compliance & testing",
    body: "GOTS, OEKO-TEX, BSCI and Sedex SMETA chains of custody, with SGS or Intertek lab reports on file for every shipped lot.",
    points: ["GOTS & OEKO-TEX", "BSCI / Sedex SMETA", "SGS & Intertek testing"],
  },
  {
    icon: Ship,
    title: "Freight & customs",
    body: "FCL, LCL and air on contracted carrier rates, quoted FOB, CIF or landed DDP, with duty and tariff classification checked twice.",
    points: ["FCL, LCL & air freight", "FOB, CIF & DDP terms", "Tariff classification"],
  },
  {
    icon: FileStack,
    title: "Trade documentation",
    body: "Commercial invoice, packing list, bill of lading, certificate of origin and preference forms — complete before the vessel sails.",
    points: ["Full document set", "Certificates of origin", "GSP / preference forms"],
  },
];

export default function Features({
  variant = "full",
  eyebrow = "Capabilities",
  title = "Everything between a tech pack and a landed container",
  lede = "Most sourcing agents step back once the order ships. We buy the goods outright, so the same team stays accountable from first sample to final delivery.",
}: {
  variant?: "full" | "teaser";
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  const items = variant === "teaser" ? FEATURES.slice(0, 3) : FEATURES;

  return (
    <section className="bg-mist py-24 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{lede}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-line bg-paper p-6 transition-shadow hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-navy">
                <f.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
              {variant === "full" && (
                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="text-xs font-medium uppercase tracking-wide text-muted/80"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {variant === "teaser" && (
          <div className="mt-10 text-center">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent-dark"
            >
              View all capabilities
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
