import { Toast } from "antd-mobile";

export function loading(text = "加载中...") {
  const loading = Toast.show({
    icon: "loading",
    content: text,
    duration: 0,
  });
  return loading.close;
}

export function error(text = "系统开小差，请稍后重试...") {
  Toast.show({
    icon: 'fail',
    content: text,
  });
}
