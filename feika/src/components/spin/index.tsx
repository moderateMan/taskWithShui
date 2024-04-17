import { ReactNode } from "react";
import styles from "./index.module.scss";

export interface SpinProps {
  spinning?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Spin(props: SpinProps) {
  const { spinning = true, children, className } = props;

  if (!spinning) return children;

  return (
    <div className={className}>
      <div className={styles["loader"]}></div>
    </div>
  );
}
