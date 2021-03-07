module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ['./public/index.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#e9fbfb',
          '100': '#dcf8f9',
          '200': '#b3eef5',
          '300': '#72dcee',
          '400': '#20c1e9',
          '500': '#119dd0',
          '600': '#0a7aae',
          '700': '#055f94',
          '800': '#034d82',
          '900': '#004480',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
