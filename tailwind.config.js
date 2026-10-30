/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0891B2",
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#0891B2",
          600: "#0E7490",
          700: "#155E63",
          800: "#134E4A",
          900: "#0C3B38",
        },
        accent: {
          DEFAULT: "#16A34A",
          50: "#F0FDF4",
          100: "#DCFCE7",
          400: "#4ADE80",
          500: "#16A34A",
          600: "#15803D",
        },
        ink: "#134E4A",
        muted: "#475569",
        surface: "#F0FDFA",
        line: "#CCFBF1",
      },
      fontFamily: {
        sans: ["Figtree", "Noto Sans", "Noto Sans Arabic", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(19, 78, 74, 0.10), 0 2px 8px -2px rgba(19, 78, 74, 0.06)",
        softer: "0 8px 40px -8px rgba(19, 78, 74, 0.14)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-ring": "pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        blob: "blob 18s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(22,163,74,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(22,163,74,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(22,163,74,0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-30px) scale(1.08)" },
          "66%": { transform: "translate(-15px,15px) scale(0.96)" },
        },
      },
    },
  },
  plugins: [],
};
