import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/context";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
    <ToastContainer/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
