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
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        /* WebKit scrollbar styles */
        '.scrollbar-thumb': {
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
export default config;