let plugin = require("tailwindcss/plugin");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    fontFamily: {
      sans: '"Raleway", "Helvetica Neue", sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        primary: withOpacityValue("--color-primary"),
        secondary: withOpacityValue("--color-secondary"),
      },
      minWidth: {
        1: "1px",
      },
      lineHeight: {
        0: "0",
      },
      boxShadow: {
        bar: "0 1px 12px 1px rgba(0,0,0,0.6)",
        card: "0 2px 4px 1px rgba(11,1,18,0.2)",
        popup: "0 2px 6px 2px rgba(11,1,18,0.2)",
        flying: "0 2px 8px 3px rgba(11,1,18,0.2)",
      },
      gridTemplateRows: {
        "20-auto": "repeat(20, auto)",
      },
      zIndex: {
        1: "1",
      },
      keyframes: {
        "slide-from-right": {
          from: { width: 0, left: "100%" },
          to: { width: "100vw", left: 0 },
        },
      },
      animation: {
        "slide-in-from-right": "slide-from-right 0.3s linear",
        "slide-out-to-right": "slide-from-right 0.3s linear reverse",
        "spin-slow": "spin 2.5s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
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
