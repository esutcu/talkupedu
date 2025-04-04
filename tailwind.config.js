module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#3871B1',
        accent: '#FF8913',
        'brand-light': '#5A92D2',
        'brand-dark': '#2A5C8E',
        'accent-light': '#FFA642',
        'accent-dark': '#E67800'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}