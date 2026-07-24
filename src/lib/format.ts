import type { Locale } from "@/i18n/locales";

const localeTag: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

/** Format an ISO date (YYYY-MM-DD) per locale. */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTag[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
