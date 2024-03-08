import styles from "./index.module.scss";
import { Avatar, Rate, Footer, Empty } from "antd-mobile";
import dayjs from "dayjs";
import { Comment } from "../../../common/apis";

export interface CommentListProps {
  data?: Comment[];
}

export default function CommentList({ data = [] }: CommentListProps) {
  return (
    <>
      <hr className={styles["hr"]} />
      <div className={styles["list"]}>
        <h3 className={styles["title"]}>评价</h3>
        {data && data.length > 0 ? (
          <>
            {data.map((comment) => (
              <div className={styles["review"]} key={comment.id}>
                <div className={styles["profile"]}>
                  <div className={styles["left"]}>
                    <Avatar
                      src={comment.avatar || ""}
                      className={styles["avatar"]}
                    />
                    <div className={styles["info"]}>
                      <span className={styles["name"]}>
                        {comment.nickname || comment.wechatOpenId}
                      </span>
                      <span className={styles["time"]}>
                        {dayjs(comment.createTime).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                  <div className={styles["right"]}>
                    <Rate
                      className={styles["stars"]}
                      readOnly
                      count={5}
                      value={comment.rate}
                    />
                    <span className={styles["score"]}>
                      {comment.rate?.toFixed(1)}
                    </span>
                    <span className={styles["unit"]}>分</span>
                  </div>
                </div>
                <p className={styles["text"]}>{comment.comment}</p>
              </div>
            ))}
            <Footer label="到底了~" className={styles["end"]}></Footer>
          </>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
    </>
  );
}
