"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ShowcaseStation {
  id: string;
  name: string;
  badge: string;
  location: string;
  capacityLabel: string;
  capacityMetric: string;
  imageSrc: string;
  imageAlt: string;
  tag1: string;
  tag2: string;
}

const STATIONS: ShowcaseStation[] = [
  {
    id: "weaving",
    name: "Air-Jet Weaving Facility",
    badge: "Contract Ref: AS-SD-08 · PDM Audited",
    location: "Sindh Mill Unit #08 · Direct Loom Allocation",
    capacityLabel: "Running Mill Capacity",
    capacityMetric: "480,000 m / month",
    imageSrc: "/images/weaving.jpg",
    imageAlt: "Industrial air-jet weaving floor with automated high-speed looms",
    tag1: "Tsudakoma & Picanol Air-Jets",
    tag2: "Active Production Allocation",
  },
  {
    id: "freight",
    name: "Deepwater Ocean Freight",
    badge: "B/L Ref: AS-OCEAN-25 · Carrier Volume Agreement",
    location: "Port Qasim → Rotterdam, Antwerp & Southampton",
    capacityLabel: "Contracted Marine Volume",
    capacityMetric: "2,400+ TEU / year",
    imageSrc: "/images/maritime.jpg",
    imageAlt: "Commercial container vessel berthed at deepwater export terminal",
    tag1: "Direct Maersk & MSC Contracts",
    tag2: "Full 110% Marine Cargo Liability",
  },
  {
    id: "quality",
    name: "Floor Quality Governance",
    badge: "ISO 2859-1 Sampling · Dated Photo Dossiers",
    location: "Karachi & Ho Chi Minh City Quality Stations",
    capacityLabel: "Quality Defect Ceiling",
    capacityMetric: "AQL 2.5 Major / 1.5 Crit",
    imageSrc: "/images/inspection.jpg",
    imageAlt: "Quality inspector inspecting textile weave with thread counting loupe",
    tag1: "Spectrophotometer Delta-E < 0.8",
    tag2: "15 Salaried QC Controllers",
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<ShowcaseStation>(STATIONS[0]);

  return (
    <section className="relative overflow-hidden bg-canvas text-ink border-b border-line">
      {/* Soft Ambient Radial Illumination Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-brass/10 blur-3xl" />

      <div className="container-x relative pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
        {/* Centered Hero Header Architecture */}
        <div className="mx-auto max-w-3xl text-center sm:max-w-4xl">
          {/* Main Headline */}
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.15rem]">
            Direct Principal Apparel Trading, Handled on Our{" "}
            <span className="relative inline-block whitespace-nowrap text-brass-dark">
              Own Balance Sheet
              {/* Refined Hand-Crafted Underline Stroke */}
              <svg
                className="absolute -bottom-2.5 left-0 w-full text-brass/40"
                height="8"
                viewBox="0 0 260 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C65 2.5 195 2 258 5.5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle / Value Lede */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
            We purchase bulk greige cloth and finished garments outright from 63 audited spinning and weaving mills across
            South and Southeast Asia. Our salaried QC inspectors control the factory floor, delivering
            customs-cleared cargo directly to your dock &mdash; on one contract, in one currency.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy-soft hover:shadow-md"
            >
              <span>Initiate Landed Costing</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>

            <Link
              href="/process"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-line bg-paper px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-canvas-subtle"
            >
              <span>How It Works &mdash; 4-Stage Protocol</span>
            </Link>
          </div>

          {/* Institutional Reassurance Guarantee Line */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>48h Open FOB Cost Breakdown</span>
            </span>
            <span className="hidden sm:inline text-line-dark">&bull;</span>
            <span>Zero Broker Markups</span>
            <span className="hidden sm:inline text-line-dark">&bull;</span>
            <span>Principal Cargo Liability</span>
          </div>
        </div>

        {/* Interactive Physical Asset Showcase Console */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-lg">
            {/* Interactive Facility Station Switcher Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line bg-canvas-subtle/70 px-4 py-2 text-xs font-mono">
              <div className="flex items-center gap-1 overflow-x-auto py-1">
                {STATIONS.map((station) => {
                  const isActive = activeTab.id === station.id;
                  return (
                    <button
                      key={station.id}
                      onClick={() => setActiveTab(station)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all text-left whitespace-nowrap ${
                        isActive
                          ? "bg-paper text-ink font-semibold shadow-xs border border-line"
                          : "text-ink-muted hover:text-ink hover:bg-paper/50"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-brass" : "bg-line-dark"}`} />
                      <span>{station.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-ink-muted font-medium pt-1 sm:pt-0">
                <span className="truncate">{activeTab.badge}</span>
              </div>
            </div>

            {/* High-Resolution Documentary Viewport */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black/10">
              <Image
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1152px"
                className="object-cover transition-opacity duration-300"
              />

              {/* Minimalist Floating Overlay Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="rounded bg-black/70 px-2.5 py-1 font-mono text-[10px] sm:text-xs font-medium uppercase tracking-wider text-brass-light border border-white/15 backdrop-blur-md">
                  {activeTab.tag1}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-emerald-950/80 px-2.5 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {activeTab.tag2}
                </span>
              </div>

              {/* Bottom Image Sub-Location Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                <div className="font-display font-bold text-lg sm:text-xl leading-tight text-white drop-shadow-sm">
                  {activeTab.name}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-white/80">
                  {activeTab.location}
                </div>
              </div>
            </div>

            {/* Bottom 3-Pillar Operational Footnote Bar */}
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-y-0 sm:divide-x border-t border-line bg-paper text-xs font-mono">
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-ink-muted uppercase text-[10px] tracking-wider block">Running Mill Capacity</span>
                <span className="font-bold text-ink text-sm sm:text-base mt-0.5 block">480,000 m / mo</span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-ink-muted uppercase text-[10px] tracking-wider block">Marine Cargo Volume</span>
                <span className="font-bold text-ink text-sm sm:text-base mt-0.5 block">2,400+ TEU / year</span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="text-ink-muted uppercase text-[10px] tracking-wider block">Quality Defect Ceiling</span>
                <span className="font-bold text-ink text-sm sm:text-base mt-0.5 block">AQL 2.5 Major / 1.5 Crit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
