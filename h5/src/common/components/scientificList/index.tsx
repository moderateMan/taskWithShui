import {
  DotLoading,
  Empty,
  Footer,
  InfiniteScroll,
  InfiniteScrollProps,
} from "antd-mobile";
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
  loadMore?: InfiniteScrollProps["loadMore"];
  hasMore?: boolean;
}

export default function ScientificList(props: ScientificListProps) {
  const { showPrice = true, data = [], loadMore, hasMore = false } = props;
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
              navigate(
                getAbsolutePath(
                  isFree
                    ? routes.scientific.pathname(course.id!)
                    : routes.pay.pathname(course.id!)
                )
              );
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
      {loadMore ? (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          {(hasMore) =>
            hasMore ? (
              <div className={styles["loading"]}>
                <span className={styles["divider-content"]}>
                  <span>加载中</span>
                  <DotLoading />
                </span>
              </div>
            ) : (
              <Footer label="到底了~" className={styles["footer"]}></Footer>
            )
          }
        </InfiniteScroll>
      ) : (
        <Footer label="到底了~" className={styles["footer"]}></Footer>
      )}
    </div>
  );
}
