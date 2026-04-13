const DEFAULT_SITE_URL = "https://voltplus.com";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "";

  if (!raw) return DEFAULT_SITE_URL;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/$/, "");
  }

  return `https://${raw.replace(/\/$/, "")}`;
}

export const SITE_NAME = "Volt Plus";

export const SITE_BRAND_ALIASES = [
  "Volt Plus",
  "VoltPlus",
  "volt plus",
  "voltplus",
] as const;
