import { useParams } from "react-router";
import styles from "./index.module.scss";
import {
  HeartFill,
  HeartOutline,
  LockOutline,
  SendOutline,
} from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { share } from "../../common/components/wxShare";
import { useEffect, useMemo, useState } from "react";
import {
  CourseType,
  DetailData,
  collect,
  createOrder,
  getDetail,
  prepay,
  uncollect,
} from "../../common/apis";
import { pay } from "../../common/utils/wechat-pay";
import { success } from "../../common/utils/toast";
import CommentList from "../../common/components/commentList";

export default function Pay() {
  const params = useParams<{ id: string }>();

  const [initDetail, setInitDetail] = useState<DetailData>();

  const fetchDetail = () => {
    getDetail({ id: params.id }).then(({ data }) => {
      setInitDetail(data);
    });
  };

  const needToBuy = useMemo(() => {
    return (
      initDetail?.course?.category === CourseType.PAID_COURSE &&
      !initDetail?.bought
    );
  }, [initDetail?.bought, initDetail?.course?.category]);

  useEffect(() => {
    fetchDetail();
  }, []);

  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
      onClick: share,
    },
    {
      title: "收藏",
      icon: initDetail?.collect ? (
        <HeartFill className={styles["icon"]} color="#f04859" />
      ) : (
        <HeartOutline className={styles["icon"]} color="#000000" />
      ),
      onClick: () => {
        const promise = initDetail?.collect
          ? uncollect({ id: params.id })
          : collect({ courseId: params.id });
        promise.then(() => {
          setInitDetail({ ...initDetail!, collect: !initDetail?.collect });
        });
      },
    },
  ];

  const buy = async () => {
    const order = await createOrder({ courseId: initDetail?.course.id! });
    if (order.success) {
      const payload = await prepay({ orderId: order.data?.id! });
      if (payload.success) {
        const data = await pay(payload.data!);
        if (data) {
          success("支付成功");
          fetchDetail();
        }
      }
    }
  };

  return (
    <div className={styles["pay"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["scientific"]}>
          <div className={styles["header"]}>
            <h3 className={styles["title"]}>{initDetail?.course.title}</h3>
            <div className={styles["desc"]}>
              <span className={styles["label"]}>文献价格：</span>
              <span className={styles["price"]}>
                {initDetail?.course.price}元
              </span>
            </div>
          </div>
          <div
            className={styles["introduction"]}
            dangerouslySetInnerHTML={{
              __html: initDetail?.course.introductionHtml!,
            }}
          ></div>
          <div
            className={styles["detail"]}
            dangerouslySetInnerHTML={{
              __html: initDetail?.course.detailHtml!,
            }}
          ></div>
          <div className={styles["content"]}>
            <img src={initDetail?.course.cover} className={styles["img"]} />
            <div className={styles["mask"]}>
              <Button
                className={styles["lock-btn"]}
                onClick={buy}
                loading={"auto"}
                loadingText="正在支付"
              >
                {needToBuy ? (
                  <>
                    <LockOutline />
                    购买后查看全部文献
                  </>
                ) : (
                  "查看全部文献"
                )}
              </Button>
            </div>
          </div>
        </div>
        <CommentList data={initDetail?.commentList} />
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
        {needToBuy && (
          <Button
            className={styles["pay-btn"]}
            onClick={buy}
            loading={"auto"}
            loadingText="正在支付"
          >
            立即购买
          </Button>
        )}
      </div>
    </div>
  );
}
