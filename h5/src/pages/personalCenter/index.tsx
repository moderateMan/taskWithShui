import { Avatar } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../router";
import { useFlat } from "../../service";
import { useEffect } from "react";
import { getCurrentUserInfo } from "../../common/apis";

export default function PersonalCenter() {
  const navigate = useNavigate();
  const menu = [
    {
      key: getAbsolutePath(routes.myCollection.pathname),
      title: routes.myCollection.title,
    },
    {
      key: getAbsolutePath(routes.payHistory.pathname),
      title: routes.payHistory.title,
    },
  ];

  const { userInfo } = useFlat("authStore");

  useEffect(() => {
    getCurrentUserInfo().then((res) => {
      console.log(res, "wuyou");
    });
  }, []);

  return (
    <div className={styles["personal-center"]}>
      <div className={styles["header"]}>
        <div className={styles["left"]}>
          <Avatar src={userInfo?.avatar || ""} className={styles["avatar"]} />
          <span className={styles["name"]}>
            {userInfo?.nickname || userInfo?.wechatOpenId}
          </span>
        </div>
        <div
          className={styles["right"]}
          onClick={() => navigate(getAbsolutePath(routes.editProfile.pathname))}
        >
          <span>编辑</span>
          <RightOutline />
        </div>
      </div>
      {menu.map((i) => (
        <div
          key={i.key}
          className={styles["menu"]}
          onClick={() => navigate(i.key)}
        >
          <span>{i.title}</span>
          <RightOutline />
        </div>
      ))}
    </div>
  );
}
