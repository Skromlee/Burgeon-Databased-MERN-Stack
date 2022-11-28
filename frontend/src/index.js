import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// import { createTheme, ThemeProvider } from "@mui/material";

const container = document.getElementById("root");
const root = createRoot(container);

// // Create Theme
// const theme = createTheme({
//     palette: {
//         primary: {
//             light: "#ffb15d",
//             main: "#ff802d",
//             dark: "#c55100",
//             contrastText: "#000000",
//         },
//         secondary: {
//             light: "#76b7ff",
//             main: "#2d88ff",
//             dark: "#005ccb",
//             contrastText: "#000000",
//         },
//         white: {
//             main: "#fff",
//             contrastText: "#000",
//         },
//     },
// });

root.render(
    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
        <Provider store={store}>
            <App />
        </Provider>
        {/* </ThemeProvider> */}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
