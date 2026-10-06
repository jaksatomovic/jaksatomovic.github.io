# jaksatomovic.github.io

Personal site of Jakša Tomović: apps (TONKO, AirShare), embedded hardware (Keero Bot, Moto32), the Canarin Garage CX500 build, and a small blog.

Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages on every push to `main`.

Bilingual: English at `/`, Croatian at `/hr/...`. Every page has a language switcher and `hreflang` alternates.

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the production site to `./dist/`   |
| `npm run preview` | Preview the production build locally     |

## Structure

```
src/
├── components/
│   ├── blog/        Post cards, category nav and listing
│   ├── layout/      Header (with theme toggle) and footer
│   └── ui/          Icon, SectionHeading, ProjectCard, PhoneFrame
├── data/
│   ├── projects.ts  The five featured projects, text per locale
│   ├── tonko.ts     TONKO case-study content per locale
│   └── blog.ts      Blog posts and categories, text per locale
├── i18n/
│   ├── index.ts     Locale helpers (getLocale, localePath, switchLocalePath)
│   └── ui.ts        All UI strings, `en` and `hr`
├── layouts/         BaseLayout (head, hreflang, backdrop, reveal animations)
├── views/           One component per page, shared by both locales
├── pages/           English routes at the root, Croatian routes under hr/
└── styles/          Design tokens and component classes
```

## Editing content

- **Add a project**: append to `src/data/projects.ts` with `en` and `hr` text. It appears on the home page and on `/apps` or `/hardware` depending on `area`.
- **Add a post**: append to `posts` in `src/data/blog.ts` with `en` and `hr` text. The newest post is featured automatically and both routes are generated.
- **Change UI copy**: edit `src/i18n/ui.ts`. The `hr` object is typed against `en`, so a missing key fails the build.
- **TONKO screens**: drop new phone crops into `public/images/tonko/` and update `tonkoScreens` in `src/data/tonko.ts`.
- **Theme**: colour tokens live in `src/styles/global.css` (`:root` and `:root.dark`). The header toggle stores the choice in `localStorage`.

## Cleave challenge links

`/cleave/c/` (and `/hr/cleave/c/`) is the page behind the links the Cleave app shares, e.g.
`https://jaksatomovic.github.io/cleave/c/#CLV1-T3-E12`. The code lives in the URL fragment, so one static page serves
every challenge. On Android it opens the app (`intent://challenge/<code>` with a Play fallback); everywhere else it
shows the code and a Play link that carries the code through install. The page is `noindex` and left out of the sitemap.
Package name and code format are in `src/data/cleave.ts` and must match the app.
