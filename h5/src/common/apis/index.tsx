import axios, { CreateAxiosDefaults } from "axios";
import { error, loading } from "../utils/toast";
import { getLocal } from "../utils/storage";
import { LoginResponseData } from "./user";

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

if (process.env.NODE_ENV === "production") {
  config.baseURL = "http://shejun-api.jefferyqjy.com/api";
}
const instance = axios.create(config);

class ResponseError<T> extends Error {
  code;
  msg;
  success;
  constructor(data: Response<T>) {
    super(data.msg);
    this.code = data.code;
    this.msg = data.msg;
    this.success = data.success;
  }
}

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
    if (data) {
      if (data.success === false) {
        error(data.msg);
        return Promise.reject(data);
      }
      return data;
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

export * from "./user";
export * from "./order";
export * from "./resource";
