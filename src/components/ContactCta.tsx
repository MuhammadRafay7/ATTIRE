"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function ContactCta() {
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
    const href = `mailto:trade@attireservices.com?subject=${encodeURIComponent(
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
                    href="mailto:trade@attireservices.com"
                    className="text-sm font-semibold text-ink hover:text-brass-dark"
                  >
                    trade@attireservices.com
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
                    href="tel:+442071835501"
                    className="text-sm font-semibold text-ink hover:text-brass-dark"
                  >
                    +44 20 7183 5501
                  </a>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    Monday &ndash; Friday 08:30 &ndash; 18:00 GMT
                  </div>
                </div>
              </div>
            </div>

            {/* Desk Locations Strip */}
            <div className="mt-6 space-y-3">
              <div className="rounded-lg border border-line-subtle bg-canvas-subtle p-3 text-xs">
                <div className="font-semibold text-ink">London (Head Office)</div>
                <div className="text-ink-muted">14 Bevis Marks, EC3A 7BA &middot; UK &amp; European Commercial Terms</div>
              </div>
              <div className="rounded-lg border border-line-subtle bg-canvas-subtle p-3 text-xs">
                <div className="font-semibold text-ink">Karachi (South Asia Sourcing)</div>
                <div className="text-ink-muted">Shahrah-e-Faisal, Block 6 &middot; 9 Resident QC Inspectors</div>
              </div>
              <div className="rounded-lg border border-line-subtle bg-canvas-subtle p-3 text-xs">
                <div className="font-semibold text-ink">Ho Chi Minh City (Southeast Asia)</div>
                <div className="text-ink-muted">Le Thanh Ton, District 1 &middot; 6 Resident QC Inspectors</div>
              </div>
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
                    SLA: 48h Response
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
                        <button
                          type="button"
                          key={term}
                          onClick={() => setIncoterm(term)}
                          className={`rounded-md px-3 py-2 text-xs text-left transition-all border ${
                            incoterm === term
                              ? "border-brass bg-brass-soft text-ink font-semibold"
                              : "border-line bg-paper text-ink-muted hover:text-ink"
                          }`}
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                    3. Estimated Order Volume
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {["500 – 1,500 pcs (Sampling/Test)", "2,000 – 5,000 pcs (Standard Run)", "10,000+ pcs (Full FCL Container)"].map(
                      (vol) => (
                        <button
                          type="button"
                          key={vol}
                          onClick={() => setVolume(vol)}
                          className={`rounded-md px-3 py-2 text-xs text-left transition-all border ${
                            volume === vol
                              ? "border-brass bg-brass-soft text-ink font-semibold"
                              : "border-line bg-paper text-ink-muted hover:text-ink"
                          }`}
                        >
                          {vol}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Contact & Company Details */}
              <div className="mt-6 border-t border-line-subtle pt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-3">
                  4. Commercial Buyer Details
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-ink-muted mb-1">
                      Company / Brand Name *
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      placeholder="e.g. Regent Garments Ltd"
                      className="w-full rounded-md border border-line bg-canvas-subtle px-3.5 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-navy focus:bg-paper outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-ink-muted mb-1">
                      Your Name &amp; Title *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. James Wilson, Sourcing Director"
                      className="w-full rounded-md border border-line bg-canvas-subtle px-3.5 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-navy focus:bg-paper outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-ink-muted mb-1">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. j.wilson@regent.com"
                      className="w-full rounded-md border border-line bg-canvas-subtle px-3.5 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-navy focus:bg-paper outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-xs font-medium text-ink-muted mb-1">
                      Destination Port / Country
                    </label>
                    <input
                      id="destination"
                      name="destination"
                      placeholder="e.g. Rotterdam / UK Inland Depot"
                      className="w-full rounded-md border border-line bg-canvas-subtle px-3.5 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-navy focus:bg-paper outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Technical Specification */}
              <div className="mt-5">
                <label htmlFor="brief" className="block text-xs font-medium text-ink-muted mb-1">
                  Fabric specification, target landed price or tech pack notes
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  rows={3}
                  placeholder="Yarn count, weight in GSM, wash standard, target landed ceiling, ship window — whatever you have."
                  className="w-full rounded-md border border-line bg-canvas-subtle px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted/50 focus:border-navy focus:bg-paper outline-none"
                />
              </div>

              {/* Submit Row */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line-subtle pt-5">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-navy-soft transition-all"
                >
                  <span>Transmit Commercial RFQ</span>
                  <ArrowRight className="h-4 w-4 text-brass-light" />
                </button>
                <span className="text-[11px] font-mono text-ink-muted">
                  Pre-fills structured email &middot; Attach tech pack PDF there
                </span>
              </div>

              {status && (
                <div className="mt-4 rounded-lg bg-brass-soft/80 border border-brass/40 p-3 text-xs text-ink leading-relaxed font-medium">
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
