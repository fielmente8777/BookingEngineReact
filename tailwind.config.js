/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '/index.html','./src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A3A75',
        secondary: '#FD5C01',
        tertiary: '#E8F1FD',
      },
    },
  },
  
  plugins: [],
}

