import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { getSite } from "../../lib/content";

export const metadata: Metadata = {
  title: "Samaná",
  description:
    "Where Samanea Lofts sits on the Samaná peninsula, how to get there from El Catey airport, and what is worth doing nearby — beaches, whales and Salto El Limón.",
};

const nearby = [
  {
    t: "Whales in the bay",
    when: "January – March",
    d: "Thousands of humpbacks come into the Bahía de Samaná to calve. Boats go out from Santa Bárbara de Samaná; it is one of the most reliable whale sightings anywhere.",
  },
  {
    t: "Salto El Limón",
    when: "All year",
    d: "A fifty-metre waterfall about twenty minutes away, reached on foot or on horseback through the hills behind us.",
  },
  {
    t: "Playa Rincón",
    when: "All year",
    d: "Past Las Galeras at the tip of the peninsula. Regularly listed among the best beaches in the Caribbean, and still mostly empty.",
  },
  {
    t: "Las Terrenas",
    when: "All year",
    d: "Ten minutes down the hill. A fishing town that turned into a French, Italian and Dominican mix — bakeries, a fish market, and dinner on the sand.",
  },
];

export default function Samana() {
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Samaná"
        title="The green finger on the north-east coast"
        lede="A peninsula of jungle-covered hills between the Atlantic and the Bahía de Samaná. Less built than the south, wetter, greener, and considerably quieter."
      />

      <section className="bg-papel py-24 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/map-peninsula.png"
              alt="Map of the Samaná peninsula showing Samanea Lofts between Las Terrenas and El Limón"
              width={1400}
              height={720}
              className="w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="eyebrow text-flor">Getting here</p>
            <h2 className="h-lg mt-5 max-w-[14ch]">Closer than it looks</h2>
            <p className="lede mt-6 max-w-[44ch] text-tinta/75">
              El Catey (AZS) is the peninsula&rsquo;s own airport, with seasonal
              direct flights from Europe and North America. Santo Domingo (SDQ) and
              Punta Cana (PUJ) are the year-round alternatives, roughly two and a
              half and four hours away by road.
            </p>
            <dl className="mt-10 divide-y divide-tinta/10 border-y border-tinta/10">
              {site.distances.map((d) => (
                <div
                  key={d.place}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4"
                >
                  <div>
                    <dt className="font-display text-xl">{d.place}</dt>
                    <p className="text-sm text-tinta/60">{d.note}</p>
                  </div>
                  <dd className="font-mono text-sm tabular-nums text-flor">{d.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-arena py-24 sm:py-32">
        <div className="shell">
          <p className="eyebrow text-flor">Nearby</p>
          <h2 className="h-lg mt-5 max-w-[16ch]">Worth leaving the terrace for</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-tinta/10 sm:grid-cols-2">
            {nearby.map((n) => (
              <article key={n.t} className="bg-arena p-9 sm:p-11">
                <p className="eyebrow text-tinta/45">{n.when}</p>
                <h3 className="h-md mt-3">{n.t}</h3>
                <p className="mt-4 leading-[1.75] text-tinta/70">{n.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-papel py-24 sm:py-28">
        <div className="shell">
          <p className="eyebrow text-flor">Our position</p>
          <h2 className="h-lg mt-5 max-w-[18ch]">
            In the hills, eight minutes from the water
          </h2>
          <div className="mt-12 overflow-hidden rounded-lg">
            <Image
              src="/images/map-detail.png"
              alt="Satellite view of the coast between Las Terrenas and Playa El Anclón with the Samanea Lofts location marked"
              width={1600}
              height={860}
              className="w-full object-cover"
            />
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-flor pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flor"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>
    </>
  );
}
