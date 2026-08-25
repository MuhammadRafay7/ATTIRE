import { Quote } from "lucide-react";

const QUOTES = [
  {
    text: "The open cost sheets are the difference. We can see exactly what we're paying for fabric, CMT and margin, so a price change never comes as a surprise mid-season.",
    name: "Head of Buying",
    role: "European fashion retailer",
  },
  {
    text: "We moved our denim program to Attire Services after a shade-variation issue with our previous agent. Two years in, we haven't had a lot rejected at our own QC.",
    name: "Sourcing Director",
    role: "US outerwear brand",
  },
  {
    text: "Having one contract and one point of contact for freight and compliance, instead of three separate vendors, cut real time out of every launch.",
    name: "Operations Lead",
    role: "Direct-to-consumer apparel label",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
            From our buyers
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What working with us actually looks like
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col rounded-xl border border-line bg-mist p-6"
            >
              <Quote
                className="h-6 w-6 text-accent"
                strokeWidth={1.75}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/85">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <div className="text-sm font-semibold text-ink">
                  {q.name}
                </div>
                <div className="text-xs text-muted">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
