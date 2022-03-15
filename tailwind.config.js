module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens:{
        'sm' : {'max': '767px'}
      }
    },
  },
  plugins: [],
};
