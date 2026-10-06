import type { Locale } from "../i18n";

export const studio = {
  name: "Boiled Eggs Studio",
  url: "https://boiledeggs.studio",
  email: "hello@boiledeggs.studio",
};

export function getStudio(locale: Locale) {
  return {
    ...studio,
    href: studio.url + (locale === "hr" ? "/hr/" : "/"),
    tonkoHref: studio.url + (locale === "hr" ? "/hr/apps/tonko/" : "/apps/tonko/"),
    ...(locale === "hr" ? {
      eyebrow: "Moj nezavisni studio",
      title: "Boiled Eggs Studio",
      body: "Pod imenom Boiled Eggs stvaram vlastite aplikacije i igre. Od ideje i dizajna do Androida, backenda i objave — studio je dom za te proizvode i njihov daljnji razvoj.",
      cta: "Posjeti studio",
      contact: "Kontakt studija",
      tonkoNote: "Tonko je projekt studija Boiled Eggs. Priču o aplikaciji, ekrane i ostale projekte pronađi na webu studija.",
      tonkoCta: "Tonko u studiju",
    } : {
      eyebrow: "My independent studio",
      title: "Boiled Eggs Studio",
      body: "Boiled Eggs is where I build my own apps and games. From the idea and design to Android, backend and release, the studio is home to those products and their continued development.",
      cta: "Visit the studio",
      contact: "Studio contact",
      tonkoNote: "Tonko is a Boiled Eggs Studio project. Explore its story, screens and the other projects on the studio website.",
      tonkoCta: "Tonko at the studio",
    }),
  };
}
