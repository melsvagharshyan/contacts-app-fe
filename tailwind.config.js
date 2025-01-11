/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-light': '#4D93E2', // Define custom light blue
        'blue-focus': '#3B82F6', // Define custom focus blue
        'gray-light': '#F3F4F6', // Define custom light gray for backgrounds
        'black-text': '#0F0F0F', // Define custom black for text
      },
      ringColor: {
        focus: '#3B82F6', // Custom focus ring color
      },
    },
  },
  plugins: [],
};
