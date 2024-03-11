import { Tabs } from "antd-mobile";
import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";
import { Course, CourseType, getList } from "../../common/apis";
import { useFlat } from "../../service";
import { useEffect, useMemo, useRef } from "react";
import useLoadPage, {
  FetchPageType,
  isFinishFunctionType,
} from "../../common/hooks/useLoadPage";

const tabItems = [
  {
    key: CourseType.PAID_COURSE,
    title: "付费文献",
  },
  {
    key: CourseType.FREE_COURSE,
    title: "免费文献",
  },
];

const createFetchPageFunctionByCategory: (
  category: CourseType
) => FetchPageType<{ search?: string }, Course> =
  (category) =>
  ({ pageSize, current, search }) =>
    getList({
      page: { pageNo: current, pageSize: pageSize },
      criteria: {
        type: "COURSE",
        title: search,
        category,
      },
    }).then(
      ({ data }) =>
        data && {
          data: data.list,
          current: data.pageable.pageNo,
          count: data.count,
          pageSize: data.pageable.pageSize,
        }
    );

const isFinish: isFinishFunctionType<Course> = ({ pageSize, current, count }) =>
  pageSize * (current + 1) >= count;

export default function LearnScientific() {
  const { search, setSearch, type, setType } = useFlat("learnScientificStore");

  const free = useLoadPage(
    createFetchPageFunctionByCategory(CourseType.FREE_COURSE),
    { isFinish }
  );
  const paid = useLoadPage(
    createFetchPageFunctionByCategory(CourseType.PAID_COURSE),
    { isFinish }
  );

  const page = useMemo(() => {
    if (type === CourseType.FREE_COURSE) {
      return free;
    }
    if (type === CourseType.PAID_COURSE) {
      return paid;
    }
  }, [type, free, paid]);

  useEffect(() => {
    page?.reload({ search });
  }, [type]);

  const loadMore = page?.loadPage && (() => page.loadPage({ search }));

  return (
    <div className={styles["learn-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar
          value={search}
          clearable
          onClear={() => page?.reload?.({})}
          onSearch={(value) => page?.reload?.({ search: value })}
          onChange={setSearch}
        />
      </div>
      <div className={styles["tabs-wrapper"]}>
        <Tabs
          activeKey={type}
          className={styles["tabs"]}
          stretch={false}
          onChange={(key) => setType(key as CourseType)}>
          {tabItems.map((item) => (
            <Tabs.Tab
              className={styles["tab"]}
              title={item.title}
              key={item.key}
              destroyOnClose>
              <ScientificList
                data={page?.data}
                loadMore={loadMore}
                hasMore={page ? !page.isFinish : false}
              />
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
