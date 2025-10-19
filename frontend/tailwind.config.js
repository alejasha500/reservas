/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
        fontFamily: {
        display: ['"Playfair Display"', 'serif'], 
        body: ['Lato', 'sans-serif'], 
      },
    },
  },
  plugins: [],
   future: {
    hoverOnlyWhenSupported: true,
  },
}

