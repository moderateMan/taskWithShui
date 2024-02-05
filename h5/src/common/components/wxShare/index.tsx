import { Avatar, Popup, PopupProps } from "antd-mobile";
import {
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import WxLogo from "./assets/wx.png";
import WxMomments from "./assets/moments.png";
import ReactDOM from "react-dom/client";
import wx from "weixin-js-sdk";
import styles from "./index.module.scss";
import { getWechatCfg } from "../../apis";

type WxSharePopupProps = PopupProps & {
  appId?: string;
  getShareFrendsConfig?: () => wx.IupdateAppMessageShareData;
  getShareMomentsConfig?: () => wx.IupdateTimelineShareData;
};

type WxShareProps = WxSharePopupProps & {
  target: ReactElement;
};

function WxSharePopup(props: WxSharePopupProps) {
  const { appId, getShareFrendsConfig, getShareMomentsConfig } = props;
  const [visible, setVisible] = useState(false);

  const initWxConfig = useCallback(async () => {
    const { data } = await getWechatCfg();
    if (data) {
      wx.config({
        ...data,
        appId: appId || process.env.REACT_APP_APP_ID!,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
      });
    }
  }, [appId]);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    initWxConfig();
  }, [initWxConfig]);

  const actions = [
    {
      logo: <Avatar src={WxLogo} className={styles["wx"]} />,
      title: "分享给朋友",
      onClick: () => {
        wx.ready(() => {
          const {
            title = document.title,
            desc = document
              .getElementsByTagName("meta")
              ?.namedItem("description")?.content || "",
            link = window.location.href,
            imgUrl = (
              document.querySelector<HTMLLinkElement>(
                `link[rel="shortcut icon"]`
              ) || document.querySelector<HTMLLinkElement>(`link[rel="icon"]`)
            )?.href || "",
            success,
            ...rest
          } = getShareFrendsConfig?.() || {};
          wx.updateAppMessageShareData({
            ...rest,
            title,
            desc,
            link,
            imgUrl,
            success(...args) {
              setVisible(false);
              success?.(...args);
            },
          });
        });
      },
    },
    {
      logo: <Avatar src={WxMomments} />,
      title: "分享到朋友圈",
      onClick: () => {
        wx.ready(() => {
          const {
            title = document.title,
            link = window.location.href,
            imgUrl = (
              document.querySelector<HTMLLinkElement>(
                `link[rel="shortcut icon"]`
              ) || document.querySelector<HTMLLinkElement>(`link[rel="icon"]`)
            )?.href || "",
            success,
            ...rest
          } = getShareMomentsConfig?.() || {};
          wx.updateTimelineShareData({
            ...rest,
            title,
            link,
            imgUrl,
            success(...args) {
              setVisible(false);
              success?.(...args);
            },
          });
        });
      },
    },
  ];

  return (
    <Popup
      className={styles["wx-share-popup"]}
      bodyClassName={styles["wx-share-popup-wrapper"]}
      visible={visible}
      destroyOnClose
      showCloseButton
      closeOnMaskClick
      afterClose={props.afterClose}
      onClose={() => setVisible(false)}
    >
      <h2 className={styles["title"]}>分享</h2>
      <div className={styles["actions"]}>
        {actions.map((i, idx) => (
          <div key={idx} className={styles["action"]} onClick={i.onClick}>
            {i.logo}
            <span className={styles["label"]}>{i.title}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}

export default function WxShare(props: WxShareProps) {
  const { target, ...rest } = props;
  return cloneElement(target, { onClick: () => share(rest) });
}

export const share = (props?: WxSharePopupProps) => {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.append(container);
  const root = ReactDOM.createRoot(container);
  root.render(
    <WxSharePopup
      {...props}
      afterClose={() => {
        root.unmount();
        container.remove();
      }}
    />
  );
};
