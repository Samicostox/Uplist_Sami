module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js" // Adjust according to your project file structure
  ],
  theme: {
    extend: {
      wordBreak: ['break-all'],
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        hkgrotesk: ["var(--font-hkgrotesk)", "sans-serif"],
        "permanent-marker": ["var(--font-permanent-marker)", "cursive"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('flowbite/plugin')
  ],
};
