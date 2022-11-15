const { default: plugin } = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            // set the break points
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            borderColor: ["responsive", "hover", "focus", "focus-within"],
            transformOrigin: {
                0: "0%",
            },
            zIndex: {
                "-1": "-1",
            },
            colors: {
                brightRed: "#FE7F2D",
                brightRedLight: "#ffb494",
                brightRedSupLight: "#ffded2",
                // brightRed: "hsl(12, 88%, 59%)",
                // brightRedLight: " hsl(12, 88%, 69%)",
                // brightRedSupLight: " hsl(12, 88%, 95%)",
                darkBlue: "hsl(228, 39%, 23%)",
                darkGrayishBlue: " hsl(227, 12%, 61%) ",
                veryDarkBlue: " hsl(233, 12%, 13%) ",
                veryPaleRed: " hsl(13, 100%, 96%) ",
                veryLightGray: "hsl(0, 0%, 98%)",
            },
            transitionProperty: {
                width: "width",
            },
        },
    },
    plugins: [],
};
