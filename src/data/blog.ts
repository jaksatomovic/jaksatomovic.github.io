export type BlogCategoryId = "apps" | "hardware" | "garage";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
  href: string;
  eyebrow: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  category: BlogCategoryId;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  body: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const blogCategories: BlogCategory[] = [
  {
    id: "apps",
    label: "Apps",
    href: "/blog/apps",
    eyebrow: "Product Notes",
    description: "Shipping notes, interface decisions and lessons from TONKO, AirShare and other focused products.",
  },
  {
    id: "hardware",
    label: "Hardware",
    href: "/blog/hardware",
    eyebrow: "Hardware Lab",
    description: "Moto32, Keero Bot, ESP32 systems, PCB decisions, firmware architecture, and bench notes.",
  },
  {
    id: "garage",
    label: "Garage",
    href: "/blog/garage",
    eyebrow: "Canarin Garage",
    description: "CX500 build logs, fabrication notes, parts choices, and road-and-track motorcycle work.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "building-tonko-allowance-app-for-families",
    category: "apps",
    title: "Building TONKO: A Pocket-Money App Where Parents Approve Everything",
    excerpt:
      "TONKO is an Android app for kids' first money habits. Here is why it has no bank card, why prices are hidden from children, and how one app serves a parent, a child, and a shared phone.",
    publishedAt: "2026-09-20",
    readTime: "5 min read",
    image: "/images/tonko/feature.png",
    imageAlt: "TONKO feature graphic with the Tonko mascot",
    tags: ["TONKO", "Android", "Kotlin", "Product"],
    body: [
      "Most pocket-money apps fall into two camps. One is a bank card with a cartoon on it, which means real money, real fees and a child who is handed a payment instrument before a habit. The other is a chore chart that forgets about the money entirely. TONKO is deliberately neither.",
      "It is a family record of allowance. A child earns through jobs the family agreed on, splits what they earn into three jars, and watches a savings goal get closer. A parent is beside them the whole way: nothing lands, moves or gets bought without approval.",
    ],
    sections: [
      {
        heading: "The Constraint That Shaped Everything",
        body: [
          "Early on I wrote one rule: a child never sees a price and cannot buy anything. That single constraint removed an entire class of features, and it made the remaining loops obvious. Jobs need a parent to confirm. Wishes go to a parent to consider, not into a basket. Subscriptions and packs are shown on the parent side only.",
          "It also shaped the tone. The kid side is calm and dark, built around one decision at a time. The parent side is denser and sits behind a family PIN or biometrics.",
        ],
      },
      {
        heading: "One App, Three Ways",
        body: [
          "Families do not all own the same number of phones. TONKO installs once and adapts: it can run on a parent's phone, on a child's phone connected with a code, or be handed over. In hand-off mode the app pins itself to the kid side and only a parent can bring it back.",
          "Technically that is a shell module that owns the mode, plus separate parent and kid feature modules over shared model, network, data and UI cores. The split keeps the two experiences from leaking into each other.",
        ],
      },
      {
        heading: "Teaching Waiting",
        body: [
          "The features I am proudest of are the quiet ones. The Money Time Machine shows what a small weekly amount becomes over months and years. Buy-or-wait shows two futures side by side before the money is gone. Grow plans let a parent set a family bonus on savings, a tiny interest rate inside the household.",
          "None of that needs real money to work. That is the point.",
        ],
      },
      {
        heading: "Stack",
        body: [
          "Kotlin on Android with a multi-module Gradle setup, a NestJS and Prisma backend on PostgreSQL, Google Sign-In and Play Billing, and a Next.js landing at tonko.app. Design assets are built from SVG sources through a small pipeline that renders illustrations and converts icons to VectorDrawables, so a rebrand or a new mascot outfit is a script, not a week.",
        ],
      },
    ],
  },
  {
    slug: "honda-cx500-canarin-garage-build",
    category: "garage",
    title: "Honda CX500 Canarin Garage Build",
    excerpt:
      "A 1981 Honda CX500 is being reinterpreted into a neo-retro endurance cafe racer with modern geometry, custom 17-inch spoked wheels, and a clean Motogadget control system.",
    publishedAt: "2026-05-06",
    readTime: "4 min read",
    image: "/images/garage/img-2908.jpg",
    imageAlt: "Honda CX500 engine and frame in the Canarin Garage workshop",
    tags: ["CX500", "Cafe Racer", "Endurance", "Motogadget"],
    body: [
      "The Canarin Garage CX500 project is not a restoration. The point is to keep the character of the longitudinal V-twin, then rebuild the rest of the motorcycle around a modern stance, cleaner packaging, and stronger visual intent.",
      "The target is a neo-retro machine that feels closer to an endurance-inspired custom than a period-correct Honda. The build mixes oldschool mechanical charm with sportbike suspension parts, custom wheel work, and a minimal control layout.",
    ],
    sections: [
      {
        heading: "Build Direction",
        body: [
          "The visual language is matte black, industrial metal detail, short bodywork, and a compact cockpit. It should feel brutal without becoming messy.",
          "Custom 17-inch spoked wheels are a major part of the stance. They keep the classic spoke-wheel language while supporting the more modern cafe racer proportions.",
        ],
      },
      {
        heading: "Systems Thinking",
        body: [
          "Every major change has to serve the whole bike. The GSX-R750 K7 USD front end, custom subframe, monoshock conversion, KTM Duke 390 radiator, and Motogadget ecosystem are all part of one direction.",
          "The end result should read like a factory performance reinterpretation of the CX platform, not a collection of unrelated custom parts.",
        ],
      },
    ],
  },
  {
    slug: "cx500-monoshock-conversion-and-chassis-analysis",
    category: "garage",
    title: "CX500 Monoshock Conversion And Chassis Analysis",
    excerpt:
      "The rear of the CX500 is being rebuilt with a custom subframe, YSS shock, welded reinforcement, CAD layout, and ANSYS static checks before final assembly.",
    publishedAt: "2026-05-06",
    readTime: "5 min read",
    image: "/images/garage/cx500-ansys-stress.jpg",
    imageAlt: "ANSYS equivalent stress analysis for the CX500 rear chassis conversion",
    tags: ["Monoshock", "ANSYS", "CAD", "Fabrication"],
    body: [
      "The CX500 rear chassis conversion is one of the most important parts of the build because it changes both the look and the behavior of the motorcycle.",
      "Instead of treating the tail as a simple visual hoop, the conversion is being designed as a structural system with shock placement, upper mounts, gussets, and load paths considered together.",
    ],
    sections: [
      {
        heading: "Engineering Baseline",
        body: [
          "The rear conversion was modeled in CAD and checked in ANSYS before finishing work. The documented static review shows 160 MPa peak equivalent stress, 0.199 mm total deformation, and a 1.56 minimum safety factor.",
          "Those numbers do not replace real-world validation, but they give the fabrication work a clearer starting point than guesswork alone.",
        ],
      },
      {
        heading: "Suspension Package",
        body: [
          "The rear setup is built around a YSS TCFX-MZ-366-280-TRL shock and a custom monoshock layout.",
          "Up front, Suzuki GSX-R750 K7 USD forks and a Cognito Moto triple tree with 30 mm offset push the bike toward a more aggressive, modern handling package.",
        ],
      },
    ],
  },
  {
    slug: "why-keero-bot-is-an-ai-esp32-device",
    category: "hardware",
    title: "Why Keero Bot Is An AI ESP32 Device",
    excerpt:
      "Keero Bot is a modular ESP32-S3 AI device, not just a robotics shell: audio, behavior, firmware, modules, and interaction design are treated as one product.",
    publishedAt: "2026-05-06",
    readTime: "4 min read",
    image: "/images/character.png",
    imageAlt: "Keero Bot character-style product visual",
    tags: ["Keero Bot", "ESP32-S3", "AI Device", "Firmware"],
    body: [
      "Keero Bot is best described as an AI ESP32 device because the hardware and behavior model are designed together. It is not only a board, not only a robot, and not only a voice demo.",
      "The useful part is the system: local audio paths, expressive state logic, firmware architecture, and module expansion that can keep growing without turning into a tangled prototype.",
    ],
    sections: [
      {
        heading: "Why ESP32-S3",
        body: [
          "ESP32-S3 gives the platform a practical base for embedded interaction work: enough compute for responsive device behavior, a familiar firmware ecosystem, and room for audio and peripheral expansion.",
          "That makes it a good core for a product that needs to feel alive but still be understandable on the bench.",
        ],
      },
      {
        heading: "The Product Layer",
        body: [
          "Keero Bot is shaped around repeatable modules: audio, sensing, display paths, camera support, motion ideas, docks, and future expansion.",
          "The goal is not to make a flashy one-off demo. The goal is to make a small AI hardware platform that can be iterated, documented, and actually used.",
        ],
      },
    ],
  },
  {
    slug: "moto32-hardware-platform-notes",
    category: "hardware",
    title: "Moto32 Hardware Platform Notes",
    excerpt:
      "Moto32 is the motorcycle electronics bench project: ESP32-S3 control, protected outputs, USB-C programming, and a cleaner path for custom bike wiring.",
    publishedAt: "2026-05-06",
    readTime: "3 min read",
    image: "/images/canaringarage.jpg",
    imageAlt: "Canarin Garage motorcycle visual used for Moto32 hardware notes",
    tags: ["Moto32", "ESP32-S3", "Motorcycle Electronics", "PCB"],
    body: [
      "Moto32 exists because custom motorcycle wiring should be cleaner, more understandable, and easier to service than a pile of relays hidden under the seat.",
      "The project explores an ESP32-S3-based motorcycle control unit with protected outputs, USB-C programming, and documentation that makes the hardware easier to inspect and reproduce.",
    ],
    sections: [
      {
        heading: "Design Bias",
        body: [
          "The bias is practical rather than decorative: clear inputs, protected outputs, useful status, and a wiring layout that makes sense on a real motorcycle.",
          "That matters on builds like the CX500, where electronics should disappear visually but remain easy to diagnose.",
        ],
      },
      {
        heading: "Where It Fits",
        body: [
          "Moto32 sits next to the wider garage work as a hardware learning ground. It is the motorcycle control side of the same embedded systems obsession behind Keero Bot.",
        ],
      },
    ],
  },
  {
    slug: "airshare-product-notes",
    category: "apps",
    title: "AirShare Product Notes",
    excerpt:
      "AirShare is built around fast, private file delivery: local discovery when devices are nearby, relays when they are not, and a flow that stays out of the way.",
    publishedAt: "2026-05-06",
    readTime: "3 min read",
    image: "/images/figmax.png",
    imageAlt: "Application interface visual used for AirShare product notes",
    tags: ["AirShare", "Product", "Next.js", "File Transfer"],
    body: [
      "AirShare is a focused product: move files quickly without making every transfer feel like cloud storage.",
      "The product direction is built around directness. When devices can find each other locally, the transfer should feel instant. When they cannot, the relay path should keep the workflow moving.",
    ],
    sections: [
      {
        heading: "Interface Direction",
        body: [
          "The best file transfer UI is quiet. It should make the current state obvious, keep the next action close, and avoid turning one transfer into a project.",
          "That means fewer decorative screens and more emphasis on progress, trust, and recovery when the network is not ideal.",
        ],
      },
      {
        heading: "Product Discipline",
        body: [
          "The challenge is not adding every possible sharing feature. The challenge is protecting the small loop that makes the product useful: pick, send, receive, done.",
        ],
      },
    ],
  },
];

export function sortPosts(posts: BlogPost[] = blogPosts) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const featuredPost = sortPosts()[0];

export function getCategoryById(id: BlogCategoryId) {
  return blogCategories.find((category) => category.id === id);
}

export function getPostsByCategory(category: BlogCategoryId) {
  return sortPosts(blogPosts.filter((post) => post.category === category));
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
