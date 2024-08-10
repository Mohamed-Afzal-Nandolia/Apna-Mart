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
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
