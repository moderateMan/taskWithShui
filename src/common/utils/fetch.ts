namespace Fetch {
  export interface RequestInterceptor {
    (request: any): void;
  }
  export interface ResponseInterceptor {
    (response: any): void;
  }
  export interface ErrorInterceptor {
    (error: any): void;
  }
}

type InterceptorType = {
  request: [Fetch.RequestInterceptor, Fetch.ErrorInterceptor][];
  response: [Fetch.ResponseInterceptor, Fetch.ErrorInterceptor][];
};

type CreateOptionsType = {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

type InstanceType = {
  get: (path: string, headers?: Record<string, string>) => void;
  post: (path: string, headers?: Record<string, string>) => void;
  put: (path: string, headers?: Record<string, string>) => void;
  delete: (path: string, headers?: Record<string, string>) => void;
  interceptors: {
    useRequest: (
      interceptor: [Fetch.RequestInterceptor, Fetch.ErrorInterceptor]
    ) => void;
    useResponse: (
      interceptor: [Fetch.ResponseInterceptor, Fetch.ErrorInterceptor]
    ) => void;
  };
};

const interceptors: InterceptorType = {
  request: [],
  response: [],
};

function createFetchInstance(opt?: CreateOptionsType): InstanceType {
  const {
    baseUrl = window.location.origin,
    timeout = 3000,
    headers = {},
  } = opt || {};
  return {
    get: (path: string, headers?: Record<string, string>) => {
    },
    post: (path: string, headers?: Record<string, string>) => {},
    put: (path: string, headers?: Record<string, string>) => {},
    delete: (path: string, headers?: Record<string, string>) => {},
    interceptors: {
      useRequest: (interceptor) => {
        interceptors.request.push(interceptor);
      },
      useResponse: (interceptor) => {
        interceptors.response.push(interceptor);
      },
    },
  };
}

export default createFetchInstance;
