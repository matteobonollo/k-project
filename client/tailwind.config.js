module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Specifica i file da processare
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], // Aggiunge Quicksand come font principale
      },
    },
  },
  plugins: [],
};
