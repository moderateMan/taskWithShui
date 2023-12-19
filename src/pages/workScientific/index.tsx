import styles from "./index.module.scss";
import ScientificType from "./components/scientificType";
import { useFlat } from "../../service";
import { useEffect } from "react";

export default function WorkScientific() {
  const { data, getParpers } = useFlat("workScientificStore");
  useEffect(() => {
    getParpers({ page: { pageNo: 0, pageSize: 999 } });
  }, []);
  return (
    <div className={styles["work-scientific"]}>
      {data.map((i, idx) => (
        <ScientificType {...i} key={idx} />
      ))}
    </div>
  );
}
