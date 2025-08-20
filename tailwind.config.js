/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky': {
          'light': '#e0f2fe',      /* Light blue */
          'medium': '#7dd3fc',     /* Medium blue */
          'dark': '#0369a1',       /* Dark blue */
        },
        'cloud': {
          'white': '#f8fafc',      /* Cloud white */
        },
        'text': {
          'primary': '#1e293b',    /* Dark text */
          'secondary': '#64748b',  /* Secondary text */
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}

