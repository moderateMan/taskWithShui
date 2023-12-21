import { Input as AntdInput, InputProps } from "antd-mobile";
import styles from "./index.module.scss";
import cls from "classnames";

export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return <AntdInput className={cls(styles["input"], className)} {...rest} />;
}
