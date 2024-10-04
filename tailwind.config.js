/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		fontFamily: {
    			'Gilroy': 'var(--Gilroy)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		animation: {
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
    		},
    		keyframes: {
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			}
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};