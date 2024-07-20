import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          light: '#d4cad4',
          DEFAULT: '#b2aab2',
          dark: '#8c838c',
        },
        light: {
          DEFAULT: '#fffcff',
          alt: '#f5ebf5',
        },
        dark: {
          DEFAULT: '#181818',
          hover: '#383838',
          active: '#505050',
        },
        primary: {
          DEFAULT: '#dfc1fc',
          hover: '#c793f6',
          active: '#a066d3',
          background: '#f6f3fc',
        },
        secondary: {
          DEFAULT: '#c1defc',
          hover: '#9fc4f3',
          active: '#75a4dc',
          background: '#edf6ff',
        },
        alternate: {
          DEFAULT: '#48eef9',
          hover: '#3fe1ec',
          active: '#36d3de',
        },
        ghost: {
          DEFAULT: '#18181800',
          hover: '#18181811',
          active: '#18181822',
        },
        success: {
          DEFAULT: '#047857',
          hover: '#059669',
          active: '#10b981',
        },
        danger: {
          DEFAULT: '#b91c1c',
          hover: '#dc2626',
          active: '#ef4444',
        },
      },
      boxShadow: {
        panel: '6px 6px 10px rgba(0, 0, 0, 0.2)',
      },
    },
    // Define custom data for Tailwind CSS IntelliSense
    data: {
      full: 'full="true"',
      round: 'round="true"',
      regular: 'regular="true"',
      small: 'small="true"',
    },
    aria: {
      'current-page': 'current="page"',
    },
  },
  plugins: [],
} satisfies Config;
