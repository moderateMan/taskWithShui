import { Radio } from "antd-mobile";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";

type RadioValue = string | number;

export interface RadioGroupProps {
  options: {
    label: string;
    value: RadioValue;
    extra?: ReactNode;
  }[];
  value?: RadioValue;
  onChange?: (value: RadioValue) => void;
}

export default function RadioGroup(props: RadioGroupProps) {
  const { options, ...rest } = props;
  return (
    <Radio.Group {...rest}>
      <div className="flex flex-col">
        {options.map((option) => (
          <div className="mt-2">
            <Radio
              key={option.value}
              value={option.value}
              icon={(checked) =>
                checked ? (
                  <Icon
                    icon="akar-icons:radio-fill"
                    color="var(--adm-color-primary)"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Icon
                    icon="akar-icons:radio"
                    color="var(--adm-color-primary)"
                    width={16}
                    height={16}
                  />
                )
              }
            >
              <span className="text-[#737493]">{option.label}</span>
            </Radio>
            {rest.value === option.value && (
              <div className="pl-6">{option.extra}</div>
            )}
          </div>
        ))}
      </div>
    </Radio.Group>
  );
}
