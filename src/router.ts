import { DotLoading } from "antd-mobile";
import MainLayout from "./layout/main";
import {createBrowserRouter} from 'react-router-dom'
import LearnScientific from "./pages/learnScientific";

const router = createBrowserRouter([
  {
    id: "root",
    path: "",
    Component: MainLayout,
    children: [
      {
        path: "learnScientific",
        Component: LearnScientific,
      },
      {
        path: "readDocument",
        Component: DotLoading,
      },
      {
        path: "workScientific",
        Component: DotLoading,
      },
      {
        path: "personalCenter",
        Component: DotLoading,
      },
    ],
  },
  {
    path: "/me",
    element: "5555",
  },
  {
    path: "*",
    element: "66666",
  },
]);

export default router;