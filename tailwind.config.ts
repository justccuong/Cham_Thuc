import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "paper-ivory": "#F8F5F0",
        "paper-warm": "#EFE9DE",
        "brand-red": {
          DEFAULT: "#9A1B1F",
          hover: "#7A1518",
        },
        "heritage-red": {
          DEFAULT: "#9A1B1F",
          hover: "#7A1518",
        },
        "brand-gold": "#F4E8C1",
        "bamboo-green": "#285834",
        "clay-terracotta": "#DC866B",
        "text-wood": "#3A2618",
        "wood-brown": "#3A2618",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
