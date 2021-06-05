import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./ThemeProvider";
// import {brow} from "react-router-dom"
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
