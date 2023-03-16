import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Finder } from "./features/finder";
import { Provider } from "react-redux";
import store from "./store/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Finder />,
      },
      {
        path: "/test",
        element: <Finder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
