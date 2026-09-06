"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, SlidersHorizontal } from "lucide-react";
import { getMaterialsContent, type MaterialItem } from "@/lib/content";

export { type MaterialItem };
export const MATERIALS = getMaterialsContent().materials;

export default function Materials({
  variant = "full",
}: {
  variant?: "full" | "teaser";
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalMaterial, setActiveModalMaterial] = useState<MaterialItem | null>(null);

  const materials = getMaterialsContent().materials;

  const filteredItems = materials.filter((m) => {
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory;
  });

  const displayItems = variant === "teaser" ? materials.slice(0, 6) : filteredItems;

  return (
    <section id="materials" className="bg-canvas py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Contracted Mill Loom Library
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Every construction below runs under active capacity allocations across our audited mill partner network.
              Custom yarn counts, blends, and finish modifications available on pre-production sampling lead times.
            </p>
          </div>

          {variant === "full" && (
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-ink-muted mr-1 flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Category:
              </span>
              {[
                { id: "all", label: "All Fabric Groups" },
                { id: "woven", label: "Shirting & Wovens" },
                { id: "denim", label: "Denim & Heavy Twill" },
                { id: "knit", label: "Circular Knits" },
                { id: "heavy", label: "Canvas & Heavyweight" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 transition-all ${
                    selectedCategory === cat.id
                      ? "bg-navy text-white font-semibold shadow-xs"
                      : "bg-paper text-ink border border-line hover:border-line-dark hover:bg-canvas-subtle"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Material Swatch Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((m) => (
            <div
              key={m.id}
              className="paper-card group relative flex flex-col justify-between overflow-hidden rounded-xl"
            >
              <div>
                {/* Visual Swatch Header with Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-line">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Badges on Top of Swatch */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-brass-light backdrop-blur-sm border border-white/10">
                      {m.category}
                    </span>
                    <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[11px] text-white/85 backdrop-blur-sm border border-white/10">
                      {m.weightOz}
                    </span>
                  </div>

                  {/* Title on Swatch Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display text-lg font-bold tracking-tight text-white drop-shadow-sm">
                      {m.name}
                    </h3>
                    <p className="text-xs font-mono text-white/80 line-clamp-1 mt-0.5">
                      {m.comp}
                    </p>
                  </div>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="p-5">
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between border-b border-line-subtle pb-1.5">
                      <span className="text-ink-muted">Weave Structure:</span>
                      <span className="font-medium text-ink text-right">{m.weave}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-line-subtle pb-1.5">
                      <span className="text-ink-muted">Yarn Specification:</span>
                      <span className="font-medium text-ink text-right">{m.yarnCount}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-line-subtle pb-1.5">
                      <span className="text-ink-muted">Metric Weight:</span>
                      <span className="font-semibold text-ink text-right">{m.weight}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-line-subtle pb-1.5">
                      <span className="text-ink-muted">Minimum Run MOQ:</span>
                      <span className="font-semibold text-brass-dark text-right">{m.moq}</span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-ink-muted">Finishing:</span>
                      <span className="font-medium text-ink text-right truncate max-w-[170px]" title={m.finish}>
                        {m.finish}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="border-t border-line-subtle bg-canvas-subtle/50 px-5 py-3.5 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActiveModalMaterial(m)}
                  className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-brass-dark transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Spec Sheet</span>
                </button>

                <Link
                  href={`/contact?intent=swatch&material=${encodeURIComponent(m.id)}`}
                  className="font-mono text-[11px] font-semibold text-brass-dark hover:underline flex items-center gap-1"
                >
                  <span>Request Hanger</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Teaser Mode CTA to Full Archive */}
        {variant === "teaser" && (
          <div className="mt-12 text-center">
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-navy-soft"
            >
              <span>View All Contracted Mill Constructions</span>
              <ArrowRight className="h-4 w-4 text-brass-light" strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>

      {/* Technical Spec Sheet Modal */}
      {activeModalMaterial && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveModalMaterial(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-brass-dark font-semibold">
                  Technical Spec Sheet &middot; {activeModalMaterial.tariff}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {activeModalMaterial.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalMaterial(null)}
                className="rounded-lg p-1.5 text-ink-muted hover:bg-canvas-subtle hover:text-ink"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Composition</span>
                <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.comp}</span>
              </div>
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Weave / Construction</span>
                <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.weave}</span>
              </div>
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Yarn Size</span>
                <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.yarnCount}</span>
              </div>
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Weight (Metric / US)</span>
                <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.weight} &middot; {activeModalMaterial.weightOz}</span>
              </div>
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Dimensional Shrinkage</span>
                <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.shrinkage}</span>
              </div>
              <div className="rounded-lg bg-canvas-subtle p-3 border border-line-subtle">
                <span className="text-ink-muted block text-[10px] uppercase">Minimum Order Quantity</span>
                <span className="font-semibold text-brass-dark mt-0.5 block">{activeModalMaterial.moq}</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-canvas-subtle p-3 text-xs font-mono border border-line-subtle">
              <span className="text-ink-muted block text-[10px] uppercase">Surface Mechanical / Chemical Finish</span>
              <span className="font-semibold text-ink mt-0.5 block">{activeModalMaterial.finish}</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?intent=swatch&material=${encodeURIComponent(activeModalMaterial.id)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-navy py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-soft"
              >
                <span>Request Physical Hanger Swatch</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveModalMaterial(null)}
                className="rounded-lg border border-line bg-paper px-5 py-3 text-xs font-semibold text-ink hover:bg-canvas-subtle"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
