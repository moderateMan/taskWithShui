import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createRadomColorFactory = () => {
  const cache: string[] = [];
  return {
    createRadomColor(): string {
      const color = "#" + Math.random().toString(16).substring(2, 8);
      if (cache.includes(color)) {
        return this.createRadomColor();
      }
      cache.push(color);
      return color;
    },
    getRandomIds: () => cache,
    reset: () => (cache.length = 0),
  };
};
