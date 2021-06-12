import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
