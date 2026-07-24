import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { getSite } from "../../lib/content";

export const metadata: Metadata = {
  title: "The lofts",
  description:
    "Two-storey concrete lofts with a full-width covered terrace, deep-set windows and a wall of sliding glass, built on a hillside in La Barbacoa, Samaná.",
};

const specs = [
  { k: "Built area", v: "102.86 m²", n: "Standard loft footprint" },
  { k: "Floors", v: "Two", n: "Living below, sleeping above" },
  { k: "Terrace", v: "Full width", n: "Covered by a steel pergola" },
  { k: "Structure", v: "Poured concrete", n: "Built for the Caribbean, not for a season" },
  { k: "Glazing", v: "Sliding walls", n: "Terrace reads as another room" },
  { k: "Plot sizes", v: "203 – 1,344 m²", n: "Varies by lot" },
];

const qualities = [
  {
    t: "Drawn around the trees",
    d: "The internal road follows the contour of the hill and the mature trees on the survey stayed where they were. Nothing was flattened to make the plan easier.",
  },
  {
    t: "Built with what is here",
    d: "Concrete, local hardwood, lime render. Materials that are sourced on the island and that age in the humidity rather than fight it.",
  },
  {
    t: "Shade before air conditioning",
    d: "Deep overhangs, cross-ventilation and a pergola that keeps the midday sun off the glass. The cooling is there when you want it, not because you need it.",
  },
];

export default function Lofts() {
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="The lofts"
        title="Designed for comfort and connection"
        lede="Two floors, one long terrace, and a wall of glass between them. The lofts are small on purpose — the point is what happens outside them."
      />

      <section className="bg-papel">
        <div className="shell -mt-12 sm:-mt-16">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/construction-02.jpg"
              alt="A Samanea loft with glazing installed and the covered terrace framed out"
              width={1600}
              height={900}
              className="w-full object-cover"
              priority
            />
          </div>
          <p className="eyebrow mt-4 text-tinta/40">
            Loft under construction · {site.location}
          </p>
        </div>
      </section>

      <section className="bg-papel py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow text-flor">How they are built</p>
            <h2 className="h-lg mt-5 max-w-[14ch]">Three decisions that shaped everything</h2>
          </div>
          <div className="divide-y divide-tinta/10 border-y border-tinta/10">
            {qualities.map((q) => (
              <div key={q.t} className="py-8">
                <h3 className="h-md">{q.t}</h3>
                <p className="mt-3 max-w-[52ch] leading-[1.75] text-tinta/70">{q.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-arena py-24 sm:py-28">
        <div className="shell">
          <p className="eyebrow text-flor">The numbers</p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg bg-tinta/10 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((s) => (
              <div key={s.k} className="bg-arena p-7">
                <dt className="eyebrow text-tinta/45">{s.k}</dt>
                <dd className="mt-3 font-display text-3xl">{s.v}</dd>
                <p className="mt-2 text-sm text-tinta/60">{s.n}</p>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[60ch] text-sm leading-[1.7] text-tinta/55">
            Interiors are still being finished. Furnished photography will replace
            the construction images here closer to opening.
          </p>
        </div>
      </section>

      <section className="bg-jungle py-24 text-papel sm:py-28">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="h-lg max-w-[20ch]">
            Want one for a fortnight, or one of your own?
          </h2>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link href="/stay" className="btn-flor">
              Stay with us
            </Link>
            <Link href="/invest" className="btn-line text-papel hover:text-jungle">
              Build here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
