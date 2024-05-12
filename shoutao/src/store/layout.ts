import { Glove } from "@/api";
import { create } from "zustand";

export const useCompareSotre = create<{
  compareData: Glove[];
  setCompareData: (data: Glove[]) => void;
}>((set) => ({
  compareData: [],
  setCompareData: (data) => set(() => ({ compareData: data })),
}));

type DictItem = {
  label: string;
  value: string;
  children: { label: string; value: string }[];
};

export const usePageStore = create<{
  dict: DictItem[];
  name?: string;
  code?: [string, string];
  list: Glove[];
  expanse: boolean;
  setDict: (data: DictItem[]) => void;
  setName: (data: string) => void;
  setCode: (data: [string, string]) => void;
  setList: (data: Glove[]) => void;
  setExpanse: (data: boolean) => void;
}>((set) => ({
  dict: [],
  name: undefined,
  code: undefined,
  list: [],
  expanse: false,
  setDict: (data) => set(() => ({ dict: data })),
  setName: (data) => set(() => ({ name: data })),
  setCode: (data) => set(() => ({ code: data })),
  setList: (data) => set(() => ({ list: data })),
  setExpanse: (data) => set(() => ({ expanse: data })),
}));
