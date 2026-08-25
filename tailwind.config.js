/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F3ECE0',
          200: '#EAE0CE',
          300: '#DFCDB5',
        },
        forest: {
          50: '#F2F6F3',
          100: '#E1ECE5',
          700: '#2E543D',
          800: '#1D3B2A',
          900: '#13281C',
          950: '#0B1711',
        },
        earth: {
          100: '#F5F1EB',
          200: '#E8DFD3',
          300: '#D5C5B2',
          600: '#8C7765',
          800: '#54463A',
        },
        brass: {
          400: '#D9B56D',
          500: '#C5A059',
          600: '#A68340',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Roboto', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Poppins', 'Cormorant Garamond', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(19, 40, 28, 0.08)',
        'elevated': '0 20px 40px -15px rgba(19, 40, 28, 0.15)',
        'glass': '0 8px 32px 0 rgba(19, 40, 28, 0.05)',
      }
    },
  },
  plugins: [],
}
