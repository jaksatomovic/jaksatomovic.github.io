export const tonko = {
  name: "TONKO",
  tagline: "Money habits for kids, with parents in control.",
  shortDescription: "Allowance, chores and saving for families. No ads. Parents approve everything.",
  website: "https://tonko.app",
  playStore: "https://play.google.com/store/apps/details?id=app.tonko",
  packageId: "app.tonko",
  audience: "Families with children roughly 5 to 14",
  languages: ["English", "Croatian"],
};

export const tonkoScreens = [
  {
    src: "/images/tonko/phone-01.jpg",
    title: "Every euro gets a job.",
    caption: "Spend, save, grow. The child decides, week after week.",
  },
  {
    src: "/images/tonko/phone-02.jpg",
    title: "Spend. Save. Grow.",
    caption: "New money waits until they choose where it goes.",
  },
  {
    src: "/images/tonko/phone-03.jpg",
    title: "Waiting pays.",
    caption: "The Time Machine shows what a little every week becomes.",
  },
  {
    src: "/images/tonko/phone-04.jpg",
    title: "Buy now, or wait?",
    caption: "Two futures side by side, before the money is gone.",
  },
  {
    src: "/images/tonko/phone-05.jpg",
    title: "Learns by doing.",
    caption: "Short lessons for their age, one at a time.",
  },
  {
    src: "/images/tonko/phone-06.jpg",
    title: "Tonko grows with them.",
    caption: "Stars from lessons unlock new outfits.",
  },
  {
    src: "/images/tonko/phone-07.jpg",
    title: "The Money Lab.",
    caption: "Money experiments, with no real risk.",
  },
];

export const tonkoFeatures = [
  {
    icon: "briefcase",
    title: "Jobs",
    body: "Agree what gets done and what it is worth. The child marks it done, the parent confirms, the money lands.",
  },
  {
    icon: "jar",
    title: "Three jars",
    body: "Spend for now, Save for a goal, Grow for later. Every euro gets a job before it disappears.",
  },
  {
    icon: "target",
    title: "Goals and wishes",
    body: "Children see how close they are. A wish goes to a parent to consider, not into a basket.",
  },
  {
    icon: "trend",
    title: "Grow plans",
    body: "A parent can set a family bonus on what is saved, like a small interest rate inside the family.",
  },
  {
    icon: "clock",
    title: "Money Time Machine",
    body: "Shows how small amounts add up over months and years, so waiting has a visible payoff.",
  },
  {
    icon: "book",
    title: "Money Lab",
    body: "Short, age-appropriate lessons, one at a time. No lectures, no busywork.",
  },
  {
    icon: "smile",
    title: "Tonko, the mascot",
    body: "A character the child dresses up with rewards they earn. Stars from lessons unlock outfits.",
  },
] as const;

export const tonkoSafety = [
  "No ads. Ever.",
  "No bank card, no real money, no trading. TONKO is a family record of pocket money.",
  "Children never see prices and cannot buy anything. Only a parent can.",
  "No chat, no strangers, no public profile. Everything stays inside the family.",
  "Export or delete family data at any time.",
];

export const tonkoModes = [
  {
    title: "Parent phone",
    body: "Set up the family, jobs and allowance. Approve work, review wishes, manage grow plans.",
  },
  {
    title: "Child phone",
    body: "A simple, calm kid side. Connects to a parent with a code and never shows prices.",
  },
  {
    title: "Hand-off",
    body: "One phone, two people. The parent hands it over, the app pins to kid mode and only a PIN or biometrics bring it back.",
  },
];

export const tonkoStack = [
  { label: "Android app", value: "Kotlin, multi-module Gradle, min SDK 26" },
  { label: "Architecture", value: "Shell, parent and kid feature modules over shared model, network, data and UI cores" },
  { label: "Backend", value: "NestJS 11, Prisma 6, PostgreSQL on Neon" },
  { label: "Auth and billing", value: "Google Sign-In, Play Billing 8, family subscription and in-app packs" },
  { label: "Landing", value: "Next.js 16, React 19, TypeScript" },
  { label: "Design", value: "Custom mascot, 15 kid avatars, illustration and icon pipeline from SVG to VectorDrawable" },
];

export const tonkoRoles = ["Product", "UX and visual design", "Android engineering", "Backend and API", "Brand and store assets"];
