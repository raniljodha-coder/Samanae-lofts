"use client";

import { useState } from "react";
import type { Lot, LotStatus } from "../lib/content";

const STATUS: Record<LotStatus, { label: string; fill: string; text: string }> = {
  available: { label: "Available", fill: "#C4685A", text: "#FAF7F2" },
  reserved: { label: "Reserved", fill: "#7DA49E", text: "#16281F" },
  sold: { label: "Sold", fill: "#2F4A38", text: "#8FA894" },
};

/* ──────────────────────────────────────────────────────────────
   Parcel geometry traced from the registered survey
   (Plano General, mensura 12023053184_1_1 … _1_11).
   Simplified for the screen but true to the subdivision:
   lot 1 fronts Calle Luna (west); 2–3 sit along the north;
   4 is the north-east parcel; 5–6 step down the east side;
   7 is central; 8–9 sit inside the camino loop; 10 and 11
   are the large southern parcels. Coordinates in a
   1000 × 1050 viewBox.
   ────────────────────────────────────────────────────────────── */
const SHAPES: Record<number, string> = {
  1: "20,325 240,312 226,428 206,510 206,636 40,662",
  2: "268,310 436,118 502,172 500,202 336,388",
  3: "560,58 740,46 720,188 578,196",
  4: "596,246 840,206 866,338 634,378",
  5: "872,220 986,252 962,420 866,360",
  6: "700,428 944,458 918,616 684,560",
  7: "540,296 624,352 664,528 578,552 534,468 520,380",
  8: "302,508 468,534 504,594 318,620",
  9: "316,648 536,630 544,744 348,750",
  10: "92,716 250,700 270,770 348,824 566,832 554,932 102,922",
  11: "634,778 668,644 918,662 966,976 636,982",
};

/* Label anchor per lot (centroid, nudged by eye) */
const LABELS: Record<number, [number, number, boolean]> = {
  // [x, y, roomForArea]
  1: [126, 486, true],
  2: [388, 246, false],
  3: [650, 122, true],
  4: [732, 292, true],
  5: [932, 322, false],
  6: [812, 522, true],
  7: [598, 428, false],
  8: [400, 564, false],
  9: [432, 692, true],
  10: [320, 862, true],
  11: [800, 812, true],
};

/* The camino: enters from Calle Luna, runs NE to exit at the top,
   with the loop that encircles lots 8 and 9 — as on the survey. */
const ROAD_ENTRY = "M 50,700 C 63,699 105,695 130,692 C 155,689 182,685 200,680 C 218,675 231,671 240,660 C 249,649 254,631 256,616 C 258,601 254,579 254,572";
const ROAD_MAIN =
  "M 296,438 C 307,432 339,414 360,400 C 381,386 406,369 424,352 C 442,335 456,316 468,296 C 480,276 487,255 494,232 C 501,209 506,184 510,160 C 514,136 515,100 516,88";
const ROAD_LOOP =
  "M 296,438 C 318,436 366,457 400,470 C 434,483 472,501 500,516 C 528,531 548,544 566,562 C 584,580 601,603 608,626 C 615,649 613,676 608,700 C 603,724 594,755 576,772 C 558,789 529,795 500,800 C 471,805 430,804 400,800 C 370,796 343,791 322,778 C 301,765 284,745 272,724 C 260,703 255,678 252,650 C 249,622 250,584 252,556 C 254,528 259,500 266,480 C 273,460 274,440 296,438 Z";

const TREES: [number, number][] = [
  [520, 250], [790, 120], [180, 240], [560, 640], [980, 520],
  [120, 690], [430, 590], [300, 690], [640, 900], [160, 950], [940, 600],
];

export default function SitePlan({ lots }: { lots: Lot[] }) {
  const [activeId, setActiveId] = useState<number | null>(
    lots.find((l) => l.status === "available")?.id ?? null
  );
  const active = lots.find((l) => l.id === activeId) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_290px] lg:items-start">
      <div>
        <svg
          viewBox="0 20 1000 1010"
          className="w-full"
          role="img"
          aria-label="Site plan of Samanea Loft Barbacoa II, traced from the registered survey, showing eleven lots and the internal road"
        >
          {/* Calle Luna along the west */}
          <path
            d="M 30,60 C 12,300 18,520 38,700 C 50,800 68,900 88,1030"
            fill="none"
            stroke="#0E1C15"
            strokeWidth={22}
            strokeLinecap="round"
          />
          <text
            transform="translate(14,420) rotate(-84)"
            fill="#7DA49E"
            style={{ font: "400 13px var(--font-mono)", letterSpacing: "0.2em" }}
          >
            CALLE LUNA
          </text>

          {/* Internal camino: entry from Calle Luna, loop around lots 8–9, spur exiting north */}
          <path d={ROAD_ENTRY} fill="none" stroke="#0E1C15" strokeWidth={22} strokeLinecap="round" />
          <path d={ROAD_MAIN} fill="none" stroke="#0E1C15" strokeWidth={22} strokeLinecap="round" />
          <path d={ROAD_LOOP} fill="none" stroke="#0E1C15" strokeWidth={22} strokeLinejoin="round" />
          <path d={ROAD_ENTRY} fill="none" stroke="#7DA49E" strokeWidth={1} strokeDasharray="9 11" opacity={0.5} />
          <path d={ROAD_MAIN} fill="none" stroke="#7DA49E" strokeWidth={1} strokeDasharray="9 11" opacity={0.5} />
          <path d={ROAD_LOOP} fill="none" stroke="#7DA49E" strokeWidth={1} strokeDasharray="9 11" opacity={0.5} />

          {TREES.map(([x, y], i) => (
            <g key={i} opacity={0.32}>
              <circle cx={x} cy={y} r={12} fill="none" stroke="#7DA49E" strokeWidth={1} />
              <circle cx={x} cy={y} r={2} fill="#7DA49E" />
            </g>
          ))}

          {lots.map((lot) => {
            const s = STATUS[lot.status];
            const isActive = lot.id === activeId;
            const isSold = lot.status === "sold";
            const [lx, ly, roomForArea] = LABELS[lot.id] ?? [0, 0, false];
            return (
              <g
                key={lot.id}
                tabIndex={0}
                role="button"
                aria-label={`Lot ${lot.id}, ${lot.terrain} square metres, ${s.label}`}
                onMouseEnter={() => setActiveId(lot.id)}
                onFocus={() => setActiveId(lot.id)}
                onClick={() => setActiveId(lot.id)}
                className="cursor-pointer outline-none"
              >
                <polygon
                  points={SHAPES[lot.id]}
                  fill={s.fill}
                  fillOpacity={isSold ? 0.55 : isActive ? 1 : 0.85}
                  stroke={isActive ? "#FAF7F2" : "#0E1C15"}
                  strokeWidth={isActive ? 2.5 : 1}
                  strokeLinejoin="round"
                  className="transition-all duration-200"
                />
                <text
                  x={lx}
                  y={roomForArea ? ly - 4 : ly + 8}
                  textAnchor="middle"
                  fill={s.text}
                  style={{ font: `400 ${roomForArea ? 32 : 24}px var(--font-display)` }}
                >
                  {String(lot.id).padStart(2, "0")}
                </text>
                {roomForArea && (
                  <text
                    x={lx}
                    y={ly + 20}
                    textAnchor="middle"
                    fill={s.text}
                    opacity={0.85}
                    style={{ font: "400 13px var(--font-mono)", letterSpacing: "0.05em" }}
                  >
                    {Math.round(lot.terrain).toLocaleString("en-US")} m²
                  </text>
                )}
              </g>
            );
          })}

          {/* North arrow */}
          <g transform="translate(952,66)" opacity={0.6}>
            <line x1={0} y1={16} x2={0} y2={-16} stroke="#7DA49E" strokeWidth={1.5} />
            <polygon points="0,-20 -6,-8 6,-8" fill="#7DA49E" />
            <text y={36} textAnchor="middle" fill="#7DA49E" style={{ font: "400 12px var(--font-mono)" }}>
              N
            </text>
          </g>
        </svg>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {(Object.keys(STATUS) as LotStatus[])
            .filter((k) => lots.some((l) => l.status === k))
            .map((k) => (
              <span
                key={k}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-papel/60"
              >
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ background: STATUS[k].fill, opacity: k === "sold" ? 0.55 : 1 }}
                />
                {STATUS[k].label}
              </span>
            ))}
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-papel/35">
            Traced from the registered survey
          </span>
        </div>
      </div>

      <aside className="rounded-lg border border-papel/15 bg-canopy/60 p-6">
        {active ? (
          <>
            <p className="eyebrow text-mar">Lot {String(active.id).padStart(2, "0")}</p>
            <p
              className="mt-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{
                background: STATUS[active.status].fill,
                color: STATUS[active.status].text,
              }}
            >
              {STATUS[active.status].label}
            </p>
            <dl className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between border-b border-papel/10 pb-3">
                <dt className="text-papel/60">Plot</dt>
                <dd className="font-mono text-papel">
                  {active.terrain.toLocaleString("en-US", { minimumFractionDigits: 2 })} m²
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-papel/10 pb-3">
                <dt className="text-papel/60">Parcel</dt>
                <dd className="font-mono text-sm text-papel/80">…3184_1_{active.id}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-papel/10 pb-3">
                <dt className="text-papel/60">Price</dt>
                <dd className="font-mono text-papel">{active.price || "On request"}</dd>
              </div>
            </dl>
            {active.status === "available" ? (
              <p className="mt-6 text-[0.95rem] leading-[1.7] text-papel/75">
                This plot is unbuilt. The house that goes on it is drawn with you —
                layout, size and orientation are still open.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-papel/60">Select a lot to see its details.</p>
        )}
      </aside>
    </div>
  );
}
