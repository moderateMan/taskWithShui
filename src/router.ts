import { DotLoading } from "antd-mobile";
import MainLayout from "./layout/main";
import {createBrowserRouter} from 'react-router-dom'
import LearnScientific from "./pages/learnScientific";
import ReadScientific from "./pages/readScientific";
import WorkScientific from "./pages/workScientific";
import personalCenter from "./pages/personalCenter";

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
        Component: ReadScientific,
      },
      {
        path: "workScientific",
        Component: WorkScientific,
      },
      {
        path: "personalCenter",
        Component: personalCenter,
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