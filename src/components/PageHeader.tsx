export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(200,145,47,0.10), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="container-x relative py-16 sm:py-20">
        <div className="flex items-center gap-3 text-white/55">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
