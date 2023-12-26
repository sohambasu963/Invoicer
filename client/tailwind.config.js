/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#F7EFD7',
      },
      fontFamily: {
        'satoshi-variable': ['Satoshi Variable', 'sans-serif'],
        'gambetta-variable': ['Gambetta Variable', 'sans-serif'],
        'neco-variable': ['Neco Variable', 'sans-serif'],
        'sf-mono': ['SF Mono', 'Menlo', 'monospace'],
        'tiempos-headline': ['Tiempos Headline', 'serif'],
      },
    },
  },
  plugins: [],
};
