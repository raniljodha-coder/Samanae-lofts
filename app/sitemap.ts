import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://samanealofts.com";
  const routes = ["", "/lofts", "/stay", "/invest", "/journey", "/samana", "/contact"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" || r === "/journey" ? "monthly" : "yearly",
    priority: r === "" ? 1 : 0.7,
  }));
}
