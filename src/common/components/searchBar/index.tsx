import Icon from "../icons";
import { SearchBar as AntdSearchBar, SearchBarProps } from "antd-mobile";
import styles from "./index.module.scss";
import cls from "classnames";

export default function SearchBar(props: SearchBarProps) {
  const { className, placeholder, icon, ...rest } = props;
  return (
    <AntdSearchBar
      icon={icon || <Icon name="search" color="#4c5666" />}
      placeholder={placeholder || "搜索你想查看的文章"}
      className={cls(styles["search-bar"], className)}
      {...rest}
    />
  );
}
