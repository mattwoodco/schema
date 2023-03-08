const tailwindScrollbarHide = require('tailwind-scrollbar-hide')
const aspectRatio = require('@tailwindcss/aspect-ratio')
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height')
const lineClamp = require('@tailwindcss/line-clamp')
const typography = require('@tailwindcss/typography')

const colors = require('tailwindcss/colors')

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        accent: 'var(--color-accent)',

        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',

        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
        transpaent: 'var(--color-transparent)',

        background: {
          lighter: 'var(--color-background-lighter)',
          light: 'var(--color-background-light)',
          dark: 'var(--color-background-dark)',
          darker: 'var(--color-background-darker)',
          DEFAULT: 'var(--color-background-default)',
        },

        text: {
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
          DEFAULT: 'var(--color-text-default)',
        },
      },

      backgroundColor: {
        ...colors,
        DEFAULT: 'var(--color-background-default)',
      },
      textColor: {
        ...colors,
        DEFAULT: 'var(--color-text-default)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    aspectRatio,
    iOSHeight,
    lineClamp,
    typography,
    tailwindScrollbarHide,
  ],
}
