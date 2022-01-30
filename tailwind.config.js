

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          galaxy: '#000D14',
          mariner: '#3B4E78',
          diamond: '#95B2DB',
          racing: '#0E316D',
          ultra: '#0055C4',
          standard: '#001B57',
        },
        wanikani: {
          radical: '#0093dd',
          kanji: '#dd0093',
          vocabulary: '#9300dd',
        },
      },
      spacing: {
        256: '64rem',
      },
    },
    fontFamily: {
      sans: ['Noto Sans', 'Arial', 'sans-serif',],
    },
  },
  plugins: [],
};