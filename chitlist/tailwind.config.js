/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-100': '#3C3C43',
        'dark-200': '#3C3C43',
        'primary-100': '#34d399',
        'primary-200': '#10b981',
      },
    },
  },
  plugins: [],
};
