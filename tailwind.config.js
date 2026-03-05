/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4c6b5b', // lighter forest green
                secondary: '#e8eedf', // light mossy cream
                background: '#fafbf9', // off-white warm
                foreground: '#2f3b34', // deep green-grey
                accent: '#d4a373' // warm earth/wood
            },
            fontFamily: {
                plus: ['"Plus Jakarta Sans"', 'sans-serif'],
                outfit: ['"Outfit"', 'sans-serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
                ibm: ['"IBM Plex Mono"', 'monospace'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            }
        },
    },
    plugins: [],
}
