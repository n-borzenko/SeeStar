let plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: '"Raleway", sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        primary: "#4F2570",
        secondary: "#FE9502",
      },
      lineHeight: {
        0: "0",
      },
      boxShadow: {
        bar: "0 1px 12px 1px rgba(0,0,0,0.6)",
        menu: "0 2px 4px 1px rgba(11,1,18,0.2)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(`group1-hover`, `:merge(.group1):hover &`);
      addVariant(`group1-active`, `:merge(.group1):active &`);
      addVariant(`group1-focus`, `:merge(.group1):focus &`);
      addVariant(`group2-hover`, `:merge(.group2):hover &`);
      addVariant(`group2-active`, `:merge(.group2):active &`);
      addVariant(`group2-focus`, `:merge(.group2):focus &`);
    }),
  ],
};
