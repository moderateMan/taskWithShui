import { Glove } from "@/api";
import { create } from "zustand";

const getLocal = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return data as T;
  }
};

const setLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const useCompareSotre = create<{
  compareData: Glove[];
  setCompareData: (data: Glove[]) => void;
}>((set) => ({
  compareData: getLocal<Glove[]>("compareData") || [],
  setCompareData: (data) => {
    set(() => ({ compareData: data }));
    setLocal("compareData", data);
  },
}));

type DictItem = {
  label: string;
  value: string;
  children: { label: string; value: string }[];
};

export const usePageStore = create<{
  dict: DictItem[];
  name?: string;
  params: Record<string, string | undefined>;
  list: Glove[];
  expanse: boolean;
  setDict: (data: DictItem[]) => void;
  setName: (data: string) => void;
  setParams: (data: Record<string, undefined | string>) => void;
  setList: (data: Glove[]) => void;
  setExpanse: (data: boolean) => void;
}>((set) => ({
  dict: [],
  name: undefined,
  params: {},
  list: [],
  expanse: false,
  setDict: (data) => set(() => ({ dict: data })),
  setName: (data) => set(() => ({ name: data })),
  setParams: (data) => set(() => ({ params: data })),
  setList: (data) => set(() => ({ list: data })),
  setExpanse: (data) => set(() => ({ expanse: data })),
}));

export const useShowDisclaimerStore = create<{
  showDisclaimer: boolean;
  setShowDisclaimer: (data: boolean) => void;
}>((set) => ({
  showDisclaimer: getLocal<boolean>("showDisclaimer") || false,
  setShowDisclaimer: (data) => {
    set(() => ({ showDisclaimer: data }));
    setLocal("showDisclaimer", data);
  },
}));
