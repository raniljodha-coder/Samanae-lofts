import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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
  villa: number;
  status: LotStatus;
  price?: string;
};

export type JourneyEntry = {
  slug: string;
  order: number;
  date: string;
  title: string;
  image: string;
  imageAlt: string;
  upcoming: boolean;
  body: string;
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

export async function getJourney(): Promise<JourneyEntry[]> {
  const dir = path.join(CONTENT, "journey");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8")
      );
      const body = String(await remark().use(html).process(content));
      return {
        slug: file.replace(/\.md$/, ""),
        order: Number(data.order ?? 0),
        date: String(data.date ?? ""),
        title: String(data.title ?? ""),
        image: String(data.image ?? ""),
        imageAlt: String(data.imageAlt ?? ""),
        upcoming: Boolean(data.upcoming),
        body,
      };
    })
  );

  return entries.sort((a, b) => a.order - b.order);
}
