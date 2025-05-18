/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // ensure Tailwind scans all files
    theme: {
      extend: {
        colors: {
          primary: '#4f46e5',
          'primary-dull': '#44ae7c',
        },
        fontFamily: {
          outfit: ['Outfit', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };


  