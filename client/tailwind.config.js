/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      scrollbar: ['rounded'],
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        },
      },
      animation: {
        rotate: 'rotate 0.3s ease-in-out forwards', 
      },
    },
  },
  plugins: [ 
    require('tailwind-scrollbar-hide'),
  ],
}
