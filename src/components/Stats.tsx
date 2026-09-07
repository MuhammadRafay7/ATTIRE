import { getStatsContent, type StatsContent } from "@/lib/content";

export default function Stats({ stats: initialStats }: { stats?: StatsContent }) {
  const stats = initialStats ?? getStatsContent();

  return (
    <section className="border-b border-line bg-canvas py-10 sm:py-12">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative flex flex-col justify-between border-l border-line pl-6 first:border-l-0 sm:first:border-l-0 lg:first:border-l-0"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl tabular-nums">
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-brass-dark font-semibold">
                  {s.unit}
                </span>
              </div>
              <div className="mt-1 font-bold text-sm text-ink">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-ink-muted leading-relaxed">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
