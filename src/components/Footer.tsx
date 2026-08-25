import Link from "next/link";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "How it works", href: "/process" },
      { label: "Materials", href: "/materials" },
      { label: "Company", href: "/company" },
    ],
  },
  {
    heading: "Offices",
    links: [
      { label: "London, UK", href: "/company" },
      { label: "Karachi, Pakistan", href: "/company" },
      { label: "Ho Chi Minh City, Vietnam", href: "/company" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "trade@attireservices.com", href: "mailto:trade@attireservices.com" },
      { label: "+44 20 7183 5501", href: "tel:+442071835501" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white/60">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-[13px] font-semibold text-accent">
                AS
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Attire Services
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              An apparel and textile trading house. We buy the goods, inspect
              them ourselves, and land them at your dock.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Attire Services Ltd. All rights
            reserved.
          </span>
          <span>Registered in England &amp; Wales</span>
        </div>
      </div>
    </footer>
  );
}
