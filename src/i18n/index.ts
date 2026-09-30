export const locales = ["en", "hr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", hr: "Hrvatski" };
export const localeTags: Record<Locale, string> = { en: "en", hr: "hr" };

/** Locale for a URL: `/hr` and `/hr/...` are Croatian, everything else English. */
export function getLocale(url: URL): Locale {
  const p = url.pathname;
  return p === "/hr" || p === "/hr/" || p.startsWith("/hr/") ? "hr" : "en";
}

/** Strip a locale prefix and return the canonical (English) path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/hr" || pathname === "/hr/") return "/";
  if (pathname.startsWith("/hr/")) return pathname.slice(3);
  return pathname;
}

/** Prefix a canonical path for the given locale. External links and anchors pass through. */
export function localePath(path: string, locale: Locale): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  if (locale === "en") return path;
  if (path === "/") return "/hr/";
  return `/hr${path}`;
}

/** Same page in the other locale. */
export function switchLocalePath(url: URL, to: Locale): string {
  return localePath(stripLocale(url.pathname) + url.hash, to);
}

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "hr" ? "hr-HR" : "en", {
    month: locale === "hr" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
