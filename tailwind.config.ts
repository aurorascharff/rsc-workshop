import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        sm: '0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        xs: '0 0px 1px hsla(0, 0%, 0%, 0.4)',
      },
      colors: {
        destroy: {
          DEFAULT: '#f44250',
          dark: '#cc3740',
          light: '#ff4d5c',
        },
        gray: {
          DEFAULT: '#e3e3e3',
          dark: '#818181',
          light: '#f7f7f7',
        },
        primary: {
          DEFAULT: '#2b63fd',
          dark: '#1a3dbf',
          light: '#4c7eff',
        },
        secondary: {
          DEFAULT: '#eeb004',
          dark: '#cc8c03',
          light: '#ffcc36',
        },
      },
    },
  },
};
export default config;
