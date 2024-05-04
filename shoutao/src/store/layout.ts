import { create } from "zustand";

export const useCompareSotre = create<{
  compareData: any[];
  setCompareData: (data: any[]) => void;
}>((set) => ({
  compareData: [],
  setCompareData: (data) => set(() => ({ compareData: data })),
}));
