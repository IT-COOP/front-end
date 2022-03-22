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
      colors: {
        gray1: "#f3f3f3",
        gray2: "#c4c4c4",
        gray3: "#999999",
        gray4: "#797979",
        coral: "#ee7167",
        blue: "#4480f7",
        yellow: "#fbbc05",
        pink: "#e5a0c0",
        red: "#ff0000", //경고색
        blue2: "#0055ff", //필수,선택
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
