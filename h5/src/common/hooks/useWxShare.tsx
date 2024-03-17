import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import wx from "weixin-js-sdk";
import { getWechatCfg } from "../apis";
import { useLocation } from "react-router";

export interface ShareProps {
  title?: string;
  link?: string;
  img?: string;
  desc?: string;
  appId?: string;
}
export interface WxConfigProviderProps {
  appId?: string;
  children?: ReactNode;
}

const WxConfigContext = createContext({ loaded: false });

export const WxConfigProvider = ({
  children,
  appId = process.env.REACT_APP_APP_ID!,
}: WxConfigProviderProps) => {
  const [loaded, setLoaded] = useState(false);
  const initWxConfig = useCallback(async () => {
    const { data } = await getWechatCfg();
    if (data) {
      setLoaded(false);
      wx.config({
        ...data,
        // debug: true,
        appId: appId,
        jsApiList: [
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "updateAppMessageShareData",
          "updateTimelineShareData",
        ],
      });
      wx.ready(() => {
        console.log("起步了");
        setLoaded(true);
      });
      wx.error((e) => {
        console.log("起步失败", e);
      });
    }
  }, [appId]);

  useEffect(() => {
    initWxConfig();
  }, [initWxConfig]);

  return (
    <WxConfigContext.Provider value={{ loaded }}>
      {children}
    </WxConfigContext.Provider>
  );
};

export default function useWxShare(props?: ShareProps) {
  const {
    title = document.title,
    desc = "",
    link = window.location.href.split("#")[0],
    img = window.location.origin + "/logo.png",
  } = props || {};
  const { loaded } = useContext(WxConfigContext);
  const location = useLocation();

  useEffect(() => {
    if (!loaded) return;
    const settings = {
      title,
      link,
      imgUrl: img,
      desc,
      type: "link" as const,
      success: () => {
        console.log("成功了");
      },
      error: () => {
        console.log("出错了");
      },
      cancel: () => {
        console.log("用户点击取消");
      },
      trigger: () => {
        console.log("用户点击分享");
      },
    };
    wx.updateAppMessageShareData(settings);
    wx.updateTimelineShareData(settings);
    wx.onMenuShareAppMessage(settings);
    wx.onMenuShareTimeline(settings);
  }, [loaded, title, desc, link, img, location.pathname]);
}
