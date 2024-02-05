import {
  DotLoading,
  Empty,
  Footer,
  InfiniteScroll,
  InfiniteScrollProps,
  Tag,
} from "antd-mobile";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../../../router";
import { OrderListResponseData } from "../../../../common/apis";
import dayjs from "../../../../common/utils/day";
import isEmpty from "lodash.isempty";

interface IProps {
  data?: OrderListResponseData[];
  loadMore?: InfiniteScrollProps["loadMore"];
  hasMore?: boolean;
}

export default function PayList(props: IProps) {
  const { data, loadMore, hasMore = false } = props;
  const navigate = useNavigate();

  const toReview = (id: string | number) => {
    navigate(getAbsolutePath(routes.review.pathname(id)));
  };

  const options = {
    0: {
      border: "rgb(253,226,220)",
      text: "#F46D4F",
      content: "已评价",
      onClick: toReview,
    },
    1: {
      border: "rgb(215, 225, 253)",
      text: "#3166f5",
      content: "去评价",
      onClick: toReview,
    },
  };

  if (isEmpty(data)) return <Empty description="暂无数据" />;

  return (
    <div className={styles["pay-list"]}>
      {data?.map((order, idx) => {
        const commentStatus = order.commentStatus as keyof typeof options;
        return (
          <div
            className={styles["item"]}
            key={order.id}
            onClick={() => {
              navigate(getAbsolutePath(routes.scientific.pathname(idx)));
            }}
          >
            <img src={order.courseCover} className={styles["cover-img"]} />
            <div className={styles["content"]}>
              <h3 className={styles["title"]}>{order.courseTitle}</h3>
              <div className={styles["content-footer"]}>
                <span className={styles["time"]}>
                  {dayjs(order.createTime).format("YYYY-MM-DD hh:mm:ss")}
                </span>
                <Tag
                  fill="outline"
                  className={styles["review"]}
                  style={{
                    "--border-color": options[commentStatus].border,
                    "--text-color": options[commentStatus].text,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    options[commentStatus]?.onClick?.(idx);
                  }}
                >
                  {options[commentStatus].content}
                </Tag>
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
