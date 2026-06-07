export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d1023',
        panel: '#171a35',
        ember: '#ff4d3d',
        electric: '#6f8cff'
      },
      boxShadow: {
        glow: '0 24px 90px rgba(111,140,255,.22)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
