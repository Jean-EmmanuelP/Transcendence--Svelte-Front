/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif']
		},
		extend: {
			animation: {
				tilt: 'tilt 10s infinite linear'
			},
			keyframes: {
				tilt: {
					'0% 50% 100%': {
						transform: 'rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(1deg)'
					},
					'75%': {
						transform: 'rotate(-1deg)'
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
