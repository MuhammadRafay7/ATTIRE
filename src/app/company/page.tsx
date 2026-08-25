import type { Metadata } from "next";
import { X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Stats from "@/components/Stats";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Attire Services is an apparel and textile trading house founded in 2009, with offices in London, Karachi and Ho Chi Minh City.",
};

const OFFICES = [
  {
    city: "London",
    role: "Head office",
    body: "Commercial terms, buyer relationships, costing, and trade documentation for EU and UK entries.",
    detail: "14 Bevis Marks, EC3A 7BA · +44 20 7183 5501",
  },
  {
    city: "Karachi",
    role: "Sourcing — South Asia",
    body: "Mill relationships and quality control across Pakistan and western India. Woven, denim and home textiles.",
    detail: "Shahrah-e-Faisal, Block 6 · 9 QC inspectors on staff",
  },
  {
    city: "Ho Chi Minh City",
    role: "Sourcing — Southeast Asia",
    body: "Knitwear, outerwear and technical fabric across Vietnam and Bangladesh, plus US-bound consolidation.",
    detail: "Le Thanh Ton, District 1 · 6 QC inspectors on staff",
  },
];

const STANDARDS = [
  {
    title: "No unaudited subcontracting",
    body: "Every unit that touches the order is disclosed before production. A mill that subcontracts without telling us loses the contract.",
  },
  {
    title: "No shipping short",
    body: "If a lot fails final inspection, it does not sail. We carry the delay rather than pass a marginal lot into your season.",
  },
  {
    title: "No hidden commission",
    body: "Our margin is a line on the cost sheet you can read. We do not take a second payment from the mill.",
  },
  {
    title: "No conflicting exclusivity",
    body: "Where a buyer funds a development, that construction is theirs for the season. We do not resell it down the street.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="The company"
        title="A trading house, not an agency"
        lede="Founded in 2009 by three people who had spent the previous decade on the factory side of the business. That is still how it's run — from the production floor, not the spreadsheet."
      />

      <section className="bg-paper py-24 sm:py-28">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
                Origin
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Why we buy rather than broker
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted lg:col-span-3">
              <p>
                The founding partners ran quality departments for two large
                woven-garment units in Karachi. They watched buyers get let
                down the same way every season: an agent introduces a mill,
                takes a percentage, and has no leverage when a shipment slips
                or a lot fails.
              </p>
              <p>
                So Attire Services was built on the opposite structure.{" "}
                <strong className="font-semibold text-ink">
                  We purchase the order from the mill and sell it to the
                  buyer.
                </strong>{" "}
                The commercial risk between those two events sits with us —
                which is why our inspection team can stop a shipment without
                anyone&apos;s permission.
              </p>
              <p>
                Seventeen years on, we hold contracts with sixty-three
                audited mills across five countries and move roughly two and
                a half thousand TEU a year. The company has never taken
                outside investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
              Offices
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Three desks, three jobs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Each office does one part of the work. Nothing is outsourced to
              a correspondent agent.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="rounded-xl border border-line bg-paper p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  {o.role}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {o.city}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {o.body}
                </p>
                <p className="mt-4 border-t border-line pt-4 font-mono text-xs text-muted/80">
                  {o.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-28">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
                Standards
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What we will not do
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Commercial positions, not a values statement. Each has cost
                us orders, and we would make the same call again.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">
              {STANDARDS.map((s) => (
                <div key={s.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50">
                    <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Come and see a production floor."
        body="Buyers placing a first order are welcome at the mill during sampling. We arrange the visit and don't choose the day for you."
      />
    </>
  );
}
