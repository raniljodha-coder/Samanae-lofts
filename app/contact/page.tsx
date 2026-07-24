import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { getSite, getLots, lotSummary } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Samanea Lofts about staying with us in Samaná, or about the remaining lots at Samanea Loft Barbacoa II.",
};

export default function Contact() {
  const site = getSite();
  const { available } = lotSummary(getLots());

  const routes = [
    {
      t: "I want to stay",
      d: "Short holidays and long seasons, from " + site.openingDate + ". Tell us your dates and how many of you there are.",
      subject: "Stay enquiry — Samanea Lofts",
      cta: "Email about a stay",
    },
    {
      t: "I want to build",
      d:
        available > 0
          ? `${available} lots are still unsold. We will send plot dimensions, pricing and build costs.`
          : "Ask us about what is coming next on the hillside.",
      subject: "Lot enquiry — Samanea Loft Barbacoa II",
      cta: "Email about a lot",
    },
    {
      t: "Something else",
      d: "Press, suppliers, or a question that does not fit the other two boxes.",
      subject: "Hello — Samanea Lofts",
      cta: "Email us",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="A person reads every message"
        lede="There is no booking engine and no call centre. Pick whichever of these is closest and it opens an email — we usually reply within a day or two."
      />

      <section className="bg-papel py-24 sm:py-32">
        <div className="shell grid gap-8 lg:grid-cols-3">
          {routes.map((r) => (
            <article
              key={r.t}
              className="flex flex-col rounded-lg border border-tinta/12 bg-arena/50 p-9"
            >
              <h2 className="h-md">{r.t}</h2>
              <p className="mt-4 flex-1 leading-[1.75] text-tinta/70">{r.d}</p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(r.subject)}`}
                className="btn-flor mt-8 self-start"
              >
                {r.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-arena py-24 sm:py-28">
        <div className="shell grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-flor">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block font-display text-2xl hover:text-flor"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="eyebrow text-flor">WhatsApp</p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block font-display text-2xl hover:text-flor"
            >
              Message us
            </a>
          </div>
          <div>
            <p className="eyebrow text-flor">Where</p>
            <p className="mt-4 font-display text-2xl">{site.location}</p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block border-b border-flor pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flor"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
