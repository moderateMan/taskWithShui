import { Input as AntdInput, InputProps as AntdInputProps } from "antd-mobile";
import cls from "classnames";
import { ReactNode } from "react";

export type InputProps = AntdInputProps & {
  suffix?: ReactNode;
  error?: string;
};

export default function Input({
  className,
  style,
  suffix,
  error,
  onClick,
  ...rest
}: InputProps) {
  return (
    <div
      className={cls(
        "border  border-solid p-[12px] rounded-[8px] bg-white flex items-center",
        error ? "border-[--adm-color-primary]" : "border-[#EBC3BC]",
        className
      )}
      onClick={onClick}
    >
      <AntdInput
        {...rest}
        style={{
          "--font-size": "14px",
          "--placeholder-color": "#CCCCCC",
          ...style,
          flex: 1,
        }}
      />
      {error && (
        <span className="text-[--adm-color-primary] text-sm">{error}</span>
      )}
      {suffix}
    </div>
  );
}
