import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DropdownProvider } from "./components/dropdown/dropdown-context";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./context/login-Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DropdownProvider>
      <LoginProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoginProvider>
      <ToastContainer></ToastContainer>
    </DropdownProvider>
  </React.StrictMode>
);
