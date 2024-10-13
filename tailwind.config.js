/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vsDark: {
          background: "#1E1E1E", // Primary background
          "editor-bg": "#252526", // Editor background
          selection: "#264F78", // Selection background
          "line-highlight": "#333333", // Current line highlight background
          cursor: "#AEAFAD", // Cursor color
          comment: "#6A9955", // Comment color
          string: "#CE9178", // String color
          keyword: "#569CD6", // Keyword color
          "function-name": "#DCDCAA", // Function name color
          number: "#B5CEA8", // Number color
          operator: "#D4D4D4", // Operator and text color
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
