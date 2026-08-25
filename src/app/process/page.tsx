import type { Metadata } from "next";
import { ShieldAlert, Clock, FileWarning } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How an order moves through Attire Services, from enquiry to landed delivery, and the failures we plan around at every stage.",
};

const RISKS = [
  {
    icon: ShieldAlert,
    title: "Shade variation",
    body: "Dye lots drift. We hold a sealed standard, cut shade bands across the bulk, and pack by band so a store never receives two tones on the same rail.",
  },
  {
    icon: Clock,
    title: "Late ex-factory",
    body: "We book the vessel two weeks past the planned ex-factory date and hold air-freight quotes on file. If the delay is ours, the difference is ours.",
  },
  {
    icon: FileWarning,
    title: "Misclassification",
    body: "A wrong HS heading means a duty reassessment months later. Classification is checked twice — once at costing, once at documentation.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Order to delivery"
        title="Four stages, each closed by a real document"
        lede="You get the document when the stage closes — a cost sheet, an inspection report, a certificate — not a status update."
      />
      <Process />

      <section className="bg-navy py-24 text-white sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Where orders go wrong
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three failures we plan around
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Nobody in this trade has a clean record. What separates a good
              season from a bad one is whether the failure was priced in
              advance or discovered at the port.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {RISKS.map((r) => (
              <div
                key={r.title}
                className="rounded-xl border border-white/12 bg-white/[0.03] p-6"
              >
                <r.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready at stage one."
        body="Send the spec. We come back with a feasibility note inside two working days — including when the answer is that we're not the right fit."
      />
    </>
  );
}
