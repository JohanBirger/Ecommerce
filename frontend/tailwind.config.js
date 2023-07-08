/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#0A5A96', // Set the primary color to red
      secondary: '#0F7FFF', // Set the secondary color to green
    },
    fontFamily: {
      sans:['Inter', 'sans-serif'],
    },
  },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    fontFamily: false, // Disable the default fontFamily utility
  },
  // Override the default font family in the base styles
  purge: {
    options: {
      safelist: ['font-sans'],
    },
  },
  // Define the default font family in the base styles
  // This applies the custom font to all elements by default
  corePlugins: {
    fontFamily: ({ addBase }) => {
      addBase({
        'body': { fontFamily: 'Inter, sans-serif' },
      });
    },
  },
};