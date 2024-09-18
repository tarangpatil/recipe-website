import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-peach": "#ffddd5",
        "custom-peach-dark": "#733729",
      },
      fontFamily: {
        "dancing-script": [
          "__Dancing_Script_c729f9",
          "__Dancing_Script_Fallback_c729f9",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
