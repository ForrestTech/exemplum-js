/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const brandColor = colors.emerald;

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        brand: colors.emerald,
        dark: colors.slate
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
