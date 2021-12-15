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
        bar: "0px 1px 12px 1px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
