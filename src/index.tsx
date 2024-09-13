import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

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
        <Route path="/" element={<App />} />
        <Route path="/thesis" element={<RedirectToPDF />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
