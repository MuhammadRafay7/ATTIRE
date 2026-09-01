import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    heading: "Procurement & Quality",
    links: [
      { label: "Capabilities & Infrastructure", href: "/capabilities" },
      { label: "4-Stage Trade Protocol", href: "/process" },
      { label: "Material Library & Swatches", href: "/materials" },
      { label: "Commercial RFQ Configurator", href: "/contact" },
    ],
  },
  {
    heading: "The Trading House",
    links: [
      { label: "Origin & Governance", href: "/company" },
      { label: "Trading Standards Charter", href: "/company#standards" },
      { label: "Audit & Compliance Accreditations", href: "/capabilities#compliance" },
      { label: "Mill Floor Visit Program", href: "/company#visits" },
    ],
  },
  {
    heading: "Direct Desk Inquiries",
    links: [
      { label: "London: trade@attireservices.com", href: "mailto:trade@attireservices.com" },
      { label: "Telephone: +44 20 7183 5501", href: "tel:+442071835501" },
      { label: "Order Swatch Hangers", href: "/contact?intent=swatches" },
      { label: "Submit Production Tech Pack", href: "/contact" },
    ],
  },
];

const OFFICES = [
  {
    city: "London Desk (Head Office)",
    address: "14 Bevis Marks, EC3A 7BA",
    role: "Commercial terms, buyer agreements & EU/UK customs clearance",
    tel: "+44 20 7183 5501",
  },
  {
    city: "Karachi Sourcing Center",
    address: "Shahrah-e-Faisal, Block 6",
    role: "Mill contracts & quality control across Pakistan and Western India",
    tel: "9 Resident Salaried Inspectors",
  },
  {
    city: "Ho Chi Minh City Desk",
    address: "Le Thanh Ton, District 1",
    role: "Knitwear, outerwear & technical garments across Southeast Asia",
    tel: "6 Resident Salaried Inspectors",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white/70">
      {/* Top International Office Strip */}
      <div className="border-b border-white/10 bg-black/20 py-8">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {OFFICES.map((o) => (
              <div key={o.city} className="border-l border-white/15 pl-4">
                <div className="font-mono text-xs uppercase tracking-wider text-brass-light font-semibold">
                  {o.city}
                </div>
                <div className="mt-1 text-xs text-white/90 font-medium">
                  {o.address}
                </div>
                <div className="mt-1 text-[11px] text-white/50 leading-relaxed">
                  {o.role}
                </div>
                <div className="mt-1.5 font-mono text-[10px] text-brass-light/80">
                  {o.tel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container-x py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Attire Services Home">
              <Logo size="md" theme="dark" />
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-white/60 max-w-sm">
              An independent apparel and textile trading house operating on its own balance sheet.
              We purchase goods directly from audited mills across South and Southeast Asia, inspect
              every lot on-site, and land documented, inspection-passed cargo to buyers worldwide.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/40">
              <span className="rounded border border-white/10 px-2 py-0.5">GOTS Certified</span>
              <span className="rounded border border-white/10 px-2 py-0.5">OEKO-TEX 100</span>
              <span className="rounded border border-white/10 px-2 py-0.5">BSCI Audited</span>
              <span className="rounded border border-white/10 px-2 py-0.5">Sedex SMETA</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-brass-light">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-white/65 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between font-mono text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Attire Services Ltd. All rights reserved. Registered in England &amp; Wales #06894120.
          </div>
          <div className="flex flex-wrap gap-4 text-white/50">
            <span>Incoterms&reg; 2020 ICC Standards</span>
            <span>&middot;</span>
            <span>AQL 2.5 Normal Inspection</span>
            <span>&middot;</span>
            <span>GDPR &amp; Commercial Confidentiality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
