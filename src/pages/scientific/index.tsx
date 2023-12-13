import { useParams } from "react-router";
import styles from "./index.module.scss";
import { HeartFill, HeartOutline, SendOutline } from "antd-mobile-icons";

export default function Scientific() {
  const params = useParams();
  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
    },
    {
      title: "收藏",
      icon:
        Number(params?.id) % 2 === 0 ? (
          <HeartOutline className={styles["icon"]} />
        ) : (
          <HeartFill className={styles["icon"]} color="#f04859" />
        ),
    },
  ];
  return (
    <div className={styles["scientific"]}>
      <div className={styles["header"]}>
        <h3 className={styles["title"]}>
          浅析未来的5至10年不同领域的CAR-T技术的研究进展及应用趋势
        </h3>
        <div className={styles["desc"]}>
          <span className={styles["label"]}>文献价格：</span>
          <span className={styles["price"]}>20元</span>
        </div>
      </div>
      <div className={styles["content"]}>
        <iframe
          src="http://127.0.0.1:8888/test.pdf"
          className={styles["pdf"]}
        ></iframe>
      </div>
      <div className={styles["footer"]}>
        {actions.map((i) => (
          <div key={i.title} className={styles["action"]}>
            {i.icon}
            {i.title}
          </div>
        ))}
      </div>
    </div>
  );
}
