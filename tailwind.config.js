/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // 👈 Enable class-based dark mode
    theme: {
        extend: {
            transitionProperty: {
                DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
        },
    },

    plugins: [],
}
