import type { Metadata } from "next";
import Image from "next/image";
import { X, ShieldCheck, MapPin, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Stats from "@/components/Stats";
import CtaBanner from "@/components/CtaBanner";
import { getCompanyContent, getGeneralContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Company & Trading Charter",
  description:
    "Attire Services is an independent apparel trading house founded in 2009. We purchase from audited mills on our own balance sheet and deliver landed cargo to buyers worldwide.",
};

export default function CompanyPage() {
  const company = getCompanyContent();
  const general = getGeneralContent();

  return (
    <>
      <PageHeader
        eyebrow={company.story.eyebrow}
        title={company.story.title}
        lede={company.story.lede}
      />

      {/* Origin Story Section */}
      <section className="bg-canvas py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {company.story.sectionTitle}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                {company.story.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 2 ? "font-medium text-ink" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-line shadow-md sm:h-[480px]">
                <Image
                  src={company.story.imageSrc}
                  alt={company.story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="font-semibold text-brass-light">{company.story.imageBadge}</div>
                  <div className="text-white/70 text-[11px]">{company.story.imageSub}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Global Trading Desks */}
      <section className="bg-canvas-subtle/60 py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Three international desks, each with distinct operational focus
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              We do not outsource to correspondent sub-agents. Every desk is owned and staffed
              directly by Attire Services personnel.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-3">
            {general.offices.map((o) => (
              <div
                key={o.city}
                className="paper-card rounded-xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line-subtle pb-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brass">
                      {o.phone}
                    </span>
                    <MapPin className="h-4 w-4 text-brass" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    {o.fullCity}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-navy">
                    {o.role}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                    {o.focus}
                  </p>
                </div>

                <div className="mt-6 border-t border-line-subtle pt-4 font-mono text-[11px] text-ink-muted">
                  {o.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Merchant Trading Charter: What We Will Not Do */}
      <section id="standards" className="bg-canvas py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                The Merchant Trading Charter: What we will not do
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                These are non-negotiable commercial operating positions &mdash; not vague public relations
                platitudes. Each of these commitments has cost us potential business in the past, and we would
                make the exact same call every single time.
              </p>

              <div className="mt-8 rounded-xl border border-line bg-canvas-subtle p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <ShieldCheck className="h-4 w-4 text-brass" />
                  {company.governance.title}
                </div>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {company.governance.body}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {company.standards.map((s) => (
                <div
                  key={s.title}
                  className="paper-card rounded-xl p-5 flex gap-4 items-start"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-red-100/70 text-red-700 shrink-0 mt-0.5">
                    <X className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mill Floor Visit Program */}
      <section id="visits" className="bg-canvas-subtle/70 py-16 sm:py-20 border-b border-line">
        <div className="container-x">
          <div className="rounded-2xl border border-line bg-paper p-8 sm:p-10 shadow-sm flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-dark font-semibold">
                <Calendar className="h-4 w-4 text-brass" />
                <span>{company.factoryVisits.eyebrow}</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                {company.factoryVisits.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {company.factoryVisits.body}
              </p>
            </div>

            <a
              href={company.factoryVisits.ctaEmail}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-navy-soft"
            >
              <span>{company.factoryVisits.ctaLabel}</span>
            </a>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to discuss commercial terms?"
        body="Contact our London desk directly. We discuss minimum order quantities, credit terms, and target landed costs frankly from the first conversation."
      />
    </>
  );
}
