import { createHashRouter } from "react-router-dom";
import Layout from "./layout";
import Register from "./pages/register";
import Questionnaire from "./pages/questionnaire";
import Home from "./pages/home";
import Declare from "./pages/declare";

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
      {
        path: "declare",
        Component: Declare,
      },
    ],
  },
]);

export default router;
