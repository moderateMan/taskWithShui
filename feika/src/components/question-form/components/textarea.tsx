import { TextArea as AntdTextArea, TextAreaProps } from "antd-mobile";
import cn from "classnames";

export default function TextArea(props: TextAreaProps) {
  const { className, ...rest } = props;
  return (
    <AntdTextArea
      {...rest}
      className={cn("p-2 rounded !bg-[#F2F3F5]", className)}
    />
  );
}
