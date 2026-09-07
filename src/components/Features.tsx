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
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { getFeaturesContent, type FeaturesContent } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  Ruler,
  ScanSearch,
  FileCheck2,
  Ship,
  FileStack,
};

export default function Features({
  variant = "full",
  title = "Everything between a tech pack and a landed container",
  lede = "Most sourcing agents introduce a factory and step back once the order leaves port. We buy the goods outright on our own balance sheet, so the same team stays accountable from first yarn spin to loading bay clearance.",
  content: initialContent,
}: {
  variant?: "full" | "teaser";
  eyebrow?: string;
  title?: string;
  lede?: string;
  content?: FeaturesContent;
}) {
  const content = initialContent ?? getFeaturesContent();
  const rawItems = variant === "teaser" ? content.features.slice(0, 3) : content.features;
  const items = rawItems.map((f) => ({
    ...f,
    icon: ICON_MAP[f.iconName] || HelpCircle,
  }));

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
