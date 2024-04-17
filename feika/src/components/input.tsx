import { Input as AntdInput, InputProps as AntdInputProps } from "antd-mobile";
import cls from "classnames";
import { ReactNode } from "react";

export type InputProps = AntdInputProps & {
  suffix?: ReactNode;
};

export default function Input({
  className,
  style,
  suffix,
  onClick,
  ...rest
}: InputProps) {
  return (
    <div className={cls("flex items-center", className)} onClick={onClick}>
      <AntdInput
        {...rest}
        style={{
          ...style,
          flex: 1,
        }}
      />
      {suffix}
    </div>
  );
}
