import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./Academic.js";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Academic from "./Academic.js";
import Pool from "./Pool.js";
import Layout from "./Layout.js";
import NoPage from "./NoPage.js";
import NotesIndex from "./components/NoteIndex.js";
import NotePage from "./components/NotePage.js";

function RedirectToPDF({ link }: { link: string }) {
  useEffect(() => {
    // Redirect to the PDF file
    window.location.href = new URL(link, import.meta.url).href;
  }, []);

  return null; // Render nothing, just trigger the redirect
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Academic />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="*" element={<NoPage />} />
          {/* An index page listing all notes */}
          <Route path="/pool/notes" element={<NotesIndex />} />
          {/* A dynamic route for each individual note */}
          <Route path="/pool/notes/:slug" element={<NotePage />} />
        </Route>
        <Route
          path="/thesis"
          element={<RedirectToPDF link={"/assets/nimo-dissertation.pdf"} />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
