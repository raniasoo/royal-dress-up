import type { MetadataRoute } from "next";
import { dresses } from "@/data/dresses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royal-dress-up.vercel.app";

  const dressPages = dresses.map((dress) => ({
    url: `${baseUrl}/dress/${dress.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/dress-up`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/try-on`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...dressPages,
  ];
}
