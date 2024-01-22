import { Footer, Tag } from "antd-mobile";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../../../router";

export default function PayList() {
  const navigate = useNavigate();

  const toReview = (id: string | number) => {
    navigate(getAbsolutePath(routes.review.pathname(id)));
  };

  const options = {
    true: {
      border: "rgb(253,226,220)",
      text: "#F46D4F",
      content: "已评价",
      onClick: toReview,
    },
    false: {
      border: "rgb(215, 225, 253)",
      text: "#3166f5",
      content: "去评价",
      onClick: toReview,
    },
  };

  return (
    <div className={styles["pay-list"]}>
      {new Array(10).fill(1).map((_, idx) => {
        const did = String(idx % 2 === 0) as "true" | "false";
        return (
          <div
            className={styles["item"]}
            key={idx}
            onClick={() => {
              navigate(getAbsolutePath(routes.scientific.pathname(idx)));
            }}
          >
            <img
              src="https://img.zcool.cn/community/0104c15cd45b49a80121416816f1ec.jpg@1280w_1l_2o_100sh.jpg"
              className={styles["cover-img"]}
            />
            <div className={styles["content"]}>
              <h3 className={styles["title"]}>
                浅析未来的5至10年不同领域的CAR-T技术的研究进展及应用趋势
              </h3>
              <div className={styles["content-footer"]}>
                <span className={styles["time"]}>2022.09.28 20:00</span>
                <Tag
                  fill="outline"
                  className={styles["review"]}
                  style={{
                    "--border-color": options[did].border,
                    "--text-color": options[did].text,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    options[did]?.onClick?.(idx);
                  }}
                >
                  {options[did].content}
                </Tag>
              </div>
            </div>
          </div>
        );
      })}
      <Footer label="到底了~" className={styles["footer"]}></Footer>
    </div>
  );
}
