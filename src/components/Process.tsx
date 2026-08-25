const STEPS = [
  {
    n: "01",
    title: "Enquiry & costing",
    body: "Send a tech pack or a reference garment. Within two working days you get a feasibility note and an open FOB cost sheet from up to three mills.",
  },
  {
    n: "02",
    title: "Sampling & booking",
    body: "Proto, fit sample and lab dips against your Pantone references. On sign-off we book line capacity and confirm the ex-factory date.",
  },
  {
    n: "03",
    title: "Production & QC",
    body: "Bulk runs with our merchandiser on the floor, followed by statistical final inspection and lab testing before anything is packed.",
  },
  {
    n: "04",
    title: "Export & delivery",
    body: "Full documentation, booked freight, and customs clearance — landed at your warehouse on the terms agreed at costing.",
  },
];

export default function Process() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From tech pack to loading dock in four stages
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Every stage closes with a real document — a cost sheet, an
            inspection report, a certificate — not a status update.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-semibold text-accent-dark">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  className="absolute -right-4 top-1.5 hidden h-px w-8 bg-line lg:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
