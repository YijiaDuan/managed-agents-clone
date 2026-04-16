/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        success: {
          bg: '#E6F4EA',
          text: '#137333',
        },
        info: {
          bg: '#E0F2FE',
          text: '#075985',
        },
        warn: {
          bg: '#FEF3C7',
          text: '#92400E',
        },
        danger: {
          bg: '#FEE2E2',
          text: '#B91C1C',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04)',
        modal: '0 8px 32px rgba(0,0,0,0.12)',
        sidebar: 'inset -1px 0 0 #E7E5E4',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};
