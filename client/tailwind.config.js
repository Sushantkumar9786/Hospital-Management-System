/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B9DCFE',
          300: '#7CBDFC',
          400: '#389AF7',
          500: '#0E7FE6',
          600: '#0263C7',
          700: '#034E9F',
          800: '#074383',
          900: '#0C396E',
          950: '#082449',
        },
        clinical: {
          teal: '#0D9488',
          cyan: '#0284C7',
          emerald: '#059669',
          amber: '#D97706',
          rose: '#E11D48',
          slate: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
