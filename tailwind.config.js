// tailwind.config.js
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        fontFamily: {
            sans: ['"Roboto"', 'sans-serif'], // Custom font (use Google Fonts or a local font)
            serif: ['"Merriweather"', 'serif'], // Example of serif font
        },
        fontSize: {
            base: '16px', // Set base font size
            lg: '18px',
            xl: '20px',
        },
    },
};
export const plugins = [];
