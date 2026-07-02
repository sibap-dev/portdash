/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#00B4D8',
        secondary: '#9B59B6',
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
