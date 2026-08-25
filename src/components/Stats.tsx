const STATS = [
  { value: "17", label: "Years trading" },
  { value: "63", label: "Audited mills on contract" },
  { value: "2,400+", label: "TEU shipped in 2025" },
  { value: "99.1%", label: "Shipments cleared first pass" },
];

export default function Stats() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-x grid grid-cols-2 gap-8 py-14 sm:grid-cols-4 sm:gap-6 sm:py-16">
        {STATS.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
