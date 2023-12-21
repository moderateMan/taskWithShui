import { generate } from "@arco-design/color";

export const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "(" + r + "," + g + "," + b + ")";
};

export const color16 = () => {
  return `#${Math.random().toString(16).substr(-6)}`;
};

export const rgba = (a: number) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const stepColor = (): [string, string] => {
  const color = color16();
  const ret = generate(color, { index: 1 });
  return [color, ret];
};
