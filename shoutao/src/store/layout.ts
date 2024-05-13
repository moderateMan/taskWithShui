import { Glove } from "@/api";
import { create } from "zustand";

const getLocalCompareData = () => {
  const data = localStorage.getItem("compareData");
  if (!data) return [];
  try {
    return JSON.parse(data) as Glove[];
  } catch {
    return [];
  }
};

const setLocalCompareData = (data: Glove[]) => {
  localStorage.setItem("compareData", JSON.stringify(data));
};

export const useCompareSotre = create<{
  compareData: Glove[];
  setCompareData: (data: Glove[]) => void;
}>((set) => ({
  compareData: getLocalCompareData(),
  setCompareData: (data) => {
    set(() => ({ compareData: data }));
    setLocalCompareData(data);
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
