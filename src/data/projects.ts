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

export const projects: Project[] = [
  {
    id: "tonko",
    name: "TONKO",
    kicker: "Android app",
    status: "Launching",
    summary:
      "Money habits for kids, with parents in control. Jobs, three jars, savings goals and short lessons, wrapped in one Android app with a parent side behind a PIN and a calm kid side.",
    href: "/apps/tonko",
    cta: "View case study",
    image: "/images/tonko/feature.png",
    imageAlt: "TONKO feature graphic with the Tonko mascot and the line Money skills for kids",
    tone: "linear-gradient(135deg, #0f1b2d, #172a45)",
    stack: ["Kotlin", "Android", "NestJS", "PostgreSQL", "Next.js"],
    area: "apps",
  },
  {
    id: "airshare",
    name: "AirShare",
    kicker: "Web product",
    status: "Live",
    summary:
      "Instant, encrypted file delivery over QUIC. Devices find each other locally, relays step in when they are apart, and nothing turns into cloud storage.",
    href: "https://tryairshare.com",
    cta: "Visit tryairshare.com",
    image: "/images/airshare-mark.svg",
    imageAlt: "Illustration of two devices exchanging a file over a direct encrypted link",
    imageFit: "cover",
    tone: "linear-gradient(135deg, #0c1512, #101a1e)",
    stack: ["Next.js", "TypeScript", "Iroh", "QUIC"],
    area: "apps",
  },
  {
    id: "keero",
    name: "Keero Bot",
    kicker: "AI hardware platform",
    status: "Active prototype",
    summary:
      "A modular ESP32-S3 device core for voice-first, interactive hardware: audio in and out, sensing, haptics, display and camera paths, docks and module expansion.",
    href: "/hardware#keero",
    cta: "Explore the platform",
    image: "/images/keero-hero.jpg",
    imageAlt: "3D render of the Keero Bot mainboard and modules",
    imageFit: "cover",
    tone: "#ffffff",
    stack: ["ESP32-S3", "C++", "PlatformIO", "Audio DSP"],
    area: "hardware",
  },
  {
    id: "moto32",
    name: "Moto32",
    kicker: "Open-source hardware",
    status: "Open source",
    summary:
      "An ESP32-S3 motorcycle control unit with eight MOSFET-protected outputs, USB-C programming and full build docs. An open alternative to commercial M-Unit style boxes.",
    href: "https://moto32.vercel.app",
    cta: "Read the docs",
    image: "/images/moto32-board.svg",
    imageAlt: "Stylised illustration of the Moto32 control board",
    imageFit: "cover",
    tone: "linear-gradient(135deg, #0e1512, #131a16)",
    stack: ["ESP32-S3", "KiCad", "MIT licence"],
    area: "hardware",
  },
  {
    id: "canarin",
    name: "Canarin Garage",
    kicker: "Custom motorcycles",
    status: "In the shop",
    summary:
      "A 1981 Honda CX500 rebuilt as a neo-retro endurance cafe racer: CAD and ANSYS-checked monoshock chassis, GSX-R front end, custom 17-inch spoked wheels.",
    href: "/canarin-garage",
    cta: "Open the build log",
    image: "/images/garage/img-2908.jpg",
    imageAlt: "Honda CX500 cafe racer mock-up in the Canarin Garage workshop",
    tone: "#1a1a1a",
    stack: ["SolidWorks", "ANSYS", "TIG", "Motogadget"],
    area: "garage",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id)!;
export const getProjectsByArea = (area: Project["area"]) => projects.filter((p) => p.area === area);
