import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT = path.join(process.cwd(), "content");

export type Distance = { place: string; time: string; note: string };

export type Site = {
  name: string;
  tagline: string;
  openingDate: string;
  email: string;
  whatsapp: string;
  location: string;
  mapsUrl: string;
  distances: Distance[];
};

export type LotStatus = "available" | "reserved" | "sold";
export type Lot = {
  id: number;
  terrain: number;
  villa?: number;
  status: LotStatus;
  price?: string;
};

function read(file: string) {
  return matter(fs.readFileSync(path.join(CONTENT, file), "utf8"));
}

export function getSite(): Site {
  return read("site.md").data as Site;
}

export function getLots(): Lot[] {
  return (read("lots.md").data.lots as Lot[]) ?? [];
}

export function lotSummary(lots: Lot[]) {
  return {
    available: lots.filter((l) => l.status === "available").length,
    reserved: lots.filter((l) => l.status === "reserved").length,
    total: lots.length,
  };
}

