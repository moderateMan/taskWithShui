import ReactDOM from "react-dom/client";
import SuperProvider from "./service/providers";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import VConsole from "vconsole";
import { WxConfigProvider } from "./common/hooks/useWxShare";
import "./index.scss";
import "./global";
new VConsole();

if (process.env.NODE_ENV === "development") {
  // new VConsole();
  window.IS_DEBUG = true;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <SuperProvider>
    <WxConfigProvider>
      <App />
    </WxConfigProvider>
  </SuperProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
