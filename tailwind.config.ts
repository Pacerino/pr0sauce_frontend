import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#161618",
        foreground: "#f2f5f4",
        gray: {
          700: "#2d2d2d",
          800: "#1f1f1f",
          900: "#141414",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
