"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { getGeneralContent } from "@/lib/content";

export default function Nav() {
  const general = getGeneralContent();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-md transition-colors">
      {/* Main navigation header */}
      <div className="container-x flex h-20 items-center justify-between">
        {/* Brand Insignia & Wordmark */}
        <Link href="/" aria-label="Attire Services Home">
          <Logo size="md" theme="light" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {general.navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all ${
                  active
                    ? "text-ink font-semibold"
                    : "text-ink-muted hover:text-ink hover:bg-canvas-subtle rounded-md"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-2 h-0.5 bg-brass" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-navy-soft hover:shadow-md"
          >
            <span>Request a Landed Quote</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-brass-light transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-canvas text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-canvas px-6 py-5 lg:hidden animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1.5">
            {general.navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-navy text-white font-semibold"
                      : "text-ink hover:bg-canvas-subtle"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-line">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-navy py-3 text-xs font-semibold uppercase tracking-wider text-white"
              >
                <span>Request a Landed Quote</span>
                <ArrowUpRight className="h-4 w-4 text-brass-light" />
              </Link>
              <div className="mt-3 text-center text-xs font-mono text-ink-muted">
                London Desk: {general.contact.phone}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
