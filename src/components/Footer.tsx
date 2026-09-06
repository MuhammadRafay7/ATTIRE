import Link from "next/link";
import Logo from "./Logo";
import { getGeneralContent } from "@/lib/content";

export default function Footer() {
  const general = getGeneralContent();

  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white/70">
      {/* Top International Office Strip */}
      <div className="border-b border-white/10 bg-black/20 py-8">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {general.offices.map((o) => (
              <div key={o.id} className="border-l border-white/15 pl-4">
                <div className="font-mono text-xs uppercase tracking-wider text-brass-light font-semibold">
                  {o.city}
                </div>
                <div className="mt-1 text-xs text-white/90 font-medium">
                  {o.address}
                </div>
                <div className="mt-1 text-[11px] text-white/50 leading-relaxed">
                  {o.focus}
                </div>
                <div className="mt-1.5 font-mono text-[10px] text-brass-light/80">
                  {o.phone}
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
              {general.site.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/40">
              {general.accreditations.map((acc) => (
                <span key={acc} className="rounded border border-white/10 px-2 py-0.5">
                  {acc}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            {general.footerColumns.map((col) => (
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
            &copy; {new Date().getFullYear()} {general.site.registeredCompany} All rights reserved. Registered in {general.site.registrationJurisdiction} {general.site.registrationNumber}.
          </div>
          <div className="flex flex-wrap gap-4 text-white/50">
            {general.legalBadges.map((badge, idx) => (
              <span key={badge} className="flex items-center gap-4">
                <span>{badge}</span>
                {idx < general.legalBadges.length - 1 && <span>&middot;</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
