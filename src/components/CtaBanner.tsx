import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
            {body}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-dark"
        >
          Request a quote
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      </div>
    </section>
  );
}
