import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import App from "./components/App";
import "./index.css";
// import { createRoot } from "react-dom/client";

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  