import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Finder } from "./features/finder";
import { Provider } from "react-redux";
import store from "./store/index";
import New from "./features/jobs/components/New";

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
        path: "/company/new",
        element: <New />,
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
