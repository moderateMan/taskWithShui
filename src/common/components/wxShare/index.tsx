import { Avatar, Popup, PopupProps } from "antd-mobile";
import { ReactElement, cloneElement, useEffect, useState } from "react";
import WxLogo from "./assets/wx.png";
import WxMomments from "./assets/moments.png";
import ReactDOM from "react-dom";
import wx from "weixin-js-sdk";
import styles from "./index.module.scss";

type WxShareProps = PopupProps & {
  target: ReactElement;
};

function WxSharePopup(props: PopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const actions = [
    {
      logo: <Avatar src={WxLogo} className={styles["wx"]} />,
      title: "分享给朋友",
      onClick: () => {
        wx.ready(() => {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: "", // 分享标题
            desc: "", // 分享描述
            link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "", // 分享图标
            success() {
              // 设置成功
              setVisible(false);
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
          //需在用户可能点击分享按钮前就先调用
          wx.updateTimelineShareData({
            title: "", // 分享标题
            link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "", // 分享图标
            success() {
              // 设置成功
              setVisible(false);
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
  return cloneElement(props.target, { onClick: share });
}

export const share = () => {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.append(container);
  ReactDOM.render(
    <WxSharePopup
      afterClose={() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
      }}
    />,
    container
  );
};
