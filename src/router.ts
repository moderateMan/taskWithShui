import { DotLoading } from "antd-mobile";
import MainLayout from "./layout/main";
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "learnScientific",
        Component: DotLoading,
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
]);

export default router;