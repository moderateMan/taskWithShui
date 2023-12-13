import { Footer } from "antd-mobile";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../../router";
import cls from "classnames";

interface ScientificListProps {
  showPrice?: boolean;
  price?: number;
}

export default function ScientificList(props: ScientificListProps) {
  const { showPrice = true, price = 0 } = props;
  const navigate = useNavigate();
  const isFree = price === 0;
  return (
    <div className={styles["scientific-list"]}>
      {new Array(10).fill(1).map((_, idx) => (
        <div
          className={styles["item"]}
          key={idx}
          onClick={() => {
            navigate({
              pathname: getAbsolutePath(
                isFree
                  ? routes.scientific.pathname(idx)
                  : idx % 2 === 0
                  ? routes.pay.pathname(idx)
                  : routes.scientific.pathname(idx)
              ),
              search: isFree ? 'free=true' : "",
            });
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
              <span className={cls(styles["price"], isFree && styles["free"])}>
                {showPrice && (isFree ? "免费" : `${price}元`)}
              </span>
              <span className={styles["time"]}>10个小时前</span>
            </div>
          </div>
        </div>
      ))}
      <Footer label="到底了~" className={styles["footer"]}></Footer>
    </div>
  );
}
