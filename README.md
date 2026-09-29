# jaksatomovic.github.io

Personal site of Jakša Tomović: apps (TONKO, AirShare), embedded hardware (Keero Bot, Moto32), the Canarin Garage CX500 build, and a small blog.

Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages on every push to `main`.

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
│   ├── projects.ts  The five featured projects shown on the home page
│   ├── tonko.ts     TONKO case-study content (screens, features, stack)
│   └── blog.ts      Blog posts and categories
├── layouts/         BaseLayout (head, backdrop, reveal animations)
├── pages/           Routes: /, /apps, /apps/tonko, /hardware, /canarin-garage, /blog/*
└── styles/          Design tokens and component classes
```

## Editing content

- **Add a project**: append to `src/data/projects.ts`. It appears on the home page and on `/apps` or `/hardware` depending on `area`.
- **Add a post**: append to `blogPosts` in `src/data/blog.ts`. The newest post is featured automatically.
- **TONKO screens**: drop new phone crops into `public/images/tonko/` and update `tonkoScreens` in `src/data/tonko.ts`.
- **Theme**: colour tokens live in `src/styles/global.css` (`:root` and `:root.dark`). The header toggle stores the choice in `localStorage`.
