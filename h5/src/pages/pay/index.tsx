import { useLoaderData, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import {
  HeartFill,
  HeartOutline,
  LockOutline,
  SendOutline,
} from "antd-mobile-icons";
import { Avatar, Button, Footer, Rate, SpinLoading } from "antd-mobile";
import cls from "classnames";
import { share } from "../../common/components/wxShare";
import { useFlat } from "../../service";
import { useEffect, useState } from "react";
import { collect, createOrder, prepay, uncollect } from "../../common/apis";
import { LoaderDataType, getAbsolutePath, routes } from "../../router";
import { pay } from "../../common/utils/wechat-pay";
import { error, success } from "../../common/utils/toast";

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
        <hr className={styles["hr"]} />
        <h3 className={cls(styles["sub"], styles["title"])}>评价</h3>
        <div className={styles["list"]}>
          {detail?.commentList.map((comment) => (
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
                      {dayjs(comment.modifyTime).format("YYYY-MM-DD")}
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
        </div>
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
