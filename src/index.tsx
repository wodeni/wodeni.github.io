import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Academic.js";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Academic from "./Academic.js";
import Pool from "./Pool.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Academic />} />
        <Route path="/Pool" element={<Pool />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
