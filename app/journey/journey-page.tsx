import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { getSite } from "../../lib/content";

export const metadata: Metadata = {
  title: "Our journey",
  description:
    "How a Dutch family turned a hillside in La Barbacoa, Samaná into Samanea Lofts — the story and the construction, photographed from untouched jungle to the finished shell.",
};

/* ──────────────────────────────────────────────────────────────
   CONSTRUCTION TIMELINE
   Add a stage by copying one block and dropping a photo into
   public/images/. Leave `image` as "" for a "Photo to come" slot.
   Set `upcoming: true` for a stage that hasn't happened yet.
   ────────────────────────────────────────────────────────────── */
const timeline: {
  date: string;
  title: string;
  image: string;
  imageAlt: string;
  upcoming?: boolean;
  body: string[];
}[] = [
  {
    date: "The beginning",
    title: "A clearing in the jungle",
    image: "/images/journey-01-empty-lot.jpg",
    imageAlt:
      "A cleared patch of hillside at Samanea, dense jungle rising behind it",
    body: [
      "The first job was simply to see the ground. The undergrowth was cut back by hand to reveal the slope of the hill and the wall of mature trees that would sit behind the houses.",
      "Nothing was levelled and nothing was poured. This is the plot as it was found — the starting point for everything that followed.",
    ],
  },
  {
    date: "Foundations",
    title: "Digging in on a slope",
    image: "/images/journey-02-first-foundation.jpg",
    imageAlt:
      "Workers excavating the first foundation, a steel column cage set into a dug footing",
    body: [
      "Building on a hillside means the foundations do the hardest work. Each one is dug into the slope, deep enough to reach firm ground, and tied with a cage of steel before any concrete goes in.",
      "The first column cage going into its footing, with the crew setting the depth by eye and by string line.",
    ],
  },
  {
    date: "Foundations",
    title: "A grid of footings across the plot",
    image: "/images/journey-03-footings.jpg",
    imageAlt:
      "Multiple concrete column footings poured across the excavated plot, steel rebar rising from each",
    body: [
      "Footing by footing, the shape of the house appears in the ground before a single wall exists. Each pad is poured and left to cure with its steel standing proud, ready to become a column.",
      "The boundary wall along the road is already up at the back — the first thing that reads as a building rather than a construction site.",
    ],
  },
  {
    date: "Structure",
    title: "Columns up, first floor cast",
    image: "/images/journey-04-columns.jpg",
    imageAlt:
      "Concrete columns standing with the first-floor slab cast above, red props holding the formwork",
    body: [
      "The columns rise to full height and the first-floor slab is cast between them. The forest of red props underneath is temporary — it carries the wet concrete of the upper floor until it is strong enough to stand on its own.",
      "This is the moment the loft stops being a footprint and becomes two storeys.",
    ],
  },
  {
    date: "Structure",
    title: "Standing on the upper floor",
    image: "/images/journey-05-upper-slab.jpg",
    imageAlt:
      "The poured upper slab with reinforcing steel laid out, jungle and hillside surrounding it",
    body: [
      "The upper slab poured, with the reinforcing mesh set for the level above and the plumbing already routed through it. From up here the reason for the whole project is obvious — trees on every side and the hill falling away toward the coast.",
      "It is also the view the finished terrace will have, one floor down.",
    ],
  },
  {
    date: "Structure",
    title: "The shell takes shape",
    image: "/images/journey-06-shell.jpg",
    imageAlt:
      "The two-storey concrete shell of a Samanea loft with the steel pergola frame in place",
    body: [
      "Two floors of concrete, the covered terrace framed out, and the steel pergola in place across the front. From here the work turns to render, glazing, floors and joinery — the parts that make it a home rather than a structure.",
      "The finished loft in an earlier photograph sits at the top of the home page.",
    ],
  },
  {
    date: "January 2027",
    title: "Opening",
    image: "",
    imageAlt: "",
    upcoming: true,
    body: [
      "Finished, furnished, and taking guests. Two lots are still available to build on before then.",
    ],
  },
];

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
