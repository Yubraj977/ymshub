
/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        danfo:["var(--danfo)"],
        allerta:["var(--allerta)"],
        allerta_stencil:["var(--allerta_stencil)"],
        inter:["var(--inter)"],
      }
    
    },
  },
  plugins: [],
};