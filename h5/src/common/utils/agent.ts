type DataType = Record<string, any>;

export type Callback<
  T extends (...args: any) => any,
  P = Parameters<T>[0],
  R = ReturnType<T>
> = (
  args: P,
  data: DataType,
  utils: {
    finish: (data: DataType) => void;
    setData: (key: string, value: any) => void;
  }
) => R | Promise<R>;

const createAgent = <
  T extends (...args: any) => any,
  P = Parameters<T>[0],
  R = ReturnType<T>
>(
  callbacks: Nullable<Callback<T, P, R>>[],
  options?: {
    onError?: (error: Error & R) => R | void;
    initData?: DataType;
  }
) => {
  const { onError, initData = {} } = options || {};
  return async (args: P) => {
    const data: DataType = initData,
      len = callbacks.length;
    let isFinished = false,
      ret;
    const finish = (data: DataType) => {
      isFinished = true;
      ret = data;
    };
    const setData = (key: string, value: any) => {
      data[key] = value;
    };
    const utils = { finish, setData };
    try {
      for (let i = 0; i <= len; i++) {
        if (isFinished) return ret as R;
        const callback = callbacks[i];
        await callback?.(args, data, utils);
      }
    } catch (e) {
      return onError?.(e as Error & R) || ret || data;
    }
    return data as R;
  };
};

export default createAgent;
