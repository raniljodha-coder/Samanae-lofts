import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { getSite } from "../../lib/content";
import { timeline } from "../../lib/journey";

export const metadata: Metadata = {
  title: "Our journey",
  description:
    "How a Dutch family turned a hillside in La Barbacoa, Samaná into Samanea Lofts — the story and the construction, photographed from untouched jungle to the finished shell.",
};


export default function Journey() {
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Our journey"
        title="It started with a piece of hillside"
        lede="A family from the Netherlands bought land on the Samaná peninsula without a road to it, water on it, or a clear idea of what would go there. This is what happened next."
      />

      {/* ── Family story ─────────────────────────────────────── */}
      <section className="bg-papel py-24 sm:py-28">
        <div className="shell grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <p className="eyebrow text-flor">Why here</p>
            <h2 className="h-lg mt-5 max-w-[13ch]">The slow version of the Caribbean</h2>
          </div>
          <div className="space-y-6 lede text-tinta/80">
            <p>
              Samaná is the part of the Dominican Republic that resorts mostly
              skipped. There are whales in the bay from January to March, a
              fifty-metre waterfall in the hills behind us, and beaches you can
              still have to yourself on a Tuesday.
            </p>
            <p>
              We were not looking to build eleven houses. We were looking for one.
              But the plot came with more land than we needed, and it turned out
              other people wanted the same thing we did — so the rest of the
              hillside became lots, and the lots became neighbours.
            </p>
            <p>
              What we are offering is not really a house. It is the chance to do what
              we did: pick a piece of this hillside, decide what stands on it, and
              watch it get built the way you would want your own home built.
            </p>
            <p className="rounded-md border-l-[3px] border-flor bg-flor/10 px-5 py-4 text-[0.9rem] leading-[1.65] text-tinta/70">
              <strong>Note for the owner:</strong> replace the three paragraphs above
              with your own words — who the family is, why Samaná, and what made you
              buy the land. This is the highest-value copy on the whole site. Delete
              this note before launch.
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="bg-arena py-24 sm:py-32">
        <div className="shell">
          <p className="eyebrow text-flor">Construction</p>
          <h2 className="h-lg mt-5 max-w-[18ch]">From jungle to finished house</h2>
          <p className="lede mt-6 max-w-[52ch] text-tinta/70">
            Every stage of the first loft, photographed as it happened — nothing
            staged, nothing rendered. The same process is on offer to anyone buying
            one of the remaining lots.
          </p>

          <ol className="mt-16 space-y-20 sm:space-y-28">
            {timeline.map((e, i) => (
              <li
                key={e.title}
                className="relative grid gap-8 border-l border-tinta/15 pl-8 sm:grid-cols-[0.85fr_1.15fr] sm:gap-14 sm:pl-14"
              >
                <span
                  className={`absolute -left-[7px] top-2 h-[13px] w-[13px] rounded-full border-2 ${
                    e.upcoming ? "border-tinta/30 bg-arena" : "border-arena bg-flor"
                  }`}
                  aria-hidden
                />
                <div>
                  <p className="eyebrow text-tinta/45">
                    {String(i + 1).padStart(2, "0")} · {e.date}
                  </p>
                  <h3 className="h-lg mt-4">{e.title}</h3>
                  <div className="mt-6 space-y-4 text-tinta/75">
                    {e.body.map((p, j) => (
                      <p key={j} className="leading-[1.75]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  {e.image ? (
                    <figure>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={e.image}
                          alt={e.imageAlt}
                          width={1200}
                          height={900}
                          className="w-full object-cover"
                        />
                      </div>
                      <figcaption className="eyebrow mt-3 text-tinta/40">
                        {e.date}
                      </figcaption>
                    </figure>
                  ) : (
                    <div className="flex aspect-[3/2] items-center justify-center rounded-lg border border-dashed border-tinta/20 font-mono text-[11px] uppercase tracking-[0.18em] text-tinta/35">
                      Photo to come
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-jungle py-24 text-papel sm:py-28">
        <div className="shell">
          <h2 className="h-lg max-w-[20ch]">Want to follow the rest of it?</h2>
          <p className="mt-5 max-w-[46ch] text-papel/70">
            We add to this page as the work goes on. Email us and we will tell you
            when the next stage is up — and when {site.openingDate} bookings open.
          </p>
          <a href={`mailto:${site.email}`} className="btn-flor mt-9">
            Email us
          </a>
        </div>
      </section>
    </>
  );
}
