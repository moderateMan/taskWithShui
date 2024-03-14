import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import {
  HeartFill,
  HeartOutline,
  LockOutline,
  SendOutline,
} from "antd-mobile-icons";
import { Button } from "antd-mobile";
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
import { success, warning } from "../../common/utils/toast";
import CommentList from "../../common/components/commentList";
import { useFlat } from "../../service";
import { getAbsolutePath, routes } from "../../router";
import WxMaskShare from "../../common/components/wxMaskShare";
import { getTextByHtml } from "../../common/utils/html";

export default function Pay() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setPdfUrl } = useFlat("payStore");
  const { userInfo } = useFlat("authStore");

  const [visible, setVisible] = useState(false);

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
      onClick: () => setVisible(true),
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

  const verify = () => {
    if (window.IS_DEBUG) {
      return true;
    }

    const ret =
      userInfo &&
      Object.values(userInfo).every((i) => ![null, undefined, ""].includes(i));
    if (!ret) {
      warning("请完善个人信息！");
      navigate(getAbsolutePath(routes.editProfile.pathname));
    }
    return ret;
  };

  const buy = async () => {
    debugger;
    if (!verify()) return;
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

  const view = () => {
    if (!verify()) return;
    if (initDetail?.course.mediaUrl) {
      setPdfUrl(initDetail?.course.mediaUrl);
      navigate({
        pathname: "/" + routes.pdfPreview.pathname,
      });
    } else if (initDetail?.course.linkUrl) {
      window.location.href = initDetail?.course.linkUrl;
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
          <div className={styles["content"]}>
            <img src={initDetail?.course.cover} className={styles["img"]} />
            <div className={styles["mask"]}>
              {needToBuy ? (
                <Button
                  className={styles["lock-btn"]}
                  onClick={buy}
                  loading={"auto"}
                  loadingText="正在支付"
                >
                  <LockOutline />
                  购买后查看全部文献
                </Button>
              ) : (
                <Button className={styles["lock-btn"]} onClick={view}>
                  查看全部文献
                </Button>
              )}
            </div>
          </div>
          <div
            className={styles["introduction"]}
            dangerouslySetInnerHTML={{
              __html: initDetail?.course.introductionHtml!,
            }}
          ></div>
          <h3 className={styles["title"]}>详情</h3>
          <div
            className={styles["detail"]}
            dangerouslySetInnerHTML={{
              __html: initDetail?.course.detailHtml!,
            }}
          ></div>
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
      <WxMaskShare
        img={initDetail?.course.cover}
        title={initDetail?.course.title}
        desc={getTextByHtml(initDetail?.course.introductionHtml)}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
}
