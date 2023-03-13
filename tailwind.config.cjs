/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#9333ea",
        lightOrange: "#FFF1D6",
      },
    },
  },
  plugins: [require('daisyui')],
};
