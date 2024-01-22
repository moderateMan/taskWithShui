import { Empty, Footer } from "antd-mobile";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../../router";
import cls from "classnames";
import { Course, CourseType } from "../../apis";
import isEmpty from "lodash.isempty";
import dayjs from "../../utils/day";

interface ScientificListProps {
  showPrice?: boolean;
  data?: Course[];
}

export default function ScientificList(props: ScientificListProps) {
  const { showPrice = true, data = [] } = props;
  const navigate = useNavigate();

  if (isEmpty(data)) return <Empty description="暂无数据" />;
  return (
    <div className={styles["scientific-list"]}>
      {data.map((course, idx) => {
        const isFree = course.category === CourseType.FREE_COURSE;
        const time = dayjs(course.modifyTime).fromNow();
        return (
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
                search: isFree ? "free=true" : "",
              });
            }}
          >
            <img src={course.cover} className={styles["cover-img"]} />
            <div className={styles["content"]}>
              <h3 className={styles["title"]}>{course.title}</h3>
              <div className={styles["content-footer"]}>
                <span
                  className={cls(styles["price"], isFree && styles["free"])}
                >
                  {showPrice && (isFree ? "免费" : `${course.price}元`)}
                </span>
                <span className={styles["time"]}>{time}</span>
              </div>
            </div>
          </div>
        );
      })}
      <Footer label="到底了~" className={styles["footer"]}></Footer>
    </div>
  );
}
