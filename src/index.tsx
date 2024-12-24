import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./Academic.js";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Academic from "./Academic.js";
import Pool from "./Pool.js";

function RedirectToPDF() {
  useEffect(() => {
    // Redirect to the PDF file
    window.location.href = new URL(
      "/assets/nimo-dissertation.pdf",
      import.meta.url
    ).href;
  }, []);

  return null; // Render nothing, just trigger the redirect
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Academic />} />
        <Route path="/Pool" element={<Pool />} />
        <Route path="/thesis" element={<RedirectToPDF />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
