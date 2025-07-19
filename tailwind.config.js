// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
           sans: ['Inter', 'sans-serif'], // Set Inter as the default sans-serif
        'serif': ['Playfair Display', 'serif'],
        'script': ['Dancing Script', 'cursive'],
      },
           colors: {
        'brand-accent': '#D97706', // A warm, saffron-like color (amber-600)
      },
    },
  },
  plugins: [],
}