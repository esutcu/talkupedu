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
          accent: '#FF8913'
        }
      }
    },
    plugins: [require('flowbite/plugin')]
  }
  