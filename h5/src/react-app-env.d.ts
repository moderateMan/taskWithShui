/// <reference types="react-scripts" />

declare module "@arco-design/color" {
  interface ColorType {
    dark: string[];
    light: string[];
    primary: string;
  }
  export function getRgbStr(color: string): string;
  export function generate(
    color: string,
    options?: {
      index?: number;
      list: true;
      dark?: boolean;
      format?: "hex" | "rgb" | "hsl";
    }
  ): string[];
  export function generate(
    color: string,
    options?: {
      index?: number;
      list?: false;
      dark?: boolean;
      format?: "hex" | "rgb" | "hsl";
    }
  ): string;
  export function getPresetColors(): {
    red: ColorType;
    orangered: ColorType;
    orange: ColorType;
    gold: ColorType;
    yellow: ColorType;
    lime: ColorType;
    green: ColorType;
    cyan: ColorType;
    blue: ColorType;
    arcoblue: ColorType;
    purple: ColorType;
    pinkpurple: ColorType;
    magenta: ColorType;
    gray: ColorType;
  };
}

declare const WeixinJSBridge = {
  invoke: (
    type: string,
    payload: any,
    callback: (ret: {
      err_msg:
        | "get_brand_wcpay_request:ok"
        | "get_brand_wcpay_request:cancel"
        | "get_brand_wcpay_request:fail";
    }) => void
  ) => void 0,
};

type Nullable<T> = T | undefined | null;