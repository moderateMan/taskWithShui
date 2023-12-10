import { SearchBar, Tabs } from "antd-mobile";
import styles from "./index.module.scss";
import Icon from "../../common/components/icons";
import List from "./components/list";

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
        <SearchBar
          icon={<Icon name="search" color="#4c5666" />}
          placeholder="搜索你想查看的文章"
          className={styles["search-bar"]}
        />
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
              <List />
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
