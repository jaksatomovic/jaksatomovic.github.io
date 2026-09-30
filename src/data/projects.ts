import type { Locale } from "../i18n";

export type Project = {
  id: string;
  name: string;
  kicker: string;
  status: string;
  summary: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  tone: string;
  stack: string[];
  area: "apps" | "hardware" | "garage";
};

type Text = Pick<Project, "kicker" | "status" | "summary" | "cta" | "imageAlt">;
type Base = Omit<Project, keyof Text> & { text: Record<Locale, Text> };

const base: Base[] = [
  {
    id: "tonko",
    name: "TONKO",
    href: "/apps/tonko",
    image: "/images/tonko/feature.png",
    tone: "linear-gradient(135deg, #0f1b2d, #172a45)",
    stack: ["Kotlin", "Android", "NestJS", "PostgreSQL", "Next.js"],
    area: "apps",
    text: {
      en: {
        kicker: "Android app",
        status: "Launching",
        summary:
          "Money habits for kids, with parents in control. Jobs, three jars, savings goals and short lessons, wrapped in one Android app with a parent side behind a PIN and a calm kid side.",
        cta: "View case study",
        imageAlt: "TONKO feature graphic with the Tonko mascot and the line Money skills for kids",
      },
      hr: {
        kicker: "Android aplikacija",
        status: "Lansiranje",
        summary:
          "Navike s novcem za djecu, uz roditelja koji sve odobrava. Zadaci, tri staklenke, ciljevi štednje i kratke lekcije u jednoj Android aplikaciji, s roditeljskim dijelom iza PIN-a i mirnim dječjim dijelom.",
        cta: "Pogledaj studiju",
        imageAlt: "TONKO grafika s maskotom Tonkom i natpisom Money skills for kids",
      },
    },
  },
  {
    id: "airshare",
    name: "AirShare",
    href: "https://tryairshare.com",
    image: "/images/airshare-mark.svg",
    imageFit: "cover",
    tone: "linear-gradient(135deg, #0c1512, #101a1e)",
    stack: ["Next.js", "TypeScript", "Iroh", "QUIC"],
    area: "apps",
    text: {
      en: {
        kicker: "Web product",
        status: "Live",
        summary:
          "Instant, encrypted file delivery over QUIC. Devices find each other locally, relays step in when they are apart, and nothing turns into cloud storage.",
        cta: "Visit tryairshare.com",
        imageAlt: "Illustration of two devices exchanging a file over a direct encrypted link",
      },
      hr: {
        kicker: "Web proizvod",
        status: "Uživo",
        summary:
          "Trenutni, šifrirani prijenos datoteka preko QUIC-a. Uređaji se pronađu lokalno, releji uskaču kad su udaljeni, i ništa ne završava u cloud pohrani.",
        cta: "Posjeti tryairshare.com",
        imageAlt: "Ilustracija dva uređaja koja razmjenjuju datoteku preko izravne šifrirane veze",
      },
    },
  },
  {
    id: "keero",
    name: "Keero Bot",
    href: "/hardware#keero",
    image: "/images/keero-hero.jpg",
    imageFit: "cover",
    tone: "#ffffff",
    stack: ["ESP32-S3", "C++", "PlatformIO", "Audio DSP"],
    area: "hardware",
    text: {
      en: {
        kicker: "AI hardware platform",
        status: "Active prototype",
        summary:
          "A modular ESP32-S3 device core for voice-first, interactive hardware: audio in and out, sensing, haptics, display and camera paths, docks and module expansion.",
        cta: "Explore the platform",
        imageAlt: "3D render of the Keero Bot mainboard and modules",
      },
      hr: {
        kicker: "AI hardverska platforma",
        status: "Aktivni prototip",
        summary:
          "Modularna ESP32-S3 jezgra za interaktivne uređaje s glasovnim sučeljem: audio ulaz i izlaz, senzori, haptika, display i kamera, dockovi i moduli za proširenje.",
        cta: "Istraži platformu",
        imageAlt: "3D render Keero Bot mainboarda i modula",
      },
    },
  },
  {
    id: "moto32",
    name: "Moto32",
    href: "https://moto32.vercel.app",
    image: "/images/moto32-board.svg",
    imageFit: "cover",
    tone: "linear-gradient(135deg, #0e1512, #131a16)",
    stack: ["ESP32-S3", "KiCad", "MIT licence"],
    area: "hardware",
    text: {
      en: {
        kicker: "Open-source hardware",
        status: "Open source",
        summary:
          "An ESP32-S3 motorcycle control unit with eight MOSFET-protected outputs, USB-C programming and full build docs. An open alternative to commercial M-Unit style boxes.",
        cta: "Read the docs",
        imageAlt: "Stylised illustration of the Moto32 control board",
      },
      hr: {
        kicker: "Open-source hardver",
        status: "Open source",
        summary:
          "ESP32-S3 upravljačka jedinica za motocikle s osam MOSFET-zaštićenih izlaza, USB-C programiranjem i potpunom dokumentacijom. Otvorena alternativa komercijalnim M-Unit kutijama.",
        cta: "Otvori dokumentaciju",
        imageAlt: "Stilizirana ilustracija Moto32 upravljačke pločice",
      },
    },
  },
  {
    id: "canarin",
    name: "Canarin Garage",
    href: "/canarin-garage",
    image: "/images/garage/img-2908.jpg",
    tone: "#1a1a1a",
    stack: ["SolidWorks", "ANSYS", "TIG", "Motogadget"],
    area: "garage",
    text: {
      en: {
        kicker: "Custom motorcycles",
        status: "In the shop",
        summary:
          "A 1981 Honda CX500 rebuilt as a neo-retro endurance cafe racer: CAD and ANSYS-checked monoshock chassis, GSX-R front end, custom 17-inch spoked wheels.",
        cta: "Open the build log",
        imageAlt: "Honda CX500 cafe racer mock-up in the Canarin Garage workshop",
      },
      hr: {
        kicker: "Custom motocikli",
        status: "U radionici",
        summary:
          "Honda CX500 iz 1981. pretvorena u neo-retro endurance cafe racer: CAD i ANSYS provjerena monoshock šasija, GSX-R prednji kraj, custom 17-inčni žbičani kotači.",
        cta: "Otvori dnevnik gradnje",
        imageAlt: "Mock-up Honde CX500 cafe racera u radionici Canarin Garage",
      },
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return base.map(({ text, ...rest }) => ({ ...rest, ...text[locale] }));
}

export function getProject(id: string, locale: Locale): Project {
  return getProjects(locale).find((p) => p.id === id)!;
}

export function getProjectsByArea(area: Project["area"], locale: Locale) {
  return getProjects(locale).filter((p) => p.area === area);
}
