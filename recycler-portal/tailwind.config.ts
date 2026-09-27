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
        'lux-bg': '#F9F8F6',
        'lux-fg': '#1A1A1A',
        'lux-muted': '#EBE5DE',
        'lux-muted-fg': '#6C6863',
        'lux-gold': '#D4AF37',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },

    },
  },
  plugins: [],
};
export default config;
