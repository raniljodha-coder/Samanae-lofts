"use client";

import { useState } from "react";
import type { Lot, LotStatus } from "../lib/content";

const STATUS: Record<LotStatus, { label: string; fill: string; text: string }> = {
  available: { label: "Available", fill: "#C4685A", text: "#FAF7F2" },
  reserved: { label: "Reserved", fill: "#7DA49E", text: "#16281F" },
  sold: { label: "Sold", fill: "#2F4A38", text: "#8FA894" },
};

const W = 1000;
const UPPER = [1, 2, 3, 4, 5, 6];
const DEPTH_UPPER = 210;
const DEPTH_LOWER = 190;
const GAP = 6;
const PAD = 60;
const ROAD_HALF = 16;

/** Gentle arc the internal road follows, so the plan reads as terrain, not a grid. */
const roadY = (x: number) => 300 + 34 * Math.sin((Math.PI * x) / W);

type Placed = Lot & {
  points: string;
  cx: number;
  cy: number;
  upper: boolean;
  w: number;
};

function layout(lots: Lot[]): Placed[] {
  const rows: Placed[] = [];

  for (const upper of [true, false]) {
    const row = lots.filter((l) => UPPER.includes(l.id) === upper);
    const total = row.reduce((s, l) => s + l.terrain, 0);
    const usable = W - PAD * 2 - GAP * (row.length - 1);
    let x = PAD;

    for (const lot of row) {
      const w = (lot.terrain / total) * usable;
      const x1 = x;
      const x2 = x + w;
      const depth = upper ? DEPTH_UPPER : DEPTH_LOWER;

      const pts = upper
        ? [
            [x1, roadY(x1) - ROAD_HALF - depth],
            [x2, roadY(x2) - ROAD_HALF - depth],
            [x2, roadY(x2) - ROAD_HALF],
            [x1, roadY(x1) - ROAD_HALF],
          ]
        : [
            [x1, roadY(x1) + ROAD_HALF],
            [x2, roadY(x2) + ROAD_HALF],
            [x2, roadY(x2) + ROAD_HALF + depth],
            [x1, roadY(x1) + ROAD_HALF + depth],
          ];

      rows.push({
        ...lot,
        points: pts.map((p) => p.join(",")).join(" "),
        cx: (x1 + x2) / 2,
        cy: upper
          ? roadY((x1 + x2) / 2) - ROAD_HALF - depth / 2
          : roadY((x1 + x2) / 2) + ROAD_HALF + depth / 2,
        upper,
        w,
      });

      x = x2 + GAP;
    }
  }
  return rows;
}

const roadPath = Array.from({ length: 41 }, (_, i) => {
  const x = (i / 40) * W;
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${roadY(x).toFixed(1)}`;
}).join(" ");

/** Mature trees kept in place by the layout, as marked on the surveyed plan. */
const TREES = [
  [150, 150],
  [330, 118],
  [520, 190],
  [700, 145],
  [880, 175],
  [200, 470],
  [430, 500],
  [640, 462],
  [830, 495],
];

export default function SitePlan({ lots }: { lots: Lot[] }) {
  const placed = layout(lots);
  const [activeId, setActiveId] = useState<number | null>(
    lots.find((l) => l.status === "available")?.id ?? null
  );
  const active = placed.find((l) => l.id === activeId) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_290px] lg:items-start">
      <div>
        <svg
          viewBox="0 40 1000 540"
          className="w-full"
          role="img"
          aria-label="Schematic site plan of Samanea Loft Barbacoa II showing eleven lots"
        >
          <path
            d={roadPath}
            fill="none"
            stroke="#0E1C15"
            strokeWidth={ROAD_HALF * 2}
            strokeLinecap="round"
          />
          <path
            d={roadPath}
            fill="none"
            stroke="#7DA49E"
            strokeWidth={1}
            strokeDasharray="10 12"
            opacity={0.5}
          />

          {TREES.map(([x, y], i) => (
            <g key={i} opacity={0.35}>
              <circle cx={x} cy={y} r={13} fill="none" stroke="#7DA49E" strokeWidth={1} />
              <circle cx={x} cy={y} r={2} fill="#7DA49E" />
            </g>
          ))}

          {placed.map((lot) => {
            const s = STATUS[lot.status];
            const isActive = lot.id === activeId;
            const isSold = lot.status === "sold";
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
                  points={lot.points}
                  fill={s.fill}
                  fillOpacity={isSold ? 0.55 : isActive ? 1 : 0.85}
                  stroke={isActive ? "#FAF7F2" : "#0E1C15"}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-200"
                />
                <text
                  x={lot.cx}
                  y={lot.w < 80 ? lot.cy + 6 : lot.cy - 4}
                  textAnchor="middle"
                  fill={s.text}
                  style={{
                    font: `400 ${lot.w < 80 ? 22 : 30}px var(--font-display)`,
                  }}
                >
                  {String(lot.id).padStart(2, "0")}
                </text>
                {lot.w >= 80 && (
                  <text
                    x={lot.cx}
                    y={lot.cy + 18}
                    textAnchor="middle"
                    fill={s.text}
                    opacity={0.85}
                    style={{ font: "400 12px var(--font-mono)", letterSpacing: "0.06em" }}
                  >
                    {Math.round(lot.terrain)} m²
                  </text>
                )}
              </g>
            );
          })}

          <text
            x={PAD}
            y={72}
            fill="#7DA49E"
            style={{ font: "400 12px var(--font-mono)", letterSpacing: "0.2em" }}
          >
            CALLE LUNA →
          </text>
        </svg>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {(Object.keys(STATUS) as LotStatus[]).map((k) => (
            <span key={k} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-papel/60">
              <span
                className="h-3 w-3 rounded-sm"
                style={{ background: STATUS[k].fill, opacity: k === "sold" ? 0.55 : 1 }}
              />
              {STATUS[k].label}
            </span>
          ))}
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
                <dt className="text-papel/60">Built area</dt>
                <dd className="font-mono text-papel">
                  {active.villa.toLocaleString("en-US", { minimumFractionDigits: 2 })} m²
                </dd>
              </div>
              {active.price ? (
                <div className="flex items-baseline justify-between border-b border-papel/10 pb-3">
                  <dt className="text-papel/60">From</dt>
                  <dd className="font-mono text-papel">{active.price}</dd>
                </div>
              ) : null}
            </dl>
            {active.status === "available" ? (
              <p className="mt-6 text-[0.95rem] leading-[1.7] text-papel/75">
                This plot is unbuilt. The house that goes on it is drawn with you —
                layout, finishes and orientation are still open.
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
