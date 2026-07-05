import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Crawlers de IA que copian contenido para entrenar modelos.
// Los bloqueamos para proteger el trabajo creativo de la marca.
// Google, Bing y buscadores normales quedan libres para no afectar el SEO.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "FacebookBot",
  "meta-externalagent",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
