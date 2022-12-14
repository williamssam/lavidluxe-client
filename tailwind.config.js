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
		},
	},
	plugins: [],
}
