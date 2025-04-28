import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        neutral: {
          100: '#ffffff',
          200: '#fbf6ef',
          300: '#e3e3e2',
          400: '#cbcac8',
          500: '#b2b0ae',
          600: '#7f7e7a',
          700: '#4c4b49',
          800: '#17140f',
        },
        accent: {
          'primary-1': '#c9a977',
        },
        secondary: {
          'color-1': '#0d1225',
        },
        green: {
          100: '#def2e6',
          200: '#7fdca4',
          300: '#05c168',
          400: '#11845b',
        },
        red: {
          100: '#ffeff0',
          200: '#ffbec2',
          300: '#ff5a65',
          400: '#dc2b2b',
        },
        orange: {
          100: '#fff3e4',
          200: '#ffd19b',
          300: '#ff9e2c',
          400: '#d5691b',
        },
        blue: {
          100: '#eaf4ff',
          200: '#8fc3ff',
          300: '#1d88fe',
          400: '#086cd9',
        },
        brown: {
          300: '#b4816b',
          400: '#b4816b',
          500: '#724e3f',
        },
        black: {
          400: '#212428'
        },
        shadow: {
          100: '#14142b0f',
          200: '#14142b14',
          300: '#14142b1a',
          400: '#14142b24',
          500: '#14142b29',
          600: '#14142b3d',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;