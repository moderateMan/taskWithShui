import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";
import { useFlat } from "../../service";
import { useEffect } from "react";

export default function ReadScientific() {
  const { search, data, setSearch, getCourseList } = useFlat(
    "readScientificStore"
  );

  const getList = (search?: string) => {
    getCourseList({
      page: { pageNo: 0, pageSize: 999 },
      criteria: { type: "ARTICLE", title: search },
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles["read-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar
          value={search}
          clearable
          onChange={setSearch}
          onClear={getList}
          onSearch={getList}
        />
      </div>
      <div className={styles["content-wrapper"]}>
        <ScientificList showPrice={false} data={data} />
      </div>
    </div>
  );
}
