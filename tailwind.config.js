module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", // Adjust according to your project file structure
  ],
  theme: {
    extend: {
      wordBreak: ["break-all"],
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        hkgrotesk: ["var(--font-hkgrotesk)", "sans-serif"],
        "permanent-marker": ["var(--font-permanent-marker)", "cursive"],
      },
      gridTemplateColumns: {
        "profile-layout": "1fr 1fr", // Custom layout for profile components
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("flowbite/plugin")],
};
