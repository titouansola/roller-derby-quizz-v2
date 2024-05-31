import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#181818',
        light: '#F6FFFF',
        primary: '#DFC1FC',
        secondary: '#C1DEFC',
        alternate: '#48EEF9',
        grey: '#CAD4D4',
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
