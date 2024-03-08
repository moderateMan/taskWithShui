import { useLoaderData, useParams } from "react-router";
import styles from "./index.module.scss";
import { HeartFill, HeartOutline, SendOutline } from "antd-mobile-icons";
import { useState } from "react";
import { uncollect, collect } from "../../common/apis";
import { share } from "../../common/components/wxShare";
import { LoaderDataType } from "../../router";
import CommentList from "../../common/components/commentList";

export default function Scientific() {
  const params = useParams();

  const { detail: initDetail, isFree } = useLoaderData() as LoaderDataType;
  const [detail, setDetail] = useState(initDetail);

  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
      onClick: share,
    },
    {
      title: "收藏",
      icon: detail?.collect ? (
        <HeartFill className={styles["icon"]} color="#f04859" />
      ) : (
        <HeartOutline className={styles["icon"]} color="#000000" />
      ),
      onClick: () => {
        const promise = detail?.collect
          ? uncollect({ id: params.id })
          : collect({ courseId: params.id });
        promise.then(() => {
          setDetail({ ...detail!, collect: !detail?.collect });
        });
      },
    },
  ];
  return (
    <div className={styles["scientific"]}>
      <div className={styles["header"]}>
        <h3 className={styles["title"]}>{detail.course.title}=</h3>
        {!isFree && (
          <div className={styles["desc"]}>
            <span className={styles["label"]}>文献价格：</span>
            <span className={styles["price"]}>{detail.course.price}元</span>
          </div>
        )}
      </div>
      <div className={styles["content"]}>
        <div
          className={styles["introduction"]}
          dangerouslySetInnerHTML={{
            __html: detail.course.introductionHtml!,
          }}
        ></div>
        <div
          className={styles["detail"]}
          dangerouslySetInnerHTML={{
            __html: detail.course.detailHtml!,
          }}
        ></div>
        <CommentList data={detail.commentList} />
      </div>
      <div className={styles["footer"]}>
        {actions.map((i) => (
          <div
            key={i.title}
            className={styles["action"]}
            onClick={() => i.onClick()}
          >
            {i.icon}
            {i.title}
          </div>
        ))}
      </div>
    </div>
  );
}
