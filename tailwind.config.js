/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        vollkorn: ['Vollkorn', 'serif'],
      },
      colors: {
        main: '#1b6bc6',
      },
      backgroundImage: {
        'hero-bg':
          'url("https://images.unsplash.com/photo-1605557626697-2e87166d88f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
      },
    },
  },
  plugins: [],
}
