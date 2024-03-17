import styles from "./index.module.scss";
import ScientificList from "../../common/components/scientificList";
import { useEffect } from "react";
import { useFlat } from "../../service";
import useWxShare from "../../common/hooks/useWxShare";

export default function MyCollection() {
  const { getCollectList, collectList } = useFlat("myCollectionStore");
  useWxShare();
  useEffect(() => {
    getCollectList();
  }, []);
  return (
    <div className={styles["my-collection"]}>
      <ScientificList showPrice={false} data={collectList} />
    </div>
  );
}
