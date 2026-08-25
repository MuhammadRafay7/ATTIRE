"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/process", label: "How it works" },
  { href: "/materials", label: "Materials" },
  { href: "/company", label: "Company" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-navy text-[13px] font-semibold text-accent">
            AS
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            Attire Services
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Request a quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted hover:bg-mist hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white"
            >
              Request a quote
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
