import Link from "next/link";
import { ArrowRight, ShieldCheck, BadgeCheck, Leaf, ClipboardCheck } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "BSCI Audited" },
  { icon: Leaf, label: "GOTS Certified" },
  { icon: BadgeCheck, label: "ISO 9001:2015" },
  { icon: ClipboardCheck, label: "Sedex SMETA" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(200,145,47,0.10), transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container-x relative py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-white/55">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                Trading house · est. 2009
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Apparel sourcing and export, handled end to end.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              We buy cloth and finished garments from audited mills across
              South and Southeast Asia, inspect every lot ourselves, and
              deliver it landed and fully documented — on one contract, in
              one currency.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-dark"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                How it works
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-7">
              {BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white/55">
                  <b.icon className="h-4 w-4 text-accent/80" strokeWidth={1.75} />
                  <span className="text-xs font-medium tracking-wide">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                Consignment record
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Cleared for export
              </span>
            </div>

            <dl className="mt-5 space-y-4">
              <Row label="Lane" value="Karachi → Rotterdam" />
              <Row label="Commodity" value="Cotton twill, 8.6 oz" />
              <Row label="Tariff heading" value="HS 5209.32" />
              <Row label="Incoterm" value="FOB" />
              <Row label="Volume" value="1,200 m · 4 colourways" />
            </dl>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wide text-white/40">
                <span>Enquiry</span>
                <span>Sampling</span>
                <span>Production</span>
                <span className="text-accent">Export</span>
              </div>
              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-white/45">{label}</dt>
      <dd className="font-mono text-sm text-white/90">{value}</dd>
    </div>
  );
}
