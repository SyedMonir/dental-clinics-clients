module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dentalTheme: {
          primary: '#0FCFEC',
          secondary: '#19D3AE',
          accent: '#3A4256',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'halloween',
      'dark',
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
};
