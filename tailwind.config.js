/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-normal": "#153445",
      "primary-light": "#3A7391",
      "secondary-normal": "#91580F",
      "secondary-light": "#CC9454",
      "secondary-heavy": "#453015",
      "status-alert": "#EB5147",
      "status-caution": "#FA9538",
      "status-positive": "#0090FF",
      "background-primary": "#F3F3F3",
      "background-secondary": "#EBEBEB",
      "background-normal": "#EEEEEE",
    },
    fontSize:{
      '3xl': '2rem',
      '5xl':'2.5rem'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
