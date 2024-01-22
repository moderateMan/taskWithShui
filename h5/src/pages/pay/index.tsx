import { useParams } from "react-router";
import styles from "./index.module.scss";
import {
  HeartFill,
  HeartOutline,
  LockOutline,
  SendOutline,
} from "antd-mobile-icons";
import { Avatar, Button, Footer, Rate } from "antd-mobile";
import cls from "classnames";
import WxShare, { share } from "../../common/components/wxShare";

export default function Pay() {
  const params = useParams();
  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
      onClick: share,
    },
    {
      title: "收藏",
      icon:
        Number(params?.id) % 2 === 0 ? (
          <HeartOutline className={styles["icon"]} color="#000000" />
        ) : (
          <HeartFill className={styles["icon"]} color="#f04859" />
        ),
      onClick: () => {},
    },
  ];
  return (
    <div className={styles["pay"]}>
      <div className={styles["wrapper"]}>
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
            <img
              src="https://img.zcool.cn/community/0104c15cd45b49a80121416816f1ec.jpg@1280w_1l_2o_100sh.jpg"
              className={styles["img"]}
            />
            <div className={styles["mask"]}>
              <Button className={styles["lock-btn"]}>
                <LockOutline />
                购买后查看全部文献
              </Button>
            </div>
          </div>
        </div>
        <hr className={styles["hr"]} />
        <h3 className={cls(styles["sub"], styles["title"])}>评价</h3>
        <div className={styles["list"]}>
          {[1, 2, 3, 4].map((i, idx) => (
            <div className={styles["review"]} key={idx}>
              <div className={styles["profile"]}>
                <div className={styles["left"]}>
                  <Avatar
                    src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    className={styles["avatar"]}
                  />
                  <div className={styles["info"]}>
                    <span className={styles["name"]}>高先生</span>
                    <span className={styles["time"]}>2023-06-08</span>
                  </div>
                </div>
                <div className={styles["right"]}>
                  <Rate
                    className={styles["stars"]}
                    readOnly
                    count={5}
                    value={5}
                  />
                  <span className={styles["score"]}>5.0</span>
                  <span className={styles["unit"]}>分</span>
                </div>
              </div>
              <p className={styles["text"]}>
                视频挺好的，教学非常专业，老师专业度也很高，学习了一段时间发现提高非常多
              </p>
            </div>
          ))}
          <Footer label="到底了~" className={styles["end"]}></Footer>
        </div>
      </div>
      <div className={styles["footer"]}>
        {actions.map((i) => (
          <div key={i.title} className={styles["action"]} onClick={i.onClick}>
            {i.icon}
            {i.title}
          </div>
        ))}
        <Button className={styles["pay-btn"]}>立即购买</Button>
      </div>
    </div>
  );
}
