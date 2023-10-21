import React from "react";
import ReactDOM from "react-dom/client";
import App, { theme } from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      {/* <RouterProvider router={router}></RouterProvider> */}
    </ThemeProvider>
  </React.StrictMode>
);
