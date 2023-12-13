import styles from "./index.module.scss";
import ScientificList from "../../common/components/scientificList";

export default function MyCollection() {
  return (
    <div className={styles["my-collection"]}>
      <ScientificList showPrice={false} />
    </div>
  );
}
