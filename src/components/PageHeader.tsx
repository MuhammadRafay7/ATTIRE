import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white border-b border-white/10">
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/60">
          <Link href="/" className="text-white/60 hover:text-white transition-colors">
            Trade House
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/30" />
          <span className="text-brass-light font-medium uppercase tracking-wider">{eyebrow}</span>
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white">
          {title}
        </h1>

        {lede && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
