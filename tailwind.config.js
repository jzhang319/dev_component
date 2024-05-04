/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./react-app/src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        25: "6.25rem", // 1rem = 16px, so 6.25rem = 100px
        30: "7.5rem", // 1rem = 16px, so 7.5rem = 120px
        35: "8.75rem", // 1rem = 16px, so 8.75rem = 140px
        40: "10rem", // 1rem = 16px, so 10rem = 160px
        45: "11.25rem", // 1rem = 16px, so 11.25rem = 180px
        50: "12.5rem", // 1rem = 16px, so 12.5rem = 200px
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
