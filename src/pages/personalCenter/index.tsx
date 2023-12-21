import { Avatar } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../router";

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
  return (
    <div className={styles["personal-center"]}>
      <div className={styles["header"]}>
        <div className={styles["left"]}>
          <Avatar
            src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            className={styles["avatar"]}
          />
          <span className={styles["name"]}>张启明</span>
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
