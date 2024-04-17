import { PickerProps, Picker, ButtonProps } from "antd-mobile";
import { ReactNode, cloneElement, isValidElement, useState } from "react";

export type PickerWithChildrenProps = Omit<
  PickerProps,
  "onClose" | "onConfirm" | "visible" | "children"
> & {
  children?: ReactNode | ((value: PickerProps["value"]) => ReactNode);
  onChange?: (v: PickerProps["value"]) => void;
  renderColumnItem?: PickerProps["children"];
};

export default function PickerWithTriggerElement({
  value,
  onChange,
  children,
  renderColumnItem,
  ...rest
}: PickerWithChildrenProps) {
  const [visible, setVisible] = useState(false);

  const renderChildren = () => {
    if (!children) return null;
    if (isValidElement<ButtonProps>(children))
      return cloneElement(children, {
        onClick: () => {
          setVisible(true);
        },
      });
    return (
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        {typeof children === "function" ? children(value) : children}
      </div>
    );
  };

  return (
    <>
      {renderChildren()}
      <Picker
        {...rest}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          onChange?.(v);
        }}
      >
        {renderColumnItem}
      </Picker>
    </>
  );
}
