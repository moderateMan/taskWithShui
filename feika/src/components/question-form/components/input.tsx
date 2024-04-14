import { Input as AntdInput, InputProps } from "antd-mobile";
import cn from "classnames";

export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <AntdInput
      {...rest}
      className={cn("p-2 rounded !bg-[#F2F3F5]", className)}
    />
  );
}
