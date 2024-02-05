import styles from "./index.module.scss";
import ScientificType from "./components/scientificType";
import { useFlat } from "../../service";
import { useEffect } from "react";
import { DotLoading, Empty, Footer, InfiniteScroll } from "antd-mobile";
import useLoadPage, { FetchPageType } from "../../common/hooks/useLoadPage";
import { Paper, getPapers } from "../../common/apis";
import isEmpty from "lodash.isempty";

const fetchPage: FetchPageType<{}, Paper> = ({ pageSize, current }) =>
  getPapers({ page: { pageNo: current, pageSize } }).then(
    ({ data }) =>
      data && {
        data: data.list,
        current: data.pageable.pageNo,
        count: data.count,
        pageSize: data.pageable.pageSize,
      }
  );

export default function WorkScientific() {
  const { userInfo } = useFlat("authStore");
  const { loadPage, data, isFinish } = useLoadPage(fetchPage, {
    isFinish: ({ pageSize, current, count }) =>
      pageSize * (current + 1) >= count,
  });

  const loadMore = () => loadPage({});

  useEffect(() => {
    loadMore();
  }, []);

  if (isEmpty(data)) return <Empty description="暂无数据" />;
  return (
    <div className={styles["work-scientific"]}>
      {data.map((i, idx) => (
        <ScientificType
          {...i}
          key={idx}
          onClick={() => {
            if (userInfo) {
              window.location.href = `https://chatbot.weixin.qq.com/webapp/eJPxVdexMCMP8JBspaJbsnZNAecIGg?openid=${
                userInfo.wechatOpenId
              }&nickname=${userInfo.nickname}&avatar=${
                userInfo.avatar
              }&robotName=${encodeURIComponent(i.name || "咨询会话")}`;
            }
          }}
        />
      ))}

      <InfiniteScroll loadMore={loadMore} hasMore={!isFinish}>
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
    </div>
  );
}
