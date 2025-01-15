import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#4cd137",
        "second-color": "#706fd3",
      },
    },
  },
  plugins: [daisyui],
};
