import axios from "axios";
import { error, loading } from "../utils/toast";
import { getLocal } from "../utils/storage";
import { LoginResponseData } from "./user";

const instance = axios.create({
  //   baseURL: "http://shejun-api.jefferyqjy.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let close: (() => void) | undefined = undefined;

const finish = () => {
  if (close) {
    close();
    close = undefined;
  }
};

instance.interceptors.request.use(
  (config) => {
    const userInfo = getLocal<LoginResponseData>("userInfo");
    if (userInfo?.token) {
      config.headers["shejun-token"] = userInfo.token;
    }
    close = loading();
    return config;
  },
  (error) => {
    console.warn(error);
    finish();
  }
);

instance.interceptors.response.use(
  (response) => {
    finish();
    const data = response.data;
    if (data.success === false) {
      error(data.msg);
    }
    return data;
  },
  (error) => {
    console.warn(error);
    finish();
  }
);

export default instance;

export * from "./user";
export * from "./order";
export * from "./resource";
