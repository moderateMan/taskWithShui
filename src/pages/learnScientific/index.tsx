import { Tabs } from "antd-mobile";
import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";

const tabItems = [
  {
    key: "pay",
    title: "付费文献",
  },
  {
    key: "free",
    title: "免费文献",
  },
];

export default function LearnScientific() {
  return (
    <div className={styles["learn-scientific"]}>
      <div className={styles["search-bar-wrapper"]}>
        <SearchBar />
      </div>
      <div className={styles["tabs-wrapper"]}>
        <Tabs className={styles["tabs"]} stretch={false}>
          {tabItems.map((item) => (
            <Tabs.Tab
              className={styles["tab"]}
              title={item.title}
              key={item.key}
              destroyOnClose
            >
              <ScientificList />
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
