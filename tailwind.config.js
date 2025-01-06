/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores dinámicos definidos como variables CSS
        dynamicBackground: "var(--background-color)",
        dynamicMenu: "var(--menu-color)",
        dynamicText: "var(--text-color)",
      },
      fontFamily: {
        // Tipografía dinámica definida como variable CSS
        dynamic: ["var(--font-family)", "sans-serif"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Mantén tus plugins existentes
  ],
}
