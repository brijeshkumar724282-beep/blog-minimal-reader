/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F1',
        paperdeep: '#F1EAE0',
        ink: '#1B1812',
        inksoft: '#575046',
        line: '#E3DACA',
        accent: '#B3402A',
        accentdeep: '#8C2F1D',
        moss: '#2F3D33',
        night: '#161310',
        nightcard: '#201C16'
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', "'Times New Roman'", 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      maxWidth: {
        reader: '46rem'
      }
    }
  },
  plugins: []
}
