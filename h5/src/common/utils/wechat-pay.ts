import { error } from "./toast";

export interface PrepayPayload {
  appId?: string;
  timestamp: string;
  nonceStr: string;
  prepayId: string;
  signType: string;
  paySign: string;
}

export const pay = (payload: PrepayPayload) => {
  return new Promise<boolean>((resolve, reject) => {
    const onBridgeReady = () => {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payload.appId || process.env.REACT_APP_APP_ID,
          timeStamp: payload.timestamp,
          nonceStr: payload.nonceStr,
          package: payload.prepayId,
          signType: payload.signType,
          paySign: payload.paySign,
        },
        ({ err_msg }) => {
          switch (err_msg) {
            case "get_brand_wcpay_request:ok": {
              resolve(true);
              break;
            }
            case "get_brand_wcpay_request:fail": {
              error("支付失败，请稍后重试");
              reject({ message: "支付失败，请稍后重试" });
              break;
            }
            case "get_brand_wcpay_request:cancel": {
              error("用户取消支付");
              reject({ message: "用户取消支付" });
              break;
            }
            default: {
              error("系统开小差，请稍后重试...");
              reject({ message: "系统开小差，请稍后重试..." });
            }
          }
        }
      );
    };
    if (typeof WeixinJSBridge == "undefined") {
      document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else {
      onBridgeReady();
    }
  });
};
