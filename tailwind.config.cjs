/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      opacity: {
        15: "0.15",
      },
      colors: {
        bg: withAlpha("--c-bg"),
        surface: withAlpha("--c-surface"),
        raised: withAlpha("--c-raised"),
        ink: withAlpha("--c-ink"),
        muted: withAlpha("--c-muted"),
        line: withAlpha("--c-line"),
        accent: withAlpha("--c-accent"),
        tonko: {
          navy: "#0f1b2d",
          sky: "#3cc6e2",
          blue: "#2f7cf6",
          teal: "#1fb59a",
          gold: "#f5b342",
        },
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.2vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(var(--c-ink) / 0.04), 0 12px 40px -18px rgb(var(--c-ink) / 0.25)",
        lift: "0 1px 0 0 rgb(var(--c-ink) / 0.05), 0 30px 60px -24px rgb(var(--c-ink) / 0.35)",
        phone: "0 40px 80px -30px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.06) inset",
      },
      maxWidth: {
        site: "76rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
