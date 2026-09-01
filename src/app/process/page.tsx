import type { Metadata } from "next";
import Image from "next/image";
import { ShieldAlert, Clock, FileWarning, Microscope, Scale } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "The 4-Stage Protocol & Risk Architecture",
  description:
    "How apparel orders move through Attire Services from tech pack to landed delivery, and the three systemic supply chain risks we actively engineer out.",
};

const RISKS = [
  {
    icon: ShieldAlert,
    title: "Shade Variation & Metamerism",
    problem: "Dye lots inevitably drift across multiple thousand-meter runs under different ambient factory conditions.",
    solution:
      "We cut physical shade bands across every dye lot, sort by lot code, and carton-pack by continuous band. A retail store never unpacks two divergent tones on the same sales rail. All lab dips are evaluated under dual illuminants (D65 daylight and TL84 store lighting) with Delta-E kept below 0.80.",
  },
  {
    icon: Clock,
    title: "Ex-Factory Delay & Port Rollovers",
    problem: "Fabric lead times slip, bottlenecking final sewing and resulting in missed ocean carrier cutoffs.",
    solution:
      "We build a mandatory 10-day buffer between planned ex-factory and vessel sailing cutoffs. Crucially, we hold reserved air-freight contract allocations on standby. Because we own the goods as principal, if the production delay was within our control, the air freight differential is absorbed by us &mdash; not billed to you.",
  },
  {
    icon: FileWarning,
    title: "Tariff Misclassification & Customs Friction",
    problem: "A hasty or inaccurate HS code assignment triggers customs holds, retroactive duty clawbacks, or port demurrage.",
    solution:
      "Classification is audited twice: first by our London commercial team during initial costing, and second by a licensed customs broker prior to ocean bill of lading issuance. We verify fiber content breakdown down to 0.1% to guarantee zero tariff reassessment disputes upon arrival.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="The 4-Stage Protocol"
        title="Predictable apparel export engineered around physical documentation"
        lede="Most supply chain friction stems from vague status emails. We replace verbal assurances with auditable milestone documents &mdash; open-book cost sheets, spectrophotometer lab dips, statistical AQL certificates, and customs-cleared bills of lading."
      />

      <Process />

      {/* Laboratory Inspection Documentary Break */}
      <section className="bg-canvas-subtle/50 py-20 sm:py-28 border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Salaried inspectors on the floor &mdash; not remote report reviewers
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                Our quality controllers are permanent, salaried staff employed by Attire Services.
                They report directly to our Head of Quality in London &mdash; not to the factory management.
                They have the unilateral authority to halt a sewing line or reject a fabric roll before cutting.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-line bg-paper p-4">
                  <div className="font-semibold text-ink flex items-center gap-1.5">
                    <Microscope className="h-4 w-4 text-brass" />
                    Inline Needle Detection
                  </div>
                  <p className="mt-1 text-ink-muted">
                    100% metal detector conveyor pass on every finished garment prior to boxing.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-paper p-4">
                  <div className="font-semibold text-ink flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-brass" />
                    AQL 2.5 Normal Inspection
                  </div>
                  <p className="mt-1 text-ink-muted">
                    ISO 2859-1 sampling tables with strict zero critical defect tolerance.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-line shadow-md sm:h-[440px]">
                <Image
                  src="/images/inspection.jpg"
                  alt="Quality controller using thread counting loupe in accredited testing lab"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="font-semibold text-brass-light">Technical QA Station &middot; Karachi Laboratory</div>
                  <div className="text-white/70 text-[11px]">Calibrated pick glass inspection &middot; Warp/weft tension verification</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Failure Prevention Section */}
      <section className="bg-navy py-20 text-white sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Three critical failure modes we actively engineer out
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Nobody in global apparel manufacturing has a spotless record. What separates a successful
              commercial season from a retail disaster is whether the failure was modeled in advance
              or discovered when customs flags the container.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-7 lg:grid-cols-3">
            {RISKS.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-white/12 bg-white/[0.03] p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-brass-light mb-5">
                    <r.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {r.title}
                  </h3>
                  <div className="mt-3 rounded bg-red-950/40 border border-red-800/30 p-2.5 text-xs text-red-200/90 leading-relaxed font-mono">
                    <strong>The Risk:</strong> {r.problem}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/75">
                    {r.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready at Stage One?"
        body="Submit your tech pack or reference garment. Our London desk returns a feasibility note and open FOB cost sheet within two working days."
      />
    </>
  );
}
