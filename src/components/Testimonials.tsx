import { Quote, CheckCircle2 } from "lucide-react";
import { getTestimonialsContent } from "@/lib/content";

export default function Testimonials() {
  const content = getTestimonialsContent();

  return (
    <section className="bg-canvas py-20 sm:py-28 border-b border-line">
      <div className="container-x">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {content.sectionHeader.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {content.sectionHeader.lede}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-3">
          {content.testimonials.map((t) => (
            <figure
              key={t.buyer}
              className="paper-card relative flex flex-col justify-between rounded-xl p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line-subtle pb-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brass-dark">
                    {t.scale}
                  </span>
                  <Quote className="h-4 w-4 text-brass" />
                </div>

                <blockquote className="mt-5 text-sm leading-relaxed text-ink/85 font-normal">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-7 border-t border-line-subtle pt-5">
                <figcaption>
                  <div className="font-bold text-sm text-ink">{t.buyer}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{t.sector}</div>
                </figcaption>

                <div className="mt-3 flex items-center gap-2 rounded bg-canvas-subtle px-2.5 py-1.5 text-[11px] font-mono font-medium text-ink/85 border border-line-subtle">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{t.impact}</span>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
