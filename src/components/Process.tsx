"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  FileCheck,
  ClipboardList,
  Stamp,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface Stage {
  n: string;
  title: string;
  subtitle: string;
  summary: string;
  documentName: string;
  documentType: string;
  docIcon: typeof FileSpreadsheet;
  content: {
    reference: string;
    items: { label: string; value: string; highlight?: boolean }[];
    stampText: string;
    footerNote: string;
  };
}

const STAGES: Stage[] = [
  {
    n: "01",
    title: "Enquiry & Open-Book Costing",
    subtitle: "Turnaround: 48 working hours",
    summary:
      "Send a tech pack, spec sheet or reference garment. Within two working days you receive a feasibility assessment and an open FOB cost sheet with every fiber, labor and shipping line item disclosed.",
    documentName: "Open FOB Cost Breakdown Sheet",
    documentType: "Document Deliverable 01",
    docIcon: FileSpreadsheet,
    content: {
      reference: "SPEC-COST-2025-410",
      items: [
        { label: "Raw Fiber / Greige Yarn (Ring-spun)", value: "$3.95 (41.2%)" },
        { label: "Dyeing & Chemical Finishing", value: "$1.38 (14.4%)" },
        { label: "CMT Labor (Cut, Make & Trim)", value: "$2.40 (25.0%)" },
        { label: "Accessories, Trims & YKK Zips", value: "$0.72 (7.5%)" },
        { label: "Export Packaging & Export Cartons", value: "$0.32 (3.3%)" },
        { label: "Port Drayage & Customs Documentation", value: "$0.31 (3.2%)" },
        { label: "Attire Services Disclosed Margin", value: "$0.52 (5.4%)", highlight: true },
        { label: "Total Landed FOB Unit Price", value: "$9.60 / pc", highlight: true },
      ],
      stampText: "CERTIFIED OPEN-BOOK · ZERO SECONDARY COMMISSions",
      footerNote: "Calculated for 3,000 unit order window · 60-day price validity",
    },
  },
  {
    n: "02",
    title: "Sampling, Lab Dips & Booking",
    subtitle: "Proto, Fit & Sealed PP Sample",
    summary:
      "We cut proto patterns, run lab dips against your Pantone references, and submit physical fit garments. Bulk line capacity is only committed once the pre-production sample is signed and sealed.",
    documentName: "Technical Fit & Spectrophotometer Report",
    documentType: "Document Deliverable 02",
    docIcon: FileCheck,
    content: {
      reference: "LAB-DIP-TCX-8821",
      items: [
        { label: "Pantone Reference Standard", value: "PANTONE 19-4024 TCX (Dress Blues)" },
        { label: "Spectrophotometer Delta-E", value: "0.38 (Passed, Tolerance < 0.80)" },
        { label: "Metamerism Index (D65 vs TL84)", value: "Grade 4-5 (Negligible flare)" },
        { label: "Wash Dimensional Stability (3× 40°C)", value: "Warp -1.4% / Weft -0.8%" },
        { label: "Spirality / Torque after wash", value: "1.2% (Standard max 3.0%)" },
        { label: "Sealed Sample Serial ID", value: "PP-SEAL-#9412-APPROVED", highlight: true },
      ],
      stampText: "PP SAMPLE SEALED FOR BULK PRODUCTION",
      footerNote: "Signed by Senior Technical Merchandiser, Karachi Office",
    },
  },
  {
    n: "03",
    title: "On-Site Production & Statistical QC",
    subtitle: "AQL 2.5 Major / 1.5 Critical",
    summary:
      "Our salaried inspectors supervise cutting, mid-production inline checks, and final statistical audits according to ISO 2859-1 standards. No container is sealed without a signed pass certificate.",
    documentName: "AQL 2.5 Statistical Inspection Certificate",
    documentType: "Document Deliverable 03",
    docIcon: ClipboardList,
    content: {
      reference: "QC-INSPECT-ISO-2859",
      items: [
        { label: "Inspection Sampling Level", value: "General Inspection Level II (Normal)" },
        { label: "Production Lot Size / Sample", value: "5,000 pcs lot / 200 pcs sample inspected" },
        { label: "Critical Defects Detected", value: "0 found (Acceptable: 0) — PASS", highlight: true },
        { label: "Major Defects Detected", value: "2 found (Acceptable: 10 max) — PASS" },
        { label: "Minor Defects Detected", value: "5 found (Acceptable: 14 max) — PASS" },
        { label: "100% Metal / Needle Detection", value: "Passed (Calibrated 1.0mm Ferrous test)" },
        { label: "Colorfastness to Crocking", value: "Dry: 4-5 / Wet: 4" },
      ],
      stampText: "FINAL SHIPMENT PASSED · CLEARED FOR STOWAGE",
      footerNote: "Photographic defect log archived with GPS and mill timestamp",
    },
  },
  {
    n: "04",
    title: "Export Logistics & Customs Release",
    subtitle: "Landed DDP, CIF or FOB Entry",
    summary:
      "Full trade documentation, ocean freight booking, carrier bill of lading, and destination customs clearance — delivered directly to your logistics depot with zero tariff reassessment surprises.",
    documentName: "Clean Ocean Bill of Lading & Origin Pack",
    documentType: "Document Deliverable 04",
    docIcon: Stamp,
    content: {
      reference: "BOL-TRADE-99042",
      items: [
        { label: "Ocean Carrier & Vessel", value: "Maersk Line &middot; M/V Maersk Gibraltar" },
        { label: "Port of Loading / Discharge", value: "Karachi (PKKHI) &rarr; Rotterdam (NLRTM)" },
        { label: "HS Tariff Code Verified", value: "HS 5209.32.00 (Dual Classification Signed)" },
        { label: "Commercial Invoice Set", value: "Invoice # AS-EXP-2025-0814" },
        { label: "Certificate of Origin", value: "Chamber of Commerce Verified # CC-9102" },
        { label: "Preferential Duty Filing", value: "GSP Form A / REX Statement on file" },
        { label: "Customs Entry Status", value: "Duty Paid &middot; Quay Release Granted", highlight: true },
      ],
      stampText: "CLEAN ON BOARD · CUSTOMS ENTRY COMPLETE",
      footerNote: "Consignment delivered on agreed landed terms with complete audit trail",
    },
  },
];

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = STAGES[activeIdx];

  return (
    <section className="bg-canvas py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Four stages, each closed by a real trade document
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Every milestone closes with an auditable physical record &mdash; an open cost sheet,
            a spectrophotometer lab dip, a statistical AQL certificate &mdash; not a vague status email.
          </p>
        </div>

        {/* Interactive Stepper Navigation */}
        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STAGES.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.n}
                onClick={() => setActiveIdx(idx)}
                className={`flex flex-col text-left rounded-xl p-5 transition-all border ${
                  isSelected
                    ? "border-navy bg-navy text-white shadow-md"
                    : "border-line bg-paper text-ink hover:border-line-dark hover:bg-canvas-subtle"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-brass-light" : "text-brass"
                    }`}
                  >
                    STAGE {s.n}
                  </span>
                  <s.docIcon
                    className={`h-4 w-4 ${
                      isSelected ? "text-brass-light" : "text-ink-muted"
                    }`}
                  />
                </div>
                <h3 className="mt-3 font-display font-bold text-sm leading-snug">
                  {s.title}
                </h3>
                <p
                  className={`mt-1 text-xs ${
                    isSelected ? "text-white/70" : "text-ink-muted"
                  }`}
                >
                  {s.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Document Inspector Panel */}
        <div className="mt-8 grid grid-cols-1 gap-8 rounded-xl border border-line bg-canvas-subtle p-6 sm:p-9 lg:grid-cols-12 lg:items-center">
          {/* Left: Stage description & deliverables */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
                Milestone Stage {activeStage.n}
              </span>
              <span className="text-line-dark text-slate-400">&middot;</span>
              <span className="text-xs text-ink-muted">{activeStage.subtitle}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              {activeStage.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              {activeStage.summary}
            </p>

            <div className="mt-8 border-t border-line pt-5">
              <div className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-2">
                Milestone Output:
              </div>
              <div className="flex items-center gap-2.5 font-semibold text-sm text-ink">
                <CheckCircle2 className="h-4 w-4 text-brass" />
                <span>{activeStage.documentName}</span>
              </div>
            </div>
          </div>

          {/* Right: Authentic Trade Document Ledger Facsimile */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl border border-line bg-paper p-6 sm:p-7 shadow-sm">
              {/* Document Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-line pb-4 gap-2">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brass-dark font-semibold">
                    {activeStage.documentType}
                  </span>
                  <h4 className="font-mono text-sm font-bold text-ink tracking-tight mt-0.5">
                    {activeStage.documentName}
                  </h4>
                </div>
                <div className="rounded bg-canvas-subtle px-2.5 py-1 font-mono text-[11px] text-ink-muted border border-line">
                  REF: {activeStage.content.reference}
                </div>
              </div>

              {/* Document Line Items */}
              <div className="mt-4 divide-y divide-line-subtle text-xs">
                {activeStage.content.items.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between py-2.5 ${
                      item.highlight
                        ? "font-semibold text-ink bg-brass-soft/40 -mx-2 px-2 rounded"
                        : "text-ink/85"
                    }`}
                  >
                    <span className="text-ink-muted pr-4">{item.label}</span>
                    <span className="font-mono text-right shrink-0 font-semibold tabular-nums text-ink">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Document Official Stamp & Sign-off */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line pt-4">
                <div className="inline-flex items-center gap-1.5 rounded border border-emerald-600/30 bg-emerald-50 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  {activeStage.content.stampText}
                </div>
                <div className="text-[11px] font-mono text-ink-muted text-right">
                  {activeStage.content.footerNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
