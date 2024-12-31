import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Academic from "./Academic.js";
import AllNotes from "./AllNotes.js";
import Layout from "./Layout.js";
import NoPage from "./NoPage.js";
import Pool from "./Pool.js";
import NotePage from "./components/NotePage.js";
import "./index.css";

function RedirectToPDF({ link }: { link: string }) {
  useEffect(() => {
    // Redirect to the PDF file
    window.location.href = new URL(link, import.meta.url).href;
  }, []);

  return null; // Render nothing, just trigger the redirect
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Academic />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="*" element={<NoPage />} />
          {/* An index page listing all notes */}
          <Route path="/pool/notes" element={<AllNotes />} />
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
