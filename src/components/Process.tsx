"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  FileCheck,
  ClipboardList,
  Stamp,
  CheckCircle2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { getProcessContent, type ProcessContent } from "@/lib/content";

const DOC_ICON_MAP: Record<string, LucideIcon> = {
  FileSpreadsheet,
  FileCheck,
  ClipboardList,
  Stamp,
};

export default function Process({ content: initialContent }: { content?: ProcessContent }) {
  const content = initialContent ?? getProcessContent();
  const stages = content.stages.map((s) => ({
    ...s,
    docIcon: DOC_ICON_MAP[s.docIconName] || FileSpreadsheet,
  }));

  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = stages[activeIdx] || stages[0];

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
          {stages.map((s, idx) => {
            const isSelected = activeIdx === idx;
            const DocIcon = s.docIcon;
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
                  <DocIcon
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
