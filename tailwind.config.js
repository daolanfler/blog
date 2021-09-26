module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'serif': ['Noto Serif SC', 'serif']
    }
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      textColor: ['dark'],
      backgroundColor: ['dark']
    },
  },
  plugins: [],
}
