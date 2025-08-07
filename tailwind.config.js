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
        },
    },

    plugins: [],
}
