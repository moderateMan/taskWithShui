import { Footer } from "antd-mobile";
import style from "./index.module.scss";

interface ScientificListProps {
  showPrice?: boolean;
}

export default function ScientificList(props: ScientificListProps) {
  const { showPrice = true } = props;
  return (
    <div className={style["list"]}>
      {new Array(10).fill(1).map((_, idx) => (
        <div className={style["item"]} key={idx}>
          <img
            src="https://img.zcool.cn/community/0104c15cd45b49a80121416816f1ec.jpg@1280w_1l_2o_100sh.jpg"
            className={style["cover-img"]}
          />
          <div className={style["content"]}>
            <h3 className={style["title"]}>
              浅析未来的5至10年不同领域的CAR-T技术的研究进展及应用趋势
            </h3>
            <div className={style["content-footer"]}>
              <span className={style["price"]}>{showPrice && '20元'}</span>
              <span className={style["time"]}>10个小时前</span>
            </div>
          </div>
        </div>
      ))}
      <Footer label="到底了~" className={style["footer"]}></Footer>
    </div>
  );
}
