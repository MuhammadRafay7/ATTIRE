"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, SlidersHorizontal } from "lucide-react";

export interface MaterialItem {
  id: string;
  name: string;
  category: "woven" | "denim" | "knit" | "heavy";
  weave: string;
  comp: string;
  yarnCount: string;
  weight: string;
  weightOz: string;
  moq: string;
  shrinkage: string;
  tariff: string;
  image: string;
  finish: string;
}

export const MATERIALS: MaterialItem[] = [
  {
    id: "denim-145",
    name: "Raw Selvedge Denim",
    category: "denim",
    weave: "3×1 right-hand twill, red ID line",
    comp: "100% ring-spun cotton",
    yarnCount: "7s × 7s open-end slub",
    weight: "490 gsm",
    weightOz: "14.5 oz/yd²",
    moq: "1,500 m / wash",
    shrinkage: "Warp < 2.0% (sanforized)",
    tariff: "HS 5209.32.00",
    image: "/images/denim.jpg",
    finish: "Sanforized, skew-controlled",
  },
  {
    id: "poplin-120",
    name: "Combed Shirting Poplin",
    category: "woven",
    weave: "Plain weave 1×1, high density",
    comp: "100% combed long-staple cotton",
    yarnCount: "120s/2 × 120s/2 two-ply",
    weight: "115 gsm",
    weightOz: "3.4 oz/yd²",
    moq: "800 m / colour",
    shrinkage: "Warp < 1.0% / Weft < 1.0%",
    tariff: "HS 5208.32.10",
    image: "/images/poplin.jpg",
    finish: "Mercerized, liquid ammonia press",
  },
  {
    id: "twill-290",
    name: "Mercerized Chino Twill",
    category: "denim",
    weave: "2×1 left-hand twill, steep angle",
    comp: "98% cotton / 2% Roica elastane",
    yarnCount: "30s/2 × 20s + 40D",
    weight: "290 gsm",
    weightOz: "8.6 oz/yd²",
    moq: "1,200 m / colour",
    shrinkage: "Warp < 1.8% / Weft < 1.5%",
    tariff: "HS 5209.12.00",
    image: "/images/twill.jpg",
    finish: "Double mercerized, peach skin hand",
  },
  {
    id: "oxford-140",
    name: "Yarn-Dyed Oxford Cloth",
    category: "woven",
    weave: "2×1 basket weave (Oxford)",
    comp: "100% organic ring-spun cotton",
    yarnCount: "40s/2 × 20s/1",
    weight: "140 gsm",
    weightOz: "4.1 oz/yd²",
    moq: "800 m / colour",
    shrinkage: "Warp < 1.5% / Weft < 1.2%",
    tariff: "HS 5208.42.00",
    image: "/images/oxford.jpg",
    finish: "Garment wash ready, resin free",
  },
  {
    id: "canvas-405",
    name: "Heavyweight Duck Canvas",
    category: "heavy",
    weave: "2×2 plied-yarn duck basket weave",
    comp: "100% unbleached raw cotton",
    yarnCount: "10s/2 × 10s/2 heavy ply",
    weight: "405 gsm",
    weightOz: "12.0 oz/yd²",
    moq: "1,000 m / run",
    shrinkage: "Warp < 2.5% (natural state)",
    tariff: "HS 5209.11.00",
    image: "/images/canvas.jpg",
    finish: "Natural greige or water-repellent DWR",
  },
  {
    id: "jersey-200",
    name: "Combed Single Jersey",
    category: "knit",
    weave: "Circular knit, 24 gauge",
    comp: "95% combed organic cotton / 5% spandex",
    yarnCount: "32s/1 combed compact",
    weight: "200 gsm",
    weightOz: "5.9 oz/yd²",
    moq: "600 kg / shade",
    shrinkage: "Length < 3.0% / Width < 2.5%",
    tariff: "HS 6006.22.00",
    image: "/images/jersey.jpg",
    finish: "Bio-polished enzymes, anti-pilling",
  },
  {
    id: "corduroy-320",
    name: "11-Wale Cut Pile Corduroy",
    category: "heavy",
    weave: "11-wale dense rib cut pile",
    comp: "100% BCI sustainable cotton",
    yarnCount: "16s × 20s + 32s pile",
    weight: "320 gsm",
    weightOz: "9.4 oz/yd²",
    moq: "900 m / colour",
    shrinkage: "Warp < 2.0% / Weft < 1.5%",
    tariff: "HS 5801.22.00",
    image: "/images/corduroy.jpg",
    finish: "Soft brush tumble, luster wash",
  },
  {
    id: "flannel-200",
    name: "Brushed Twill Flannel",
    category: "woven",
    weave: "2×2 broken twill plaid",
    comp: "100% ring-spun brushed cotton",
    yarnCount: "20s/1 × 10s/1 soft twist",
    weight: "200 gsm",
    weightOz: "5.9 oz/yd²",
    moq: "1,000 m / pattern",
    shrinkage: "Warp < 2.0% / Weft < 2.0%",
    tariff: "HS 5208.43.00",
    image: "/images/flannel.jpg",
    finish: "Double-face mechanical fleece brush",
  },
];

export default function Materials({
  variant = "full",
}: {
  variant?: "full" | "teaser";
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalMaterial, setActiveModalMaterial] = useState<MaterialItem | null>(null);

  const filteredItems = MATERIALS.filter((m) => {
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory;
  });

  const displayItems = variant === "teaser" ? MATERIALS.slice(0, 6) : filteredItems;

  return (
    <section className="bg-canvas-subtle/50 py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Contracted Mill Material Library
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Every construction below is running across our contracted spinning and weaving mills today.
              If your specification differs in weight, yarn count or blend, submit your tech pack &mdash;
              we engineer custom constructions on 30-day sampling cycles.
            </p>
          </div>

          {variant === "teaser" ? (
            <Link
              href="/materials"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-navy-soft"
            >
              <span>Explore Complete Library</span>
              <ArrowRight className="h-3.5 w-3.5 text-brass-light" />
            </Link>
          ) : (
            <Link
              href="/contact?intent=swatches"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brass px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-navy shadow-sm hover:bg-brass-light"
            >
              <span>Request Physical Swatch Hanger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {/* Category Filters (Full view only) */}
        {variant === "full" && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-line pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted mr-2 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-brass" />
              Category:
            </span>
            {[
              { id: "all", label: "All Fabrics (8)" },
              { id: "denim", label: "Denim & Chino Twills" },
              { id: "woven", label: "Fine Shirting & Flannel" },
              { id: "knit", label: "Circular Knits & Jersey" },
              { id: "heavy", label: "Duck Canvas & Corduroy" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-navy text-white shadow-sm font-semibold"
                    : "bg-paper text-ink-muted hover:text-ink hover:bg-canvas-subtle border border-line"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Material Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((m) => (
            <div
              key={m.id}
              className="paper-card group flex flex-col overflow-hidden rounded-xl border border-line bg-paper"
            >
              {/* Photo swatch with realistic texture */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="rounded bg-black/60 backdrop-blur px-2 py-0.5 font-mono text-[11px] font-semibold text-brass-light">
                    {m.weightOz}
                  </span>
                  <span className="rounded bg-black/60 backdrop-blur px-2 py-0.5 font-mono text-[10px] text-white/80">
                    {m.tariff}
                  </span>
                </div>
              </div>

              {/* Specification Content */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {m.name}
                  </h3>
                  <div className="mt-1 text-xs font-medium text-brass-dark">
                    {m.weave}
                  </div>
                  <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                    {m.comp} &middot; {m.yarnCount}
                  </p>

                  <dl className="mt-4 space-y-1.5 border-t border-line-subtle pt-3 text-[11px]">
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Weight</dt>
                      <dd className="font-mono text-ink font-semibold tabular-nums">{m.weight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Minimum Order</dt>
                      <dd className="font-mono text-ink font-semibold tabular-nums">{m.moq}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Dimensional Shrinkage</dt>
                      <dd className="font-mono text-ink font-semibold tabular-nums">{m.shrinkage}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 border-t border-line-subtle pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalMaterial(m)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-brass-dark"
                  >
                    <Eye className="h-3.5 w-3.5 text-brass" />
                    <span>Technical Dossier</span>
                  </button>

                  <Link
                    href={`/contact?material=${encodeURIComponent(m.name)}`}
                    className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brass-dark hover:underline"
                  >
                    Cost Order &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Swatch Hanger Banner */}
        <div className="mt-14 rounded-xl border border-line bg-paper p-7 sm:p-9 shadow-sm flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
              Physical swatch hangers ship free to UK, EU &amp; US buyers
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Select the constructions and blends you are costing this season. We dispatch a 30cm hanger
              of genuine mill-finish swatches complete with laboratory test reports anywhere in Western Europe
              or North America within 72 hours &mdash; at our direct cost.
            </p>
          </div>

          <Link
            href="/contact?intent=swatch-hanger"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-navy-soft"
          >
            <span>Order Swatch Hangers</span>
            <ArrowRight className="h-4 w-4 text-brass-light" />
          </Link>
        </div>
      </div>

      {/* Technical Dossier Modal */}
      {activeModalMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-xl border border-line bg-paper p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brass-dark">
                  Mill Spec Sheet &middot; {activeModalMaterial.tariff}
                </span>
                <h4 className="mt-1 font-display text-2xl font-bold text-ink">
                  {activeModalMaterial.name}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalMaterial(null)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-muted hover:bg-canvas-subtle hover:text-ink"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative h-44 w-full overflow-hidden rounded-xl border border-line">
                <Image
                  src={activeModalMaterial.image}
                  alt={activeModalMaterial.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-ink">Weave:</span>{" "}
                  <span className="text-ink-muted">{activeModalMaterial.weave}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Yarn Count:</span>{" "}
                  <span className="font-mono text-ink-muted">{activeModalMaterial.yarnCount}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Weight:</span>{" "}
                  <span className="font-mono text-ink-muted">{activeModalMaterial.weight} ({activeModalMaterial.weightOz})</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Chemical Finish:</span>{" "}
                  <span className="text-ink-muted">{activeModalMaterial.finish}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Shrinkage Tolerance:</span>{" "}
                  <span className="font-mono text-ink-muted">{activeModalMaterial.shrinkage}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Production MOQ:</span>{" "}
                  <span className="font-mono text-ink-muted">{activeModalMaterial.moq}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <span className="font-mono text-xs text-ink-muted">
                Chain of custody: GOTS / OEKO-TEX
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModalMaterial(null)}
                  className="rounded-md border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-canvas-subtle"
                >
                  Close
                </button>
                <Link
                  href={`/contact?material=${encodeURIComponent(activeModalMaterial.name)}`}
                  onClick={() => setActiveModalMaterial(null)}
                  className="rounded-md bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-soft"
                >
                  Request Sample &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
