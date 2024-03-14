import { createPortal } from "react-dom";
import styles from "./index.module.scss";
import arrowImg from "./assets/arrow.png";
import tipImg from "./assets/tip.png";
import { getWechatCfg } from "../../apis";
import { useCallback, useRef, useEffect, useState } from "react";
import wx from "weixin-js-sdk";
import { useFlat } from "../../../service";

export interface WxMaskShareProps {
  title?: string;
  link?: string;
  img?: string;
  desc?: string;
  visible?: boolean;
  appId?: string;
  onClose?: () => void;
}

export default function WxMaskShare(props: WxMaskShareProps) {
  const {
    title = document.title,
    desc = "",
    link = window.location.href,
    img,
    visible = false,
    appId,
    onClose,
  } = props;

  const { initUrl } = useFlat("appStore");

  const [init, setInit] = useState(false);
  const error = useRef(false);

  const initWxConfig = useCallback(async () => {
    const { data } = await getWechatCfg(initUrl);
    if (data) {
      wx.config({
        ...data,
        // debug: true,
        appId: appId || process.env.REACT_APP_APP_ID!,
        jsApiList: [
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "updateAppMessageShareData",
          "updateTimelineShareData",
        ],
      });
      wx.ready(() => {
        console.log("起步了");
        setInit(true);
      });
      wx.error((e) => {
        error.current = true;
        console.log("起步失败", e);
      });
    }
  }, [appId, initUrl]);

  useEffect(() => {
    if (!init || !img) return;
    const settings = {
      title,
      link: encodeURIComponent(link),
      imgUrl: img,
      desc,
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
  }, [init, title, desc, link, img]);

  useEffect(() => {
    initWxConfig();
  }, [initWxConfig]);

  if (!visible) return null;

  return createPortal(
    <div className={styles.mask} onClick={onClose}>
      <img className={styles.arrow} src={arrowImg} alt="提示" />
      <img className={styles.tip} src={tipImg} alt="箭头" />
    </div>,
    document.body
  );
}
