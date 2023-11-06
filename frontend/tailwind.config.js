/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    fontFamily: {
      sans: 'Cormorant Infant, sans-serif',
    },
    extend: {
      backgroundImage: {
        'my-gradient': 'linear-gradient(107deg, #920CFF 26.43%, #33FAFF 82.56%)',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '2px', // rounded-small
          medium: '4px', // rounded-medium
          large: '6px', // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '1px', // border-medium
          large: '2px', // border-large
        },
      },
      themes: {
        light: {
          colors: {
            foreground: '#02181d',
            background: '#ecfafe',
            primary: '#f79c87',
            secondary: '#c1f3fb',
            accent: '#e1350e',
          },
        },
        dark: {
          colors: {
            foreground: '#e2f8fd',
            background: '#010f13',
            primary: '#781c08',
            secondary: '#04383e',
            accent: '#f1441e',
          },
        },
      },
    }),
  ],
};
