import { RouterProvider } from "react-router";
import router from "./router";
import { DotLoading } from "antd-mobile";
function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<DotLoading color="primary" />}
    />
  );
}

export default App;
