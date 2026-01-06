/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#F0A8D0",
        "primary-darker": "#D086B0",
        "background-light": "#FAFAFA",
        "background-dark": "#121212",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "text-light": "#333333",
        "text-dark": "#E5E5E5",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
      },
      fontFamily: {
        display: ["Sarabun", "sans-serif"],
        body: ["Sarabun", "sans-serif"],
        sans: ["Sarabun", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

