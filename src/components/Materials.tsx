import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const MATERIALS = [
  {
    name: "Denim",
    weave: "3×1 twill",
    comp: "100% cotton",
    weight: "14.5 oz",
    moq: "1,500 m",
    swatch:
      "repeating-linear-gradient(115deg, rgba(255,255,255,.18) 0 1.5px, transparent 1.5px 5px), linear-gradient(160deg,#3a4d7c,#1c2a52)",
  },
  {
    name: "Poplin",
    weave: "Plain weave, 120s",
    comp: "100% combed cotton",
    weight: "115 gsm",
    moq: "800 m",
    swatch:
      "repeating-linear-gradient(0deg, rgba(0,0,0,.10) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.10) 0 1px, transparent 1px 3px), #dcd8cc",
  },
  {
    name: "Jersey",
    weave: "Single jersey, 24 gg",
    comp: "95% cotton / 5% elastane",
    weight: "200 gsm",
    moq: "600 kg",
    swatch:
      "repeating-linear-gradient(90deg, rgba(0,0,0,.13) 0 2px, rgba(255,255,255,.1) 2px 4px, transparent 4px 7px), linear-gradient(180deg,#8d9384,#6e7566)",
  },
  {
    name: "Twill",
    weave: "2×1 twill, mercerised",
    comp: "98% cotton / 2% elastane",
    weight: "290 gsm",
    moq: "1,200 m",
    swatch:
      "repeating-linear-gradient(58deg, rgba(0,0,0,.16) 0 2px, transparent 2px 6px), linear-gradient(180deg,#b4966a,#93764c)",
  },
  {
    name: "Canvas",
    weave: "2×2 basket weave",
    comp: "100% cotton",
    weight: "405 gsm",
    moq: "1,000 m",
    swatch:
      "repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0 3px, transparent 3px 7px), repeating-linear-gradient(90deg, rgba(0,0,0,.16) 0 3px, transparent 3px 7px), #b9ae94",
  },
  {
    name: "Corduroy",
    weave: "11-wale cut pile",
    comp: "100% cotton",
    weight: "320 gsm",
    moq: "900 m",
    swatch:
      "repeating-linear-gradient(90deg, rgba(0,0,0,.26) 0 2px, transparent 2px 4px, rgba(255,255,255,.12) 4px 6px, transparent 6px 11px), linear-gradient(180deg,#8e4437,#6e3227)",
  },
  {
    name: "Oxford",
    weave: "Oxford basket, yarn-dyed",
    comp: "100% cotton",
    weight: "140 gsm",
    moq: "800 m",
    swatch:
      "repeating-linear-gradient(0deg, rgba(30,45,90,.42) 0 3px, transparent 3px 6px), repeating-linear-gradient(90deg, rgba(30,45,90,.42) 0 3px, transparent 3px 6px), #e4e1d6",
  },
  {
    name: "Flannel",
    weave: "Brushed check twill",
    comp: "100% brushed cotton",
    weight: "200 gsm",
    moq: "1,000 m",
    swatch:
      "repeating-linear-gradient(0deg, rgba(14,18,32,.30) 0 9px, transparent 9px 22px), repeating-linear-gradient(90deg, rgba(14,18,32,.30) 0 9px, transparent 9px 22px), #9c3a2e",
  },
];

export default function Materials({
  variant = "full",
}: {
  variant?: "full" | "teaser";
}) {
  const items = variant === "teaser" ? MATERIALS.slice(0, 6) : MATERIALS;

  return (
    <section className="bg-mist py-24 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
              Material library
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Cloth we already hold capacity for
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Everything below is in production at a contracted mill today. If
            your spec isn&apos;t here, send it — most of what we run started
            as a buyer&apos;s tech pack.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((m) => (
            <div
              key={m.name}
              className="overflow-hidden rounded-xl border border-line bg-paper"
            >
              <div
                className="h-20 w-full"
                style={{ backgroundImage: m.swatch }}
                aria-hidden
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-ink">{m.name}</h3>
                <dl className="mt-2.5 space-y-1 text-xs text-muted">
                  <div className="flex justify-between gap-2">
                    <dt>Comp</dt>
                    <dd className="text-right text-ink/80">{m.comp}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Weight</dt>
                    <dd className="text-ink/80">{m.weight}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>MOQ</dt>
                    <dd className="text-ink/80">{m.moq}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>

        {variant === "teaser" ? (
          <div className="mt-10 text-center">
            <Link
              href="/materials"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent-dark"
            >
              View the full material library
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-base font-semibold text-ink">
                Swatch cards ship free
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                Name the constructions you want and we post a hanger of
                physical mill-production swatches anywhere in the UK, EU or
                US, at our cost.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-navy"
            >
              Order swatch cards
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
