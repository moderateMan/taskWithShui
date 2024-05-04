import { toast } from "@/components/ui/use-toast";
import axios, { CreateAxiosDefaults } from "axios";

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

config.baseURL = "/api";

const instance = axios.create(config);

let close: (() => void) | undefined = undefined;

const finish = () => {
  if (close) {
    close();
    close = undefined;
  }
};

instance.interceptors.response.use(
  (response) => {
    finish();
    const data = response.data;
    if (data) {
      if (data.success === false) {
        toast({
          variant: "destructive",
          title: "Request Error",
          description: data.msg,
        });
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
    toast({
      variant: "destructive",
      title: "Request Error",
      description: error.message,
    });
    return Promise.reject(error);
  }
);

export default instance;

export * from "./root";
