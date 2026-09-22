/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Cabinet Grotesk', 'Impact', 'Arial Black', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      colors: {
        yellow: {
          DEFAULT: '#ffe17c',
          400: '#ffe17c',
        },
        charcoal: {
          DEFAULT: '#171e19',
        },
        sage: {
          DEFAULT: '#b7c6c2',
        },
        darkgray: {
          DEFAULT: '#272727',
        },
        primary: {
          50: '#fffdf0',
          100: '#fff9d6',
          200: '#fff3ad',
          300: '#ffeb7a',
          400: '#ffe17c',
          500: '#ffd84d',
          600: '#f5c518',
          700: '#d4a300',
          800: '#a37b00',
          900: '#6b5000',
        },
        risk: {
          critical: '#dc2626',
          high: '#ea580c',
          medium: '#ca8a04',
          low: '#16a34a',
        }
      }
    },
  },
  plugins: [],
}