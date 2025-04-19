/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'blue-glow': '0 10px 20px rgba(96, 165, 250, 0.3)', // light blue
      },
    },
  },
  plugins: [],
}

