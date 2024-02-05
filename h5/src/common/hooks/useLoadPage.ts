import { useCallback, useRef, useState } from "react";

type FetchPageParamsType = {
  current: number;
  pageSize: number;
};

export type isFinishFunctionType<P> = (
  config: FetchPageParamsType & {
    data: P[];
    count: number;
  }
) => boolean;

type FetchPageReturnType<P> = Nullable<
  FetchPageParamsType & {
    data: P[];
    count: number;
  }
>;

export type FetchPageType<T, P> = (
  config: FetchPageParamsType & T
) => Promise<FetchPageReturnType<P>> | FetchPageReturnType<P>;

const useLoadPage = <
  T extends Record<string, any> | undefined = undefined,
  P = any
>(
  fetch: FetchPageType<T, P>,
  config?: Partial<
    FetchPageParamsType & {
      isFinish: isFinishFunctionType<P>;
    }
  >
) => {
  const { current = 0, pageSize = 10, isFinish } = config || {};
  const configRef = useRef({ current, pageSize });
  const [data, setData] = useState<P[]>([]);
  const [finish, setFinish] = useState(false);

  const loadPage = useCallback(
    async (args: T) => {
      if (finish) return;
      const res = await fetch({
        ...configRef.current,
        count: data.length,
        ...args,
      });
      if (!res) return;
      const { data: _data } = res;
      setData(_data);
      setFinish(isFinish ? isFinish(res) : false);
    },
    [finish, isFinish, data, fetch]
  );

  const reload = useCallback(
    (args: T) => {
      configRef.current = { current, pageSize };
      setFinish(false);
      loadPage(args);
    },
    [current, pageSize]
  );

  return {
    loadPage,
    data,
    isFinish: finish,
    reload,
  };
};

export default useLoadPage;
