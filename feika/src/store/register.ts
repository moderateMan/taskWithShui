import { create } from "zustand";
import { UpdateUserInfoRequestParams } from "../api";

type RegisterCacheState = Partial<UpdateUserInfoRequestParams> & {
  agreement?: boolean;
};

export const useRegisterCacheStore = create<{
  registerCache: RegisterCacheState | undefined;
  setRegisterCache: (registerCache?: RegisterCacheState) => void;
}>((set) => ({
  registerCache: undefined,
  setRegisterCache: (registerCache) => set(() => ({ registerCache })),
}));
