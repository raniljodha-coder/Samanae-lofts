import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { getSite } from "../../lib/content";

export const metadata: Metadata = {
  title: "Stay",
  description:
    "Rent a loft at Samanea Lofts in Samaná, Dominican Republic — short stays by the week or long stays by the season, from January 2027.",
};

/* ── TODO: once you decide on rates, add them to the two cards below. ── */
const options = [
  {
    tag: "By the week",
    title: "Short stays",
    lines: [
      "Minimum five nights",
      "Linen, towels and a mid-stay clean included",
      "Airport pick-up from El Catey (AZS) on request",
      "Best from December to April, and again in July",
    ],
    body: "For a holiday. You arrive to a stocked fridge, we tell you which beach is empty that week, and otherwise leave you alone.",
  },
  {
    tag: "By the season",
    title: "Long stays",
    lines: [
      "One month and up, at a reduced monthly rate",
      "Fibre internet and a desk that faces the trees",
      "Weekly cleaning and laundry",
      "Help with a car, a SIM and a doctor if you need one",
    ],
    body: "For a winter away, a remote work stretch, or a trial run before you decide whether to buy a plot of your own.",
  },
];

const included = [
  "Private covered terrace",
  "Air conditioning in the bedrooms",
  "Fully equipped kitchen",
  "Fibre internet",
  "Shared pool",
  "Off-street parking",
  "Backup water and power",
  "Local contact on the ground",
];

export default function Stay() {
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Stay with us"
        title="A fortnight, or a whole season"
        lede={`We take guests from ${site.openingDate}. Both short holidays and long stays are available — tell us which you have in mind and we will send rates and availability.`}
      />

      <section className="bg-papel py-24 sm:py-32">
        <div className="shell grid gap-8 md:grid-cols-2">
          {options.map((o) => (
            <article
              key={o.title}
              className="flex flex-col rounded-lg border border-tinta/12 bg-arena/50 p-9 sm:p-11"
            >
              <p className="eyebrow text-flor">{o.tag}</p>
              <h2 className="h-lg mt-4">{o.title}</h2>
              <p className="mt-5 leading-[1.75] text-tinta/75">{o.body}</p>
              <ul className="mt-8 space-y-3 border-t border-tinta/10 pt-7">
                {o.lines.map((l) => (
                  <li key={l} className="flex gap-3 text-[0.97rem] text-tinta/80">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-flor" />
                    {l}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `${o.title} enquiry — Samanea Lofts`
                )}`}
                className="btn-flor mt-9 self-start"
              >
                Ask about {o.title.toLowerCase()}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-arena py-24 sm:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-flor">In every loft</p>
            <h2 className="h-lg mt-5 max-w-[12ch]">What comes with it</h2>
          </div>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {included.map((i) => (
              <li
                key={i}
                className="flex items-baseline gap-4 border-b border-tinta/10 pb-4 text-[1.02rem]"
              >
                <span className="font-mono text-xs text-flor">·</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-jungle py-24 text-papel sm:py-28">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="h-lg max-w-[20ch]">Rates and availability on request</h2>
            <p className="mt-5 max-w-[46ch] text-papel/70">
              We are not on a booking platform yet. Email us with your dates and
              how many of you there are, and you will hear back from a person.
            </p>
          </div>
          <Link href="/contact" className="btn-flor shrink-0">
            Send an enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
