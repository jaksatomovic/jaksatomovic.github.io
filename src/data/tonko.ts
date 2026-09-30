import type { Locale } from "../i18n";

export const tonko = {
  name: "TONKO",
  website: "https://tonko.app",
  playStore: "https://play.google.com/store/apps/details?id=app.tonko",
  packageId: "app.tonko",
};

const screenImages = [
  "/images/tonko/phone-01.jpg",
  "/images/tonko/phone-02.jpg",
  "/images/tonko/phone-03.jpg",
  "/images/tonko/phone-04.jpg",
  "/images/tonko/phone-05.jpg",
  "/images/tonko/phone-06.jpg",
  "/images/tonko/phone-07.jpg",
];

const featureIcons = ["briefcase", "jar", "target", "trend", "clock", "book", "smile"] as const;

type Content = {
  screens: { title: string; caption: string }[];
  features: { title: string; body: string }[];
  safety: string[];
  modes: { title: string; body: string }[];
  stack: { label: string; value: string }[];
  roles: string[];
};

const content: Record<Locale, Content> = {
  en: {
    screens: [
      { title: "Every euro gets a job.", caption: "Spend, save, grow. The child decides, week after week." },
      { title: "Spend. Save. Grow.", caption: "New money waits until they choose where it goes." },
      { title: "Waiting pays.", caption: "The Time Machine shows what a little every week becomes." },
      { title: "Buy now, or wait?", caption: "Two futures side by side, before the money is gone." },
      { title: "Learns by doing.", caption: "Short lessons for their age, one at a time." },
      { title: "Tonko grows with them.", caption: "Stars from lessons unlock new outfits." },
      { title: "The Money Lab.", caption: "Money experiments, with no real risk." },
    ],
    features: [
      { title: "Jobs", body: "Agree what gets done and what it is worth. The child marks it done, the parent confirms, the money lands." },
      { title: "Three jars", body: "Spend for now, Save for a goal, Grow for later. Every euro gets a job before it disappears." },
      { title: "Goals and wishes", body: "Children see how close they are. A wish goes to a parent to consider, not into a basket." },
      { title: "Grow plans", body: "A parent can set a family bonus on what is saved, like a small interest rate inside the family." },
      { title: "Money Time Machine", body: "Shows how small amounts add up over months and years, so waiting has a visible payoff." },
      { title: "Money Lab", body: "Short, age-appropriate lessons, one at a time. No lectures, no busywork." },
      { title: "Tonko, the mascot", body: "A character the child dresses up with rewards they earn. Stars from lessons unlock outfits." },
    ],
    safety: [
      "No ads. Ever.",
      "No bank card, no real money, no trading. TONKO is a family record of pocket money.",
      "Children never see prices and cannot buy anything. Only a parent can.",
      "No chat, no strangers, no public profile. Everything stays inside the family.",
      "Export or delete family data at any time.",
    ],
    modes: [
      { title: "Parent phone", body: "Set up the family, jobs and allowance. Approve work, review wishes, manage grow plans." },
      { title: "Child phone", body: "A simple, calm kid side. Connects to a parent with a code and never shows prices." },
      { title: "Hand-off", body: "One phone, two people. The parent hands it over, the app pins to kid mode and only a PIN or biometrics bring it back." },
    ],
    stack: [
      { label: "Android app", value: "Kotlin, multi-module Gradle, min SDK 26" },
      { label: "Architecture", value: "Shell, parent and kid feature modules over shared model, network, data and UI cores" },
      { label: "Backend", value: "NestJS 11, Prisma 6, PostgreSQL on Neon" },
      { label: "Auth and billing", value: "Google Sign-In, Play Billing 8, family subscription and in-app packs" },
      { label: "Landing", value: "Next.js 16, React 19, TypeScript" },
      { label: "Design", value: "Custom mascot, 15 kid avatars, illustration and icon pipeline from SVG to VectorDrawable" },
    ],
    roles: ["Product", "UX and visual design", "Android engineering", "Backend and API", "Brand and store assets"],
  },
  hr: {
    screens: [
      { title: "Svaki euro dobije posao.", caption: "Troši, štedi, rasti. Dijete odlučuje, tjedan za tjednom." },
      { title: "Troši. Štedi. Rasti.", caption: "Novi novac čeka dok dijete ne odluči kamo ide." },
      { title: "Čekanje se isplati.", caption: "Vremeplov pokazuje što malo svaki tjedan postane." },
      { title: "Kupi sad ili pričekaj?", caption: "Dvije budućnosti jedna uz drugu, prije nego novca nestane." },
      { title: "Uči radeći.", caption: "Kratke lekcije za njegovu dob, jedna po jedna." },
      { title: "Tonko raste s njima.", caption: "Zvjezdice iz lekcija otključavaju novu odjeću." },
      { title: "Novčani lab.", caption: "Eksperimenti s novcem, bez pravog rizika." },
    ],
    features: [
      { title: "Zadaci", body: "Dogovorite što se radi i koliko vrijedi. Dijete javi da je gotovo, roditelj potvrdi, novac sjedne." },
      { title: "Tri staklenke", body: "Troši za sad, Štedi za cilj, Rasti za kasnije. Svaki euro dobije posao prije nego nestane." },
      { title: "Ciljevi i želje", body: "Dijete vidi koliko je blizu. Želja ide roditelju na razmatranje, ne u košaricu." },
      { title: "Planovi rasta", body: "Roditelj može odrediti obiteljski bonus na ušteđeno, kao mala kamata unutar obitelji." },
      { title: "Vremeplov novca", body: "Pokazuje kako mali iznosi rastu kroz mjesece i godine, pa čekanje ima vidljivu nagradu." },
      { title: "Novčani lab", body: "Kratke lekcije primjerene dobi, jedna po jedna. Bez predavanja, bez natrpavanja." },
      { title: "Tonko, maskota", body: "Lik kojeg dijete oblači nagradama koje zaradi. Zvjezdice iz lekcija otključavaju odjeću." },
    ],
    safety: [
      "Bez reklama. Nikad.",
      "Bez bankovne kartice, bez pravog novca, bez trgovanja. TONKO je obiteljska evidencija džeparca.",
      "Djeca ne vide cijene i ne mogu ništa kupiti. Kupnju radi isključivo roditelj.",
      "Nema chata, nema stranaca, nema javnog profila. Sve ostaje unutar obitelji.",
      "Podatke obitelji možeš izvesti ili obrisati u svakom trenutku.",
    ],
    modes: [
      { title: "Roditeljev mobitel", body: "Postavi obitelj, zadatke i džeparac. Odobravaj posao, pregledavaj želje, upravljaj planovima rasta." },
      { title: "Dječji mobitel", body: "Jednostavan, miran dječji dio. Povezuje se s roditeljem kodom i nikad ne prikazuje cijene." },
      { title: "Predaja", body: "Jedan mobitel, dvoje ljudi. Roditelj ga preda, aplikacija se zaključa u dječji način, a natrag je vraća samo PIN ili biometrija." },
    ],
    stack: [
      { label: "Android aplikacija", value: "Kotlin, višemodularni Gradle, min SDK 26" },
      { label: "Arhitektura", value: "Shell, roditeljski i dječji feature moduli nad zajedničkim model, network, data i UI jezgrama" },
      { label: "Backend", value: "NestJS 11, Prisma 6, PostgreSQL na Neonu" },
      { label: "Prijava i naplata", value: "Google prijava, Play Billing 8, obiteljska pretplata i paketi u aplikaciji" },
      { label: "Landing", value: "Next.js 16, React 19, TypeScript" },
      { label: "Dizajn", value: "Vlastita maskota, 15 dječjih avatara, pipeline ilustracija i ikona iz SVG-a u VectorDrawable" },
    ],
    roles: ["Proizvod", "UX i vizualni dizajn", "Android razvoj", "Backend i API", "Brend i store materijali"],
  },
};

export function getTonko(locale: Locale) {
  const c = content[locale];
  return {
    ...tonko,
    screens: c.screens.map((s, i) => ({ ...s, src: screenImages[i] })),
    features: c.features.map((f, i) => ({ ...f, icon: featureIcons[i] })),
    safety: c.safety,
    modes: c.modes,
    stack: c.stack,
    roles: c.roles,
  };
}
