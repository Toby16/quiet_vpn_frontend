/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: "scroll 10s linear infinite", // Custom animation name
      },
      keyframes: {
        "scroll": {
          "0%": { transform: "translateX(101vw)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      colors: {
        primary_100: "#0F3460",
        primary_200: "#435d8e",
        primary_300: "#a3baf1",
        accent_100: "#00A6FB",
        accent_200: "#004c96",
        text_100: "#FFFFFF",
        text_200: "#e0e0e0",
        bg_100: "#1A1A2E",
        bg_200: "#29293e",
        bg_300: "#424057",
      }
    },
  },
  plugins: [],
}