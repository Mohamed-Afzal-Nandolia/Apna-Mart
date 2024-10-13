/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite-react/tailwind"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins"]
      },
      colors: {
        "main-blue": "#2c3a8b",
        "main-green": "#1ca32d"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
