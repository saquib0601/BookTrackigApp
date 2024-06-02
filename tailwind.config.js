/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'sky-100': '#0a0a0a', // Define a custom color for gray-800
        },
      },
    },
    plugins: [],
  };