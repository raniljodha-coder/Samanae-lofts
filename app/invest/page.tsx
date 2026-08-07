import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import SitePlan from "../../components/SitePlan";
import { getSite, getLots, lotSummary } from "../../lib/content";

export const metadata: Metadata = {
  title: "Build here",
  description:
    "Buy one of the last lots at Samanea Loft Barbacoa II in Samaná, Dominican Republic, and design the house that goes on it.",
};

const steps = [
  {
    t: "See the land",
    d: "In person if you can get to Samaná, on a video walk-through if you cannot. You pick the plot and we walk the boundaries together.",
  },
  {
    t: "Draw the house",
    d: "The standard loft is 102.86 m² over two floors. From there the layout, finishes, orientation and outdoor space are drawn with our architect to what you actually want.",
  },
  {
    t: "Sign and register",
    d: "Purchase is handled by a Dominican notary with the title registered in your name — or in a company, if that suits you better. Foreign buyers have the same ownership rights as Dominican nationals.",
  },
  {
    t: "Build and hand over",
    d: "Construction runs in stages against an agreed schedule. You get photographs at every stage, the same way we have documented our own house.",
  },
];

const status = {
  available: { label: "Available", cls: "bg-flor text-papel" },
  reserved: { label: "Reserved", cls: "bg-mar text-jungle" },
  sold: { label: "Sold", cls: "bg-tinta/12 text-tinta/55" },
} as const;

export default function Invest() {
  const site = getSite();
  const lots = getLots();
  const { available, reserved } = lotSummary(lots);

  return (
    <>
      <PageHeader
        eyebrow="Build here"
        title="Buy the land. Draw the house."
        lede={`Samanea Loft Barbacoa II is eleven lots on one internal road. ${
          available > 0
            ? `${available} are still unsold${reserved ? ` and ${reserved} is reserved` : ""}.`
            : "All lots are currently taken."
        } What gets built on them is decided with the person buying.`}
      />

      <section className="bg-jungle pb-24 text-papel sm:pb-32">
        <div className="shell">
          <SitePlan lots={lots} />
        </div>
      </section>

      {/* ── Lot schedule ─────────────────────────────────────── */}
      <section className="bg-papel py-24 sm:py-32">
        <div className="shell">
          <p className="eyebrow text-flor">Lot schedule</p>
          <h2 className="h-lg mt-5 max-w-[16ch]">Every plot, and what is left</h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-tinta/20">
                  {["Lot", "Plot", "Parcel", "Status"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-tinta/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((l) => (
                  <tr
                    key={l.id}
                    className={`border-b border-tinta/10 ${
                      l.status === "sold" ? "text-tinta/45" : ""
                    }`}
                  >
                    <td className="py-4 font-display text-2xl">
                      {String(l.id).padStart(2, "0")}
                    </td>
                    <td className="py-4 font-mono text-sm tabular-nums">
                      {l.terrain.toLocaleString("en-US", { minimumFractionDigits: 2 })} m²
                    </td>
                    <td className="py-4 font-mono text-sm tabular-nums">
                      …3184_1_{l.id}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                          status[l.status].cls
                        }`}
                      >
                        {status[l.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-tinta/55">
            Plot areas and parcel numbers are from the registered survey (mensura
            12023053184). Prices on request.
          </p>
        </div>
      </section>

      {/* ── Surveyed drawing ─────────────────────────────────── */}
      <section className="bg-arena py-24 sm:py-28">
        <div className="shell">
          <p className="eyebrow text-flor">The survey</p>
          <h2 className="h-lg mt-5 max-w-[18ch]">Planta de conjunto y linderos</h2>
          <p className="lede mt-6 max-w-[52ch] text-tinta/75">
            The registered site plan, showing plot boundaries, the internal road and
            the trees the layout was drawn around.
          </p>
          <div className="mt-12 overflow-hidden rounded-lg bg-white p-4 sm:p-8">
            <Image
              src="/images/site-plan.png"
              alt="Registered lotification drawing for Samanea Loft Barbacoa II showing plot boundaries and the internal road"
              width={1500}
              height={1060}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="bg-papel py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-flor">How it works</p>
            <h2 className="h-lg mt-5 max-w-[12ch]">Four steps, in order</h2>
            <p className="mt-6 max-w-[36ch] leading-[1.75] text-tinta/70">
              We have done this once already, for ourselves. The process below is
              the one we went through.
            </p>
          </div>
          <ol className="divide-y divide-tinta/10 border-y border-tinta/10">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-7 py-8">
                <span className="font-mono text-sm text-flor">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="h-md">{s.t}</h3>
                  <p className="mt-3 max-w-[52ch] leading-[1.75] text-tinta/70">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-jungle py-24 text-papel sm:py-28">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="h-lg max-w-[20ch]">
              {available > 0
                ? `Ask about the ${available} remaining lots`
                : "Ask about what comes next"}
            </h2>
            <p className="mt-5 max-w-[46ch] text-papel/70">
              Tell us roughly what you are looking for and we will send plot
              dimensions, pricing and build costs.
            </p>
          </div>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Lot enquiry — Samanea Loft Barbacoa II"
            )}`}
            className="btn-flor shrink-0"
          >
            Enquire about a lot
          </a>
        </div>
      </section>
    </>
  );
}
