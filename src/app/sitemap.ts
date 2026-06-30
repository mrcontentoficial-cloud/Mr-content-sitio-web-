import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { cases } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: base, priority: 1 },
    { url: `${base}/nosotros`, priority: 0.7 },
    ...cases.map((c) => ({ url: `${base}/casos/${c.slug}`, priority: 0.6 })),
  ];
}
