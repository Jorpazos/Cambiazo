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
        brand: {
          dark:      "#07091a",
          navy:      "#001489",
          blue:      "#0033a0",
          lightblue: "#4169e1",
          red:       "#c8102e",
          gold:      "#FFB81C",
          gold2:     "#ffd060",
          green:     "#10b981",
          teal:      "#00b2a9",
          card:      "#0b0d22",
          border:    "#0d1e6e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(150deg, #07091a 0%, #001230 40%, #001489 75%, #0a1060 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(0,20,137,0.15) 0%, rgba(7,9,26,0.5) 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #FFB81C 0%, #ffd060 100%)",
        "wc-gradient":
          "linear-gradient(135deg, #001489 0%, #c8102e 100%)",
      },
      animation: {
        "fade-up":  "fadeUp 0.6s ease-out forwards",
        "fade-in":  "fadeIn 0.5s ease-out forwards",
        float:      "float 3s ease-in-out infinite",
        shimmer:    "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
