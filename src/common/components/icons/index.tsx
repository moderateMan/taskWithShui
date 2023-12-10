import { CSSProperties } from "react";
import loadSprite from "./loadSprite";
import cls from "classnames";
import styles from "./index.module.scss";

interface IconProps {
  name: string;
  color?: string;
  fontSize?: number | string;
  className?: string;
  style?: CSSProperties;
}

loadSprite();

export default function Icon(props: IconProps) {
  const { name, color, style, className, fontSize } = props;
  return (
    <svg
      color={color}
      style={{
        verticalAlign: "-0.125em",
        ...style,
      }}
      fontSize={fontSize}
      className={cls(styles.icon, className)}
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
    >
      <use xlinkHref={"#icon-" + name} />
    </svg>
  );
}
