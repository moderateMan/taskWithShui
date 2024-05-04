import { createHashRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Detail from "./pages/detail";

const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "detail",
        Component: Detail,
      },
    ],
  },
]);

export default router;
