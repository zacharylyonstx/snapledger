import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://recycling-fair-pill-paso.trycloudflare.com/sitemap.xml",
  };
}
