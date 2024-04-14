import { create } from "zustand";
import { LoginResponseData } from "../api";

export const useUserStore = create<{
  userInfo: LoginResponseData | undefined;
  setUserInfo: (userInfo?: LoginResponseData) => void;
}>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo?: LoginResponseData) => set(() => ({ userInfo })),
}));
