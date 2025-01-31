/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Paths to all files that will use Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
