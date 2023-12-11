import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";

export default function ReadScientific() {
  return (
    <div className={styles["read-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar />
      </div>
      <div className={styles["content-wrapper"]}>
        <ScientificList showPrice={false} />
      </div>
    </div>
  );
}
