import { Avatar } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
const menu = [
  {
    key: "myCollect",
    title: "我的收藏",
  },
  {
    key: "payHistory",
    title: "购买记录",
  },
];

export default function PersonalCenter() {
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
        <div className={styles["right"]}>
          <span>编辑</span>
          <RightOutline />
        </div>
      </div>
      {menu.map((i, idx) => (
        <div key={idx} className={styles["menu"]}>
          <span>{i.title}</span>
          <RightOutline />
        </div>
      ))}
    </div>
  );
}
