import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import NewPost from "./components/NewPost";
import Root from "./routes/root";
import Post from "./components/Post";
import ErrorPage from "./error-page";
import Navbar from "./components/Navbar";
import PostMessage from "./components/PostMessage";
import SingleMessage from "./components/SingleMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      { path: "/", element: <Navbar /> },
      { path: "/posts", element: <Posts /> },
      {
        path: "/profile",
        element: <Profile />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/posts/:postId", element: <Post /> },
      { path: "/new-post", element: <NewPost /> },
      {
        path: "/posts/:postId/messages ",
        element: <PostMessage />,
      },
      { path: "profile/:userId", element: <SingleMessage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
