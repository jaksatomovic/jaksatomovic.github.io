import type { Locale } from "../i18n";
import { formatDate } from "../i18n";

export type BlogCategoryId = "apps" | "hardware" | "garage";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
  href: string;
  eyebrow: string;
  description: string;
};

export type BlogSection = { heading: string; body: string[] };

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
  sections: BlogSection[];
};

type PostText = Pick<BlogPost, "title" | "excerpt" | "readTime" | "imageAlt" | "body" | "sections">;
type PostBase = Omit<BlogPost, keyof PostText> & { text: Record<Locale, PostText> };

const categoryText: Record<Locale, Record<BlogCategoryId, Omit<BlogCategory, "id" | "href">>> = {
  en: {
    apps: { label: "Apps", eyebrow: "Product notes", description: "Shipping notes, interface decisions and lessons from TONKO, AirShare and other focused products." },
    hardware: { label: "Hardware", eyebrow: "Bench notes", description: "Moto32, Keero Bot, ESP32 systems, PCB decisions, firmware architecture and bench notes." },
    garage: { label: "Garage", eyebrow: "Build log", description: "CX500 build logs, fabrication notes, parts choices and road-and-track motorcycle work." },
  },
  hr: {
    apps: { label: "Aplikacije", eyebrow: "Zapisi o aplikacijama", description: "Bilješke o objavama, odlukama o sučelju i lekcijama iz TONKA, AirSharea i drugih proizvoda." },
    hardware: { label: "Hardver", eyebrow: "Zapisi s klupe", description: "Moto32, Keero Bot, ESP32 sustavi, PCB odluke, arhitektura firmwarea i bilješke s klupe." },
    garage: { label: "Garaža", eyebrow: "Dnevnik gradnje", description: "Dnevnik gradnje CX500, bilješke o izradi, izbor dijelova i rad na motociklu za cestu i stazu." },
  },
};

export function getCategories(locale: Locale): BlogCategory[] {
  return (["apps", "hardware", "garage"] as BlogCategoryId[]).map((id) => ({
    id,
    href: `/blog/${id}`,
    ...categoryText[locale][id],
  }));
}

export function getCategoryById(id: BlogCategoryId, locale: Locale) {
  return getCategories(locale).find((c) => c.id === id);
}

const posts: PostBase[] = [
  {
    slug: "building-tonko-allowance-app-for-families",
    category: "apps",
    publishedAt: "2026-09-20",
    image: "/images/tonko/feature.png",
    tags: ["TONKO", "Android", "Kotlin", "Product"],
    text: {
      en: {
        title: "Building TONKO: A Pocket-Money App Where Parents Approve Everything",
        excerpt:
          "TONKO is an Android app for kids' first money habits. Here is why it has no bank card, why prices are hidden from children, and how one app serves a parent, a child, and a shared phone.",
        readTime: "5 min read",
        imageAlt: "TONKO feature graphic with the Tonko mascot",
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
      hr: {
        title: "Kako je nastao TONKO: aplikacija za džeparac u kojoj roditelj sve odobrava",
        excerpt:
          "TONKO je Android aplikacija za prve dječje navike s novcem. Evo zašto nema bankovnu karticu, zašto djeca ne vide cijene i kako jedna aplikacija služi roditelju, djetetu i zajedničkom mobitelu.",
        readTime: "5 min čitanja",
        imageAlt: "TONKO grafika s maskotom Tonkom",
        body: [
          "Većina aplikacija za džeparac spada u dva tabora. Jedan je bankovna kartica s crtićem, što znači pravi novac, prave naknade i dijete koje dobije platežno sredstvo prije navike. Drugi je popis zadataka koji potpuno zaboravi na novac. TONKO namjerno nije ni jedno ni drugo.",
          "To je obiteljska evidencija džeparca. Dijete zarađuje kroz zadatke koje je obitelj dogovorila, raspoređuje zarađeno u tri staklenke i gleda kako se cilj štednje približava. Roditelj je uz njega cijelim putem: ništa ne sjeda, ne miče se i ne kupuje bez odobrenja.",
        ],
        sections: [
          {
            heading: "Ograničenje koje je oblikovalo sve",
            body: [
              "Na samom početku napisao sam jedno pravilo: dijete nikad ne vidi cijenu i ne može ništa kupiti. To jedno ograničenje uklonilo je cijelu klasu značajki, a preostale petlje učinilo očitima. Zadatke mora potvrditi roditelj. Želje idu roditelju na razmatranje, ne u košaricu. Pretplate i paketi prikazuju se samo na roditeljskoj strani.",
              "Oblikovalo je i ton. Dječja strana je mirna i tamna, građena oko jedne odluke odjednom. Roditeljska strana je gušća i stoji iza obiteljskog PIN-a ili biometrije.",
            ],
          },
          {
            heading: "Jedna aplikacija, tri načina",
            body: [
              "Nemaju sve obitelji isti broj mobitela. TONKO se instalira jednom i prilagodi: može raditi na roditeljevom mobitelu, na dječjem povezanom kodom, ili se preda djetetu. U načinu predaje aplikacija se zaključa na dječju stranu i samo je roditelj može vratiti.",
              "Tehnički je to shell modul koji upravlja načinom rada, plus odvojeni roditeljski i dječji feature moduli nad zajedničkim model, network, data i UI jezgrama. Ta podjela sprječava da dva iskustva cure jedno u drugo.",
            ],
          },
          {
            heading: "Učenje čekanja",
            body: [
              "Značajke na koje sam najponosniji su one tihe. Vremeplov novca pokazuje što mali tjedni iznos postane kroz mjesece i godine. Kupi-ili-pričekaj pokazuje dvije budućnosti jednu uz drugu prije nego novca nestane. Planovi rasta omogućuju roditelju da odredi obiteljski bonus na štednju, sićušnu kamatu unutar kućanstva.",
              "Ništa od toga ne treba pravi novac da bi radilo. U tome je poanta.",
            ],
          },
          {
            heading: "Tehnologija",
            body: [
              "Kotlin na Androidu s višemodularnim Gradle setupom, NestJS i Prisma backend na PostgreSQL-u, Google prijava i Play Billing te Next.js landing na tonko.app. Dizajnerski materijali grade se iz SVG izvora kroz mali pipeline koji renderira ilustracije i pretvara ikone u VectorDrawable, pa je rebrand ili nova odjeća za maskotu skripta, a ne tjedan posla.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "honda-cx500-canarin-garage-build",
    category: "garage",
    publishedAt: "2026-05-06",
    image: "/images/garage/img-2908.jpg",
    tags: ["CX500", "Cafe Racer", "Endurance", "Motogadget"],
    text: {
      en: {
        title: "Honda CX500 Canarin Garage Build",
        excerpt:
          "A 1981 Honda CX500 is being reinterpreted into a neo-retro endurance cafe racer with modern geometry, custom 17-inch spoked wheels, and a clean Motogadget control system.",
        readTime: "4 min read",
        imageAlt: "Honda CX500 engine and frame in the Canarin Garage workshop",
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
      hr: {
        title: "Honda CX500: gradnja u Canarin Garage",
        excerpt:
          "Honda CX500 iz 1981. pretvara se u neo-retro endurance cafe racer s modernom geometrijom, custom 17-inčnim žbičanim kotačima i čistim Motogadget upravljačkim sustavom.",
        readTime: "4 min čitanja",
        imageAlt: "Motor i okvir Honde CX500 u radionici Canarin Garage",
        body: [
          "CX500 projekt u Canarin Garage nije restauracija. Poanta je zadržati karakter uzdužnog V-twina, a ostatak motocikla izgraditi oko modernog stava, čišćeg pakiranja i jače vizualne namjere.",
          "Cilj je neo-retro stroj koji je bliži endurance customu nego periodno točnoj Hondi. Gradnja miješa oldschool mehanički šarm sa sportskim ovjesom, custom kotačima i minimalnim rasporedom komandi.",
        ],
        sections: [
          {
            heading: "Smjer gradnje",
            body: [
              "Vizualni jezik je mat crna, industrijski metalni detalji, kratka karoserija i kompaktan kokpit. Treba djelovati brutalno, a ne neuredno.",
              "Custom 17-inčni žbičani kotači veliki su dio stava. Zadržavaju klasični jezik žbica, a podržavaju modernije cafe racer proporcije.",
            ],
          },
          {
            heading: "Razmišljanje u sustavima",
            body: [
              "Svaka veća promjena mora služiti cijelom motociklu. GSX-R750 K7 USD prednji kraj, custom podokvir, monoshock konverzija, KTM Duke 390 hladnjak i Motogadget ekosustav dio su jednog smjera.",
              "Krajnji rezultat treba se čitati kao tvornička performance reinterpretacija CX platforme, a ne kao zbirka nepovezanih custom dijelova.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "cx500-monoshock-conversion-and-chassis-analysis",
    category: "garage",
    publishedAt: "2026-05-06",
    image: "/images/garage/cx500-ansys-stress.jpg",
    tags: ["Monoshock", "ANSYS", "CAD", "Fabrication"],
    text: {
      en: {
        title: "CX500 Monoshock Conversion And Chassis Analysis",
        excerpt:
          "The rear of the CX500 is being rebuilt with a custom subframe, YSS shock, welded reinforcement, CAD layout, and ANSYS static checks before final assembly.",
        readTime: "5 min read",
        imageAlt: "ANSYS equivalent stress analysis for the CX500 rear chassis conversion",
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
      hr: {
        title: "CX500 monoshock konverzija i analiza šasije",
        excerpt:
          "Stražnji dio CX500 gradi se iznova s custom podokvirom, YSS amortizerom, zavarenim ojačanjima, CAD rasporedom i ANSYS statičkim provjerama prije završne montaže.",
        readTime: "5 min čitanja",
        imageAlt: "ANSYS analiza ekvivalentnog naprezanja za stražnju konverziju šasije CX500",
        body: [
          "Konverzija stražnje šasije CX500 jedan je od najvažnijih dijelova gradnje jer mijenja i izgled i ponašanje motocikla.",
          "Umjesto da se rep tretira kao jednostavan vizualni obruč, konverzija se projektira kao strukturni sustav u kojem se položaj amortizera, gornji nosači, ojačanja i putevi opterećenja razmatraju zajedno.",
        ],
        sections: [
          {
            heading: "Inženjerska polazna točka",
            body: [
              "Stražnja konverzija modelirana je u CAD-u i provjerena u ANSYS-u prije završnih radova. Dokumentirana statička analiza pokazuje 160 MPa vršnog ekvivalentnog naprezanja, 0,199 mm ukupne deformacije i minimalni faktor sigurnosti 1,56.",
              "Te brojke ne zamjenjuju provjeru u stvarnim uvjetima, ali daju izradi jasniju polaznu točku od pukog nagađanja.",
            ],
          },
          {
            heading: "Paket ovjesa",
            body: [
              "Stražnji setup građen je oko YSS TCFX-MZ-366-280-TRL amortizera i custom monoshock rasporeda.",
              "Sprijeda, Suzuki GSX-R750 K7 USD vilice i Cognito Moto triple tree s 30 mm offseta guraju motocikl prema agresivnijem, modernijem paketu upravljanja.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "why-keero-bot-is-an-ai-esp32-device",
    category: "hardware",
    publishedAt: "2026-05-06",
    image: "/images/character.png",
    tags: ["Keero Bot", "ESP32-S3", "AI Device", "Firmware"],
    text: {
      en: {
        title: "Why Keero Bot Is An AI ESP32 Device",
        excerpt:
          "Keero Bot is a modular ESP32-S3 AI device, not just a robotics shell: audio, behavior, firmware, modules, and interaction design are treated as one product.",
        readTime: "4 min read",
        imageAlt: "Keero Bot character-style product visual",
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
      hr: {
        title: "Zašto je Keero Bot AI ESP32 uređaj",
        excerpt:
          "Keero Bot je modularni ESP32-S3 AI uređaj, ne samo robotska ljuska: audio, ponašanje, firmware, moduli i dizajn interakcije tretiraju se kao jedan proizvod.",
        readTime: "4 min čitanja",
        imageAlt: "Vizual Keero Bota u stilu lika",
        body: [
          "Keero Bot najbolje je opisati kao AI ESP32 uređaj jer se hardver i model ponašanja projektiraju zajedno. Nije samo pločica, nije samo robot i nije samo glasovni demo.",
          "Koristan dio je sustav: lokalni audio putevi, izražajna logika stanja, arhitektura firmwarea i moduli koji mogu rasti bez da se pretvore u zapetljani prototip.",
        ],
        sections: [
          {
            heading: "Zašto ESP32-S3",
            body: [
              "ESP32-S3 daje platformi praktičnu bazu za ugradbenu interakciju: dovoljno računalne snage za responzivno ponašanje uređaja, poznat firmware ekosustav i prostor za audio i periferije.",
              "To ga čini dobrom jezgrom za proizvod koji treba djelovati živo, a ostati razumljiv na klupi.",
            ],
          },
          {
            heading: "Sloj proizvoda",
            body: [
              "Keero Bot oblikovan je oko ponovljivih modula: audio, senzori, display, podrška za kameru, ideje za pokret, dockovi i buduća proširenja.",
              "Cilj nije napraviti blještavi jednokratni demo. Cilj je napraviti malu AI hardversku platformu koja se može iterirati, dokumentirati i stvarno koristiti.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "moto32-hardware-platform-notes",
    category: "hardware",
    publishedAt: "2026-05-06",
    image: "/images/moto32-board.svg",
    tags: ["Moto32", "ESP32-S3", "Motorcycle Electronics", "PCB"],
    text: {
      en: {
        title: "Moto32 Hardware Platform Notes",
        excerpt:
          "Moto32 is the motorcycle electronics bench project: ESP32-S3 control, protected outputs, USB-C programming, and a cleaner path for custom bike wiring.",
        readTime: "3 min read",
        imageAlt: "Stylised illustration of the Moto32 control board",
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
      hr: {
        title: "Bilješke o Moto32 hardverskoj platformi",
        excerpt:
          "Moto32 je projekt elektronike za motocikle: ESP32-S3 upravljanje, zaštićeni izlazi, USB-C programiranje i čišći put za custom instalaciju na motociklu.",
        readTime: "3 min čitanja",
        imageAlt: "Stilizirana ilustracija Moto32 upravljačke pločice",
        body: [
          "Moto32 postoji jer custom instalacija na motociklu treba biti čišća, razumljivija i lakša za servis od hrpe releja skrivenih ispod sjedala.",
          "Projekt istražuje upravljačku jedinicu za motocikle na bazi ESP32-S3 sa zaštićenim izlazima, USB-C programiranjem i dokumentacijom koja hardver čini lakšim za pregled i reprodukciju.",
        ],
        sections: [
          {
            heading: "Praktičan, ne dekorativan",
            body: [
              "Naglasak je praktičan, a ne dekorativan: jasni ulazi, zaštićeni izlazi, koristan status i raspored instalacije koji ima smisla na pravom motociklu.",
              "To je bitno na gradnjama poput CX500, gdje elektronika treba vizualno nestati, a ostati laka za dijagnostiku.",
            ],
          },
          {
            heading: "Gdje pripada",
            body: [
              "Moto32 stoji uz širi rad u garaži kao poligon za učenje hardvera. To je motociklistička upravljačka strana iste opsjednutosti ugradbenim sustavima koja stoji iza Keero Bota.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "airshare-product-notes",
    category: "apps",
    publishedAt: "2026-05-06",
    image: "/images/airshare-mark.svg",
    tags: ["AirShare", "Product", "Next.js", "File Transfer"],
    text: {
      en: {
        title: "AirShare Product Notes",
        excerpt:
          "AirShare is built around fast, private file delivery: local discovery when devices are nearby, relays when they are not, and a flow that stays out of the way.",
        readTime: "3 min read",
        imageAlt: "Illustration of two devices exchanging a file over a direct encrypted link",
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
      hr: {
        title: "Bilješke o AirShare proizvodu",
        excerpt:
          "AirShare je građen oko brzog, privatnog prijenosa datoteka: lokalno otkrivanje kad su uređaji blizu, releji kad nisu, i tok koji se ne miješa u posao.",
        readTime: "3 min čitanja",
        imageAlt: "Ilustracija dva uređaja koja razmjenjuju datoteku preko izravne šifrirane veze",
        body: [
          "AirShare je fokusiran proizvod: brzo premjesti datoteke bez da se svaki prijenos pretvori u cloud pohranu.",
          "Smjer proizvoda građen je oko izravnosti. Kad se uređaji mogu pronaći lokalno, prijenos treba djelovati trenutno. Kad ne mogu, relejni put treba održati tok posla.",
        ],
        sections: [
          {
            heading: "Smjer sučelja",
            body: [
              "Najbolje sučelje za prijenos datoteka je tiho. Treba jasno pokazati trenutno stanje, držati sljedeću radnju blizu i ne pretvarati jedan prijenos u projekt.",
              "To znači manje dekorativnih ekrana i više naglaska na napredak, povjerenje i oporavak kad mreža nije idealna.",
            ],
          },
          {
            heading: "Disciplina proizvoda",
            body: [
              "Izazov nije dodati svaku moguću značajku dijeljenja. Izazov je zaštititi malu petlju koja proizvod čini korisnim: odaberi, pošalji, primi, gotovo.",
            ],
          },
        ],
      },
    },
  },
];

export const postSlugs = posts.map((p) => p.slug);

export function getPosts(locale: Locale): BlogPost[] {
  return posts
    .map(({ text, ...rest }) => ({ ...rest, ...text[locale] }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedPost(locale: Locale) {
  return getPosts(locale)[0];
}

export function getPostsByCategory(category: BlogCategoryId, locale: Locale) {
  return getPosts(locale).filter((post) => post.category === category);
}

export function getPostBySlug(slug: string, locale: Locale) {
  return getPosts(locale).find((post) => post.slug === slug);
}

export function formatPostDate(date: string, locale: Locale) {
  return formatDate(date, locale);
}
