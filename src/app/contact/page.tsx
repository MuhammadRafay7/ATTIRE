import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactCta from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Attire Services a tech pack or an enquiry. We respond within two working days with mill options, indicative landed cost and a ship window.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need made"
        lede="A rough description is enough to start. If you have a tech pack, attach it to the email this form opens — we read them the same day."
      />
      <ContactCta />
    </>
  );
}
