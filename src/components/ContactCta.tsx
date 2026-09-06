"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { getGeneralContent } from "@/lib/content";

export default function ContactCta() {
  const general = getGeneralContent();
  const [commodity, setCommodity] = useState("Wovens & Shirting");
  const [incoterm, setIncoterm] = useState("DDP Landed");
  const [volume, setVolume] = useState("2,000 – 5,000 pcs");
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) || "").toString().trim();

    const lines = [
      "========================================",
      "ATTIRE SERVICES — FORMAL COMMERCIAL RFQ",
      "========================================",
      `Company: ${get("company")}`,
      `Buyer Contact: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "Not specified"}`,
      "",
      `Commodity: ${commodity}`,
      `Target Incoterm: ${incoterm}`,
      `Estimated Volume: ${volume}`,
      `Destination Port / Country: ${get("destination") || "European Entry Port"}`,
      `Target Ex-Factory Date: ${get("exFactory") || "Standard 60-90 days"}`,
      "",
      "TECHNICAL SPECIFICATION / TECH PACK NOTES:",
      get("brief") || "Please refer to attached tech pack.",
      "",
      "Please provide open FOB & landed cost sheet within 48 hours.",
      "========================================",
    ].join("\n");

    const subject = `RFQ: ${commodity} — ${get("company") || "Commercial Enquiry"}`;
    const href = `mailto:${general.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines)}`;

    window.location.href = href;
    setStatus(
      "Opening your default email client with your structured RFQ ready. Please attach any PDF tech packs or spec sheets before sending."
    );
  }

  return (
    <section className="bg-canvas py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left Column: Direct Desks & Trade Guarantees */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Initiate a commercial costing
            </h2>

            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              We respond to every submission within two working days with a written feasibility assessment,
              mill availability, and an open cost sheet &mdash; including when we believe we are not the right fit.
            </p>

            {/* Direct Contact Points */}
            <div className="mt-8 space-y-4 rounded-xl border border-line bg-paper p-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="grid h-8 w-8 place-items-center rounded bg-navy text-brass-light shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                    Trading Inquiries
                  </div>
                  <a
                    href={`mailto:${general.contact.email}`}
                    className="text-sm font-semibold text-ink hover:text-brass-dark"
                  >
                    {general.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-line-subtle">
                <div className="grid h-8 w-8 place-items-center rounded bg-navy text-brass-light shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                    London Commercial Desk
                  </div>
                  <a
                    href={`tel:${general.contact.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-semibold text-ink hover:text-brass-dark"
                  >
                    {general.contact.phone}
                  </a>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    {general.contact.hours}
                  </div>
                </div>
              </div>
            </div>

            {/* Desk Locations Strip */}
            <div className="mt-6 space-y-3">
              {general.offices.map((office) => (
                <div key={office.id} className="rounded-lg border border-line-subtle bg-canvas-subtle p-3 text-xs">
                  <div className="font-semibold text-ink">{office.city}</div>
                  <div className="text-ink-muted">{office.address} &middot; {office.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Structured Commercial RFQ Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="paper-card rounded-2xl border border-line bg-paper p-6 sm:p-9 shadow-sm"
            >
              <div className="border-b border-line pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass">
                    RFQ Configurator
                  </span>
                  <span className="font-mono text-[11px] text-ink-muted">
                    SLA: {general.contact.rfqSla}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">
                  Request For Quotation &amp; Feasibility
                </h3>
              </div>

              {/* Step 1: Commodity Category Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                  1. Commodity Category
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    "Wovens & Shirting",
                    "Denim & Heavy Twill",
                    "Circular Knits",
                    "Outerwear & Jackets",
                    "Canvas & Duck",
                    "Custom Spec / Other",
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCommodity(cat)}
                      className={`rounded-md px-3 py-2 text-xs text-left transition-all border ${
                        commodity === cat
                          ? "border-navy bg-navy text-white font-semibold"
                          : "border-line bg-canvas-subtle text-ink-muted hover:border-line-dark hover:text-ink"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Incoterm & Volume */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                    2. Target Incoterm
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {["DDP Landed (Warehouse)", "FOB (Port of Origin)", "CIF (Destination Port)"].map(
                      (term) => (
                        <label
                          key={term}
                          className={`flex items-center gap-2 rounded-md border p-2.5 text-xs cursor-pointer transition-all ${
                            incoterm === term
                              ? "border-navy bg-canvas-subtle font-semibold text-ink"
                              : "border-line bg-paper text-ink-muted hover:text-ink"
                          }`}
                        >
                          <input
                            type="radio"
                            name="incoterm"
                            value={term}
                            checked={incoterm === term}
                            onChange={() => setIncoterm(term)}
                            className="text-navy focus:ring-brass"
                          />
                          <span>{term}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                    3. Estimated Order Volume
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "1,000 – 2,000 pcs (Sampling/Test)",
                      "2,000 – 5,000 pcs (Standard Run)",
                      "5,000 – 20,000+ pcs (Scale Bulk)",
                    ].map((vol) => (
                      <label
                        key={vol}
                        className={`flex items-center gap-2 rounded-md border p-2.5 text-xs cursor-pointer transition-all ${
                          volume === vol
                            ? "border-navy bg-canvas-subtle font-semibold text-ink"
                            : "border-line bg-paper text-ink-muted hover:text-ink"
                        }`}
                      >
                        <input
                          type="radio"
                          name="volume"
                          value={vol}
                          checked={volume === vol}
                          onChange={() => setVolume(vol)}
                          className="text-navy focus:ring-brass"
                        />
                        <span>{vol}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Company & Contact Inputs */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                    Company / Brand Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="company"
                    placeholder="e.g. Norse Heritage Apparel"
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                    Your Name &amp; Title *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="e.g. Sarah Jenkins (Head of Buying)"
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="s.jenkins@brand.com"
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="e.g. Southampton / UK"
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              {/* Technical Brief / Notes */}
              <div className="mt-4">
                <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                  Technical Specification / Garment Overview
                </label>
                <textarea
                  name="brief"
                  rows={3}
                  placeholder="Outline yarn weight, wash requirements, target delivery date, or note that a tech pack will be attached to the email."
                  className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                />
              </div>

              {/* Submission Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-navy-soft"
                >
                  <span>Transmit Commercial RFQ</span>
                  <ArrowRight className="h-4 w-4 text-brass-light" />
                </button>
              </div>

              {status && (
                <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-300 p-3 text-xs text-emerald-900 leading-relaxed font-mono">
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
