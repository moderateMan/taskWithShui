import axios, { CreateAxiosDefaults } from "axios";
import { error, loading } from "../utils/toast";

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
  baseURL: "/api",
};

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
    return Promise.reject(error);
  }
);

export default instance;

export * from "./root";
