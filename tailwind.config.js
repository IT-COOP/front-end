module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        sm: { min: "375px" },
        md: { min: "640px" },
        lg: { min: "960px" },
        xl: { min: "1366px" },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
