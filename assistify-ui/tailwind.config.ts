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
        primary: "#007acc",
        secondary: "#1e1e1e",
        background: {
          default: "#252526",
          paper: "#1e1e1e",
        },
        text: {
          primary: "#d4d4d4",
          secondary: "#808080",
        },
        button: {
          primary: "#007acc",
          "primary-hover": "#005a9e",
          "focus-ring": "#007acc",
        },
      },
    },
  },
  plugins: [],
};
export default config;
