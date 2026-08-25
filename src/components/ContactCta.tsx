"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Mail, Phone, Clock } from "lucide-react";

export default function ContactCta() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) || "").toString().trim();

    const lines = [
      `Company: ${get("company")}`,
      `Contact: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Product category: ${get("category")}`,
      `Indicative quantity: ${get("quantity")}`,
      "",
      get("brief"),
    ].join("\n");

    const href = `mailto:trade@attireservices.com?subject=${encodeURIComponent(
      `RFQ — ${get("company") || "New enquiry"}`
    )}&body=${encodeURIComponent(lines)}`;

    window.location.href = href;
    setStatus(
      "Opening your mail client with the enquiry filled in. If nothing happens, write to trade@attireservices.com directly."
    );
  }

  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
              Direct lines
            </span>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:trade@attireservices.com"
                className="flex items-center gap-3 text-sm text-ink hover:text-accent-dark"
              >
                <Mail className="h-4 w-4 text-accent-dark" strokeWidth={1.75} />
                trade@attireservices.com
              </a>
              <a
                href="tel:+442071835501"
                className="flex items-center gap-3 text-sm text-ink hover:text-accent-dark"
              >
                <Phone className="h-4 w-4 text-accent-dark" strokeWidth={1.75} />
                +44 20 7183 5501
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Clock className="h-4 w-4 text-accent-dark" strokeWidth={1.75} />
                London 08:30–18:00 GMT
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-line bg-mist p-5">
              <h3 className="text-sm font-semibold text-ink">
                Two working days
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Every enquiry gets a written reply within two working days —
                including when the answer is that we&apos;re not the right
                fit.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-mist p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Company" name="company" required />
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Product category" name="category" placeholder="e.g. Denim, knitwear, outerwear" />
              <Field label="Indicative quantity" name="quantity" placeholder="e.g. 5,000 pcs" />
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-medium text-muted">
                What are you making?
              </label>
              <textarea
                name="brief"
                rows={4}
                placeholder="Construction, fabric weight, target landed cost, ship window — whatever you have."
                className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none focus-visible:border-accent"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
              >
                Send enquiry
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
              <p className="text-xs text-muted">
                Opens your mail client — attach a tech pack there
              </p>
            </div>
            {status && (
              <p role="status" className="mt-4 text-xs text-accent-dark">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none focus-visible:border-accent"
      />
    </div>
  );
}
