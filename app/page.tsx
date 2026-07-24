import Link from "next/link";
import Image from "next/image";
import SitePlan from "../components/SitePlan";
import { getSite, getLots, lotSummary, getJourney } from "../lib/content";

export default async function Home() {
  const site = getSite();
  const lots = getLots();
  const { available } = lotSummary(lots);
  const journey = await getJourney();
  const built = journey.filter((e) => !e.upcoming);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-jungle">
        <Image
          src="/images/construction-01.jpg"
          alt="The first Samanea loft taking shape on the hillside, jungle behind it"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle via-jungle/55 to-jungle/70" />

        <div className="shell relative z-10 pb-20 pt-32 text-papel">
          <p className="eyebrow rise text-mar">
            {site.location}
          </p>
          <h1 className="h-xl rise mt-6 max-w-[15ch]" style={{ animationDelay: "0.1s" }}>
            Between the jungle and the Atlantic.
          </h1>
          <p
            className="lede rise mt-8 max-w-[46ch] text-papel/80"
            style={{ animationDelay: "0.2s" }}
          >
            Eleven homes on a hillside above Las Terrenas, built slowly and in the
            shade of the trees that were already there. Opening {site.openingDate}.
          </p>
          <div
            className="rise mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/stay" className="btn-flor">
              Stay with us
            </Link>
            <Link href="/invest" className="btn-line text-papel hover:text-jungle">
              {available > 0 ? `${available} lots still available` : "Build here"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── The place ────────────────────────────────────────── */}
      <section className="bg-papel py-24 sm:py-32">
        <div className="shell grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <p className="eyebrow text-flor">The place</p>
            <h2 className="h-lg mt-5">A boutique hideaway in the heart of Samaná</h2>
          </div>
          <div className="space-y-6 lede text-tinta/80">
            <p>
              Samanea Lofts sits on a slope in La Barbacoa, ten minutes inland from
              Las Terrenas — far enough from the road to hear the birds instead of
              the scooters, close enough that dinner is a short drive away.
            </p>
            <p>
              The layout was drawn around the mature trees rather than through them.
              Every house gets a covered terrace running its full width, deep enough
              to sit out in the rain, and a wall of glass that turns that terrace
              into another room.
            </p>
            <p>
              It began as one Dutch family buying a piece of hillside. It has become
              a small neighbourhood of people doing the same thing.
            </p>
            <Link
              href="/journey"
              className="inline-block border-b border-flor pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flor"
            >
              Read how it was built →
            </Link>
          </div>
        </div>
      </section>

      {/* ── The fork: two ways in ────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <Link
          href="/stay"
          className="group relative flex min-h-[420px] flex-col justify-between bg-canopy p-10 text-papel transition-colors hover:bg-moss sm:p-14"
        >
          <div>
            <p className="eyebrow text-mar">Option one</p>
            <h3 className="h-lg mt-5">Stay here</h3>
          </div>
          <div>
            <p className="lede max-w-[34ch] text-papel/75">
              Rent a loft for a fortnight or for a season. Both short and long stays
              open from {site.openingDate}.
            </p>
            <span className="mt-7 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-flor">
              See what a stay looks like →
            </span>
          </div>
        </Link>

        <Link
          href="/invest"
          className="group relative flex min-h-[420px] flex-col justify-between bg-flor p-10 text-papel transition-colors hover:bg-florLt sm:p-14"
        >
          <div>
            <p className="eyebrow text-papel/70">Option two</p>
            <h3 className="h-lg mt-5">Build here</h3>
          </div>
          <div>
            <p className="lede max-w-[34ch] text-papel/85">
              {available > 0
                ? `${available} lots are still unsold. Buy the land and draw the house on it with us.`
                : "Buy the land and draw the house on it with us."}
            </p>
            <span className="mt-7 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-papel">
              See the available lots →
            </span>
          </div>
        </Link>
      </section>

      {/* ── Site plan ────────────────────────────────────────── */}
      <section className="bg-jungle py-24 text-papel sm:py-32">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mar">Samanea Loft Barbacoa II</p>
              <h2 className="h-lg mt-5 max-w-[18ch]">Eleven lots, one internal road</h2>
            </div>
            <p className="max-w-[38ch] text-papel/60">
              Hover or tap a plot for its dimensions. Schematic — the surveyed
              drawing is on the{" "}
              <Link href="/invest" className="text-flor underline underline-offset-4">
                Build here
              </Link>{" "}
              page.
            </p>
          </div>
          <div className="mt-14">
            <SitePlan lots={lots} />
          </div>
        </div>
      </section>

      {/* ── Where we are ─────────────────────────────────────── */}
      <section className="bg-arena py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-flor">Where we are</p>
            <h2 className="h-lg mt-5 max-w-[16ch]">
              On the north coast of the peninsula
            </h2>
            <p className="lede mt-6 max-w-[44ch] text-tinta/75">
              The Samaná peninsula is the green finger on the north-east of the
              Dominican Republic. We sit on its Atlantic side, between Las Terrenas
              and El Limón.
            </p>
            <dl className="mt-10 divide-y divide-tinta/10 border-y border-tinta/10">
              {site.distances.map((d) => (
                <div key={d.place} className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4">
                  <div>
                    <dt className="font-display text-xl">{d.place}</dt>
                    <p className="text-sm text-tinta/60">{d.note}</p>
                  </div>
                  <dd className="font-mono text-sm tabular-nums text-flor">{d.time}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border-b border-flor pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flor"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/map-detail.png"
              alt="Satellite map showing Samanea Lofts in the hills between Las Terrenas and El Limón"
              width={1400}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Journey teaser ───────────────────────────────────── */}
      <section className="bg-papel py-24 sm:py-32">
        <div className="shell">
          <p className="eyebrow text-flor">Our journey</p>
          <h2 className="h-lg mt-5 max-w-[20ch]">
            From jungle to finished house, photographed the whole way
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {built.slice(-3).map((e) => (
              <Link key={e.slug} href="/journey" className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-arena">
                  {e.image ? (
                    <Image
                      src={e.image}
                      alt={e.imageAlt}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.18em] text-tinta/35">
                      Photo to come
                    </div>
                  )}
                </div>
                <p className="eyebrow mt-5 text-tinta/45">{e.date}</p>
                <p className="h-md mt-2">{e.title}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/journey"
            className="mt-12 inline-block border-b border-flor pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-flor"
          >
            See the full timeline →
          </Link>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="bg-jungle py-24 text-papel sm:py-28">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="h-lg max-w-[18ch]">Come and see it, or ask us anything</h2>
            <p className="mt-5 max-w-[46ch] text-papel/70">
              We answer every message ourselves. Site visits can be arranged in
              Samaná with a few days&rsquo; notice.
            </p>
          </div>
          <Link href="/contact" className="btn-flor shrink-0">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
