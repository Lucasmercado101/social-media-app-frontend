import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
