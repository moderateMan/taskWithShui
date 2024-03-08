import { useLoaderData, useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import {
  HeartFill,
  HeartOutline,
  LockOutline,
  SendOutline,
} from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { share } from "../../common/components/wxShare";
import { useEffect, useState } from "react";
import { collect, createOrder, prepay, uncollect } from "../../common/apis";
import { LoaderDataType, getAbsolutePath, routes } from "../../router";
import { pay } from "../../common/utils/wechat-pay";
import { success } from "../../common/utils/toast";
import CommentList from "../../common/components/commentList";

export default function Pay() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { detail: initDetail } = useLoaderData() as LoaderDataType;
  const [detail, setDetail] = useState(initDetail);

  useEffect(() => {
    if (detail?.bought) {
      navigate(getAbsolutePath(routes.scientific.pathname(detail.course.id!)), {
        replace: true,
      });
    }
  }, [detail]);
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

  const buy = async () => {
    const order = await createOrder({ courseId: detail?.course.id! });
    if (order.success) {
      const payload = await prepay({ orderId: order.data?.id! });
      if (payload.success) {
        const data = await pay(payload.data!);
        if (data) {
          success("支付成功");
          navigate(
            getAbsolutePath(routes.scientific.pathname(detail.course.id!)),
            {
              replace: true,
            }
          );
        }
      }
    }
  };

  return (
    <div className={styles["pay"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["scientific"]}>
          <div className={styles["header"]}>
            <h3 className={styles["title"]}>{detail?.course.title}</h3>
            <div className={styles["desc"]}>
              <span className={styles["label"]}>文献价格：</span>
              <span className={styles["price"]}>{detail?.course.price}元</span>
            </div>
          </div>
          <div
            className={styles["introduction"]}
            dangerouslySetInnerHTML={{
              __html: detail.course.introductionHtml!,
            }}
          ></div>
          <div className={styles["content"]}>
            <img src={detail?.course.cover} className={styles["img"]} />
            <div className={styles["mask"]}>
              <Button
                className={styles["lock-btn"]}
                onClick={buy}
                loading={"auto"}
                loadingText="正在支付"
              >
                <LockOutline />
                购买后查看全部文献
              </Button>
            </div>
          </div>
        </div>
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
        <Button
          className={styles["pay-btn"]}
          onClick={buy}
          loading={"auto"}
          loadingText="正在支付"
        >
          立即购买
        </Button>
      </div>
    </div>
  );
}
