/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0c0a3e',
        'secondary': '#0a3e5e',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  darkMode: 'selector',
  plugins: [require("daisyui"), require('@tailwindcss/forms'), require('flowbite/plugin')],
  daisyui: {
    themes: ["light", "dark"],
  },
}