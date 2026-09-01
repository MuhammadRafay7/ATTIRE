import Link from "next/link";
import { ArrowRight, Phone, Clock } from "lucide-react";

export default function CtaBanner({
  title = "Ready to cost your next production run?",
  body = "Send a tech pack, swatch reference, or preliminary target cost — we return within two working days with vetted mill options and an open-book landed price.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 border-b border-white/10">
      <div className="container-x relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass-light font-semibold mb-2">
            <Clock className="h-3.5 w-3.5" />
            <span>48-Hour Open Costing SLA</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/75">
            {body}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href="tel:+442071835501"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-brass-light" />
            <span>+44 20 7183 5501</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brass px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy shadow-lg hover:bg-brass-light transition-all"
          >
            <span>Transmit Tech Pack</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
