/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
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
            foreground: '#000000',
            background: '#fbfdfe',
            primary: '#a15d36',
            secondary: '#d9e9f2',
            accent: '#bf6f40',
          },
        },
        dark: {
          colors: {
            foreground: '#ffffff',
            background: '#010304',
            primary: '#c9865e',
            secondary: '#0d1d26',
            accent: '#bf6f40',
          },
        },
      },
    }),
  ],
};
