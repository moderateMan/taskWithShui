import { Button, ButtonProps } from "antd-mobile";
import styles from "./index.module.scss";
import { useRef } from "react";
import { stepColor } from "../../../../common/utils/color";
import { Paper } from "../../../../common/apis";

type ScientificTypeProps = Paper & {
  onClick?: ButtonProps["onClick"];
}

export default function ScientificType(props: ScientificTypeProps) {
  const { title, content, name, price, onClick } = props;
  const colorRef = useRef(stepColor());
  return (
    <div className={styles["type"]}>
      <div
        className={styles["title"]}
        style={{
          borderColor: colorRef.current[0],
          color: colorRef.current[0],
          backgroundColor: colorRef.current[1],
        }}
      >
        {name}
      </div>
      <p className={styles["desc"]} style={{ color: colorRef.current[0] }}>
        {title}
      </p>
      <p className={styles["remark"]}>{content}</p>
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
