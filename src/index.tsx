import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "@/assets/css/reset.less";
import "@/assets/css/common.less";
import theme from "./assets/css/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
