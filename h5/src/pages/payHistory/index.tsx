import styles from "./index.module.scss";
import PayList from "./components/payList";
import { useEffect } from "react";
import { OrderListResponseData, getOrderList } from "../../common/apis";
import useLoadPage, { FetchPageType } from "../../common/hooks/useLoadPage";
import useWxShare from "../../common/hooks/useWxShare";

const fetchPage: FetchPageType<{}, OrderListResponseData> = ({
  pageSize,
  current,
}) =>
  getOrderList({
    page: { pageNo: current, pageSize: pageSize },
  }).then(
    ({ data }) =>
      data && {
        data: data.list,
        current: data.pageable.pageNo,
        count: data.count,
        pageSize: data.pageable.pageSize,
      }
  );

export default function PayHistory() {
  useWxShare();
  const { loadPage, reload, data, isFinish } = useLoadPage(fetchPage, {
    isFinish: ({ pageSize, current, count }) =>
      pageSize * (current + 1) >= count,
  });

  const loadMore = () => loadPage({});

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className={styles["pay-history"]}>
      <PayList data={data} reload={reload} />
    </div>
  );
}
