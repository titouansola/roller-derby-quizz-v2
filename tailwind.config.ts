import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {},
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
