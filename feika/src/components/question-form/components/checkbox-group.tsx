import { Checkbox } from "antd-mobile";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";

type CheckboxValue = string | number;

export interface CheckboxGroupProps {
  options: {
    label: string;
    value: CheckboxValue;
    extra?: ReactNode;
  }[];
  value?: CheckboxValue[];
  onChange?: (value?: CheckboxValue[]) => void;
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
  const { options, ...rest } = props;
  return (
    <Checkbox.Group {...rest}>
      {options.map((option) => (
        <div className="mt-2">
          <Checkbox
            key={option.value}
            value={option.value}
            icon={(checked) =>
              checked ? (
                <Icon
                  icon="mingcute:checkbox-fill"
                  color="var(--adm-color-primary)"
                  width={16}
                  height={16}
                />
              ) : (
                <Icon
                  icon="mingcute:square-line"
                  color="var(--adm-color-primary)"
                  width={16}
                  height={16}
                />
              )
            }
          >
            <span className="text-[#737493]">{option.label}</span>
          </Checkbox>
          {rest.value?.includes(option.value) && (
            <div className="pl-6">{option.extra}</div>
          )}
        </div>
      ))}
    </Checkbox.Group>
  );
}
