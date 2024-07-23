import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.custom-hover': {
          '&:hover': {
            backgroundColor: '#003366',
            color: '#ffffff',
          },
          transition: 'background-color 300ms, color 300ms',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
export default config;