import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://alumind.co";

  const routes = [""];

  const locales = ["en", "es"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const url = `${siteUrl}/${locale}${route}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1.0 : 0.7,
        alternates: {
          languages: {
            en: `${siteUrl}/en${route}`,
            es: `${siteUrl}/es${route}`,
          },
        },
      });
    }
  }

  return entries;
}
