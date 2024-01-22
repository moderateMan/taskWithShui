import styles from "./index.module.scss";
import PayList from "./components/payList";

export default function PayHistory() {
  return (
    <div className={styles["pay-history"]}>
      <PayList />
    </div>
  );
}
