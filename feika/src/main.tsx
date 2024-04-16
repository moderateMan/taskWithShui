import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router.tsx";
import VConsole from "vconsole";

import "./index.scss";

if (import.meta.env.DEV) {
  new VConsole();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
