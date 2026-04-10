import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    /** Journal glass tokens (`JOURNAL_GLASS_*`) live here — must be scanned or utilities are purged */
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "ui-serif", "serif"],
      },
      colors: {
        bvm: {
          title: "#2B6A9E",
          pageTop: "#E8EEF6",
          pageBottom: "#E4ECF5",
          tableHeader: "#C8D9EB",
          textareaFill: "#D4E4F2",
          textareaBorder: "#B8CCE0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
