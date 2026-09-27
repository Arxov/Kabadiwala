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
        'md-primary': '#6750A4',
        'md-on-primary': '#FFFFFF',
        'md-secondary-container': '#E8DEF8',
        'md-on-secondary-container': '#1D192B',
        'md-tertiary': '#7D5260',
        'md-background': '#FFFBFE',
        'md-on-background': '#1C1B1F',
        'md-surface': '#FFFBFE',
        'md-surface-container': '#F3EDF7',
        'md-surface-container-low': '#E7E0EC',
        'md-outline': '#79747E',
        'md-on-surface-variant': '#49454F',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
