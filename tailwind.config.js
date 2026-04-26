/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bone: '#F5F5F5',
        cream: '#EDEDED',
        ink: '#111111',
        ash: '#1A1A1A',
        smoke: '#6B6B6B',
        terracotta: '#CC1F1F',
        clay: '#A21818',
        brand: '#CC1F1F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest: '0.22em',
      },
      transitionTimingFunction: {
        'archi': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenburns: {
          '0%':   { transform: 'scale(1.05) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.18) translate3d(-1.5%, -1%, 0)' },
        },
        fadeup: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        kenburns: 'kenburns 8000ms ease-out forwards',
        fadeup: 'fadeup 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
