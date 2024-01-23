import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.js";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./Posts.js";
import DarkModeContext from "./DarkModeContext.js";
import Pool from "./Pool.js";
import Post from "./Post.js";

// Dynamically import all markdown files from the posts directory
const postModules = import.meta.glob("./posts/*.md");

// Function to create routes for each post
const createPostRoutes = async () => {
  const routes = await Promise.all(
    Object.keys(postModules).map(async (path) => {
      // TODO: type
      const post = (await postModules[path]()) as any;
      const postPath = path.split("/").pop()?.replace(".md", "");
      return {
        path: `/posts/${postPath}`,
        element: <Post post={post} />,
      };
    })
  );
  return routes;
};

// Create the router with a function to add post routes
const createRouter = async () => {
  const postRoutes = await createPostRoutes();
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
        // children: postRoutes,
      },
      {
        path: "/pool",
        element: <Pool />,
      },
      ...postRoutes,
    ],
    {
      basename: import.meta.env.BASE_URL,
    }
  );
};

const RootComponent = () => {
  // TODO: type
  const [router, setRouter] = useState<any>(null);
  useEffect(() => {
    createRouter().then((router) => setRouter(router));
  }, []);

  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    function updateTheme() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setDarkMode(true);
      } else {
        // Otherwise, remove it
        setDarkMode(false);
      }
    }
    // Add an event listener to react to changes in the system's color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (!router) return <div>Loading...</div>;

  return (
    <React.StrictMode>
      <DarkModeContext.Provider value={{ darkMode, toggleDark }}>
        <RouterProvider router={router} />
      </DarkModeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
