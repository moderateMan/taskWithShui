import axios, { CreateAxiosDefaults } from "axios";
import { error, loading } from "../utils/toast";
import { useUserStore } from "../store/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Response<T = any> {
  code: string;
  data: T | undefined;
  msg: string;
  success: boolean;
}

const config: CreateAxiosDefaults = {
  headers: {
    "Content-Type": "application/json",
  },
};

if (import.meta.env.DEV) {
  config.baseURL = "/api";
}

const instance = axios.create(config);

let close: (() => void) | undefined = undefined;

const finish = () => {
  if (close) {
    close();
    close = undefined;
  }
};

instance.interceptors.request.use(
  (config) => {
    const { userInfo } = useUserStore.getState();
    if (userInfo?.token) {
      config.headers["feika-token"] = userInfo.token;
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
    if (data) {
      if (data.success === false) {
        error(data.msg);
        return Promise.reject(data);
      }
      return data.data;
    }
    return Promise.reject({
      data: null,
    });
  },
  (error) => {
    finish();
    console.error(error);
    error(error.message);
    return Promise.reject(error);
  }
);

export default instance;

export * from "./root";
