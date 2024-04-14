import { createHashRouter } from "react-router-dom";
import Layout from "./layout";
import Register from "./pages/register";
import Questionnaire from "./pages/questionnaire";
import Home from "./pages/home";

const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "questionnaire",
        Component: Questionnaire,
      },
      {
        path: "home",
        Component: Home,
      },
    ],
  },
]);

export default router;
