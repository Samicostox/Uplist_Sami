module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        hkgrotesk: ["var(--font-hkgrotesk)", "sans-serif"],
        "permanent-marker": ["var(--font-permanent-marker)", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
