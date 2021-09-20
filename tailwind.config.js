module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textOpacity: ['dark']
    },
  },
  plugins: [],
}
