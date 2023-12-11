import { Button, ButtonProps } from "antd-mobile";
import styles from "./index.module.scss";

interface ScientificTypeProps {
  mainColor: string;
  subColor: string;
  title: string;
  desc: string;
  remark: string;
  price: string;
  onClick?: ButtonProps["onClick"];
}

export default function ScientificType(props: ScientificTypeProps) {
  const { mainColor, subColor, title, desc, remark, price, onClick } = props;
  return (
    <div className={styles["type"]}>
      <div
        className={styles["title"]}
        style={{
          borderColor: mainColor,
          color: mainColor,
          backgroundColor: subColor,
        }}
      >
        {title}
      </div>
      <p className={styles["desc"]} style={{ color: mainColor }}>
        {desc}
      </p>
      <p className={styles["remark"]}>{remark}</p>
      <p className={styles["price"]}>
        <span className={styles["number"]}>¥ {price}</span>
        <span className={styles["unit"]}> /字 起</span>
      </p>
      <Button className={styles["button"]} onClick={onClick}>
        选择
      </Button>
    </div>
  );
}
