import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";
import { useFlat } from "../../service";
import { useEffect } from "react";
import useLoadPage, { FetchPageType } from "../../common/hooks/useLoadPage";
import { Course, getList } from "../../common/apis";
import { useNavigate } from "react-router";
import { getAbsolutePath, routes } from "../../router";

const fetchPage: FetchPageType<{ search?: string }, Course> = ({
  pageSize,
  current,
  search,
}) =>
  getList({
    page: { pageNo: current, pageSize: pageSize },
    criteria: { type: "ARTICLE", title: search },
  }).then(
    ({ data }) =>
      data && {
        data: data.list,
        current: data.pageable.pageNo,
        count: data.count,
        pageSize: data.pageable.pageSize,
      }
  );

export default function ReadScientific() {
  const { search, setSearch } = useFlat("readScientificStore");
  const navigate = useNavigate();

  const { loadPage, reload, data, isFinish } = useLoadPage(fetchPage, {
    isFinish: ({ pageSize, current, count }) =>
      pageSize * (current + 1) >= count,
  });

  const loadMore = () => loadPage({ search });

  const reset = (search?: string) => reload({ search });

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className={styles["read-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar
          value={search}
          clearable
          onChange={setSearch}
          onClear={reset}
          onSearch={reset}
        />
      </div>
      <div className={styles["content-wrapper"]}>
        <ScientificList
          showPrice={false}
          data={data}
          loadMore={loadMore}
          hasMore={!isFinish}
          onClick={(course) => {
            if (course.linkUrl) {
              window.location.href = course.linkUrl;
              return;
            }
            navigate(getAbsolutePath(routes.pay.pathname(course.id!)));
          }}
        />
      </div>
    </div>
  );
}
