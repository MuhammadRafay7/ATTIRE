import type { Metadata } from "next";
import Image from "next/image";
import { X, ShieldCheck, MapPin, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Stats from "@/components/Stats";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "The Company & Trading Charter",
  description:
    "Attire Services is an independent apparel trading house founded in 2009. We purchase from audited mills on our own balance sheet and deliver landed cargo to buyers worldwide.",
};

const OFFICES = [
  {
    city: "London, United Kingdom",
    role: "Head Commercial Office & Trade Finance",
    address: "14 Bevis Marks, London EC3A 7BA",
    phone: "+44 20 7183 5501",
    focus: "Commercial terms, open costing models, buyer governance, and UK/EU customs entry filings.",
  },
  {
    city: "Karachi, Pakistan",
    role: "South Asia Sourcing & Technical Center",
    address: "Shahrah-e-Faisal, Block 6, Karachi",
    phone: "Resident QA Floor",
    focus: "Direct mill relationships, greige cotton procurement, denim & twill production, with 9 salaried on-site QC inspectors.",
  },
  {
    city: "Ho Chi Minh City, Vietnam",
    role: "Southeast Asia Technical Apparel Desk",
    address: "Le Thanh Ton, District 1, Ho Chi Minh City",
    phone: "Resident QA Floor",
    focus: "Technical outerwear, circular knits, activewear, and trans-Pacific container logistics, with 6 salaried on-site QC inspectors.",
  },
];

const STANDARDS = [
  {
    title: "Zero Unaudited Subcontracting",
    body: "Every single sewing line, dye vat, and laundry facility touching an order must be pre-audited and disclosed before fabric is cut. Any mill that subcontracts without our explicit written sign-off permanently forfeits its contract.",
  },
  {
    title: "Never Ship Marginal or Short Lots",
    body: "If a production lot fails our final statistical AQL 2.5 audit, it does not sail. We absorb the schedule delay and commercial penalties ourselves rather than pass substandard goods into your retail season.",
  },
  {
    title: "Zero Hidden Factory Commissions",
    body: "Our trading margin is a transparent, disclosed line item on every cost sheet. We never accept backhand rebates, agency kickbacks, or secondary payments from fabric mills.",
  },
  {
    title: "Strict Commercial Exclusivity on Developments",
    body: "When a buyer co-finances a proprietary weave, finish, or wash development, that construction belongs exclusively to that brand for the season. We never market your development to competing labels.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Trading House"
        title="A direct principal trading house &mdash; not an agency broker"
        lede="Founded in 2009 by three partners who spent their careers running factory floor quality operations. We manage production from the cutting table and dye vat &mdash; not from an ivory tower spreadsheet."
      />

      {/* Origin Story Section */}
      <section className="bg-canvas py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Why we operate as a direct buyer rather than a broker
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                <p>
                  Before founding Attire Services in 2009, our founding partners ran technical quality
                  and export production for two of Pakistan&apos;s premier woven apparel exporters in Karachi.
                  Season after season, they watched international buyers get let down the same way:
                  an agency broker introduces a factory, collects a 7% commission from the mill, and
                  vanishes the instant quality fails or shipments slip.
                </p>
                <p>
                  Because the broker carries zero financial liability, they have no leverage when a factory
                  falls behind schedule. The buyer is left holding defective stock or paying exorbitant air freight.
                </p>
                <p className="font-medium text-ink">
                  We built Attire Services on the opposite commercial architecture:{" "}
                  <span className="text-navy font-semibold">
                    We purchase the finished goods from the mill on our own balance sheet, and sell them directly
                    to you on agreed landed terms.
                  </span>
                </p>
                <p>
                  The commercial risk between factory ex-factory and your loading dock belongs to us.
                  That is why our resident QC inspectors have the unilateral authority to halt a container
                  without asking for anyone&apos;s permission.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-line shadow-md sm:h-[480px]">
                <Image
                  src="/images/maritime.jpg"
                  alt="Deepwater commercial container terminal at dawn"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="font-semibold text-brass-light">Global Ocean Freight &middot; Export Terminal</div>
                  <div className="text-white/70 text-[11px]">2,400+ TEU moved annually &middot; 100% principal contract freight</div>
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
            {OFFICES.map((o) => (
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
                    {o.city}
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
                  Direct Balance Sheet Accountability
                </div>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  Attire Services has remained proudly independent and self-funded since 2009. We have
                  never accepted outside venture capital or private equity debt, ensuring our operational
                  priorities remain aligned entirely with our retail buyers.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {STANDARDS.map((s) => (
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
                <span>Buyer Inspection Protocol</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                Come and inspect the factory floor during your pre-production run
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Buyers placing a first bulk contract are invited to attend the mill in Karachi or
                Ho Chi Minh City during pre-production sampling. We arrange all local security and logistics,
                and you choose the day of your audit &mdash; unannounced factory visits are part of our standard contract.
              </p>
            </div>

            <a
              href="mailto:trade@attireservices.com?subject=Mill%20Floor%20Visit%20Inquiry"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-navy-soft"
            >
              <span>Arrange Factory Inspection</span>
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
