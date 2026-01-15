// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Habilita modo oscuro basado en clase
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Modo oscuro (futurista)
                dark: '#0f0f1b',
                neon: '#00f0ff',
                cyber: '#0abdc6',
                space: '#121220',

                // Modo claro (moderno)
                light: '#f8fafc',
                primary: '#0f172a',
                secondary: '#334155',
                accent: '#0ea5e9',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}