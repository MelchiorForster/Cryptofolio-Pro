/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crypto: {
          dark: "#0a0e1a",
          card: "#1a1d29",
          border: "#2a2d3a",
          accent: "#00d4aa",
          gold: "#f7931a",
          green: "#16a34a",
          red: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
