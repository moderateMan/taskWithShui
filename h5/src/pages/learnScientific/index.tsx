import { InfiniteScroll, Tabs } from "antd-mobile";
import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";
import { Course, CourseType } from "../../common/apis";
import { useFlat, useResetRedux } from "../../service";
import { useEffect, useRef } from "react";

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

export default function LearnScientific() {
  const {
    getCourseList,
    search,
    setSearch,
    type,
    setType,
    list,
    setList,
    reset,
  } = useFlat("learnScientificStore");
  const cacheRef = useRef<Record<CourseType, Course[]>>({
    [CourseType.PAID_COURSE]: [],
    [CourseType.FREE_COURSE]: [],
  });
  const queryList = async (type: CourseType, search?: string) => {
    setType(type);
    setSearch(search);
    /** 不是搜索状态时再显示缓存 */
    if (!search) {
      setList(cacheRef.current[type]);
    }
    const data = await getCourseList({
      page: { pageNo: 0, pageSize: 999 },
      criteria: { category: type, title: search, type: "ARTICLE" },
    });
    /** 不是搜索状态时再缓存 */
    if (!search) {
      cacheRef.current[type] = data.payload || [];
    }
  };

  useEffect(() => {
    queryList(type, search);
    return () => {
      reset();
    };
  }, []);

  return (
    <div className={styles["learn-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar
          value={search}
          clearable
          onClear={() => queryList(type)}
          onSearch={(value) => queryList(type, value)}
          onChange={setSearch}
        />
      </div>
      <div className={styles["tabs-wrapper"]}>
        <Tabs
          activeKey={type}
          className={styles["tabs"]}
          stretch={false}
          onChange={(key) => queryList(key as CourseType, search)}
        >
          {tabItems.map((item) => (
            <Tabs.Tab
              className={styles["tab"]}
              title={item.title}
              key={item.key}
              destroyOnClose
            >
              <ScientificList data={list} />
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
