import { ReactNode, useMemo, useState } from "react";
import Input from "../input";
import { CascadePickerOption, CascadePicker } from "antd-mobile";
import { useCascaderAreaData, areaList } from "@vant/area-data";
import { DownFill } from "antd-mobile-icons";
import styles from "./index.module.scss";

type ValueType = (string | number | null)[];

export interface AreaProps {
  placeholder?: string;
  value?: ValueType;
  onChange?: (
    value: ValueType,
    items: ({
      label: ReactNode;
      value: string | number;
      key?: string | number;
    } | null)[]
  ) => void;
}

export default function Area(props: AreaProps) {
  const { placeholder, value, onChange } = props;
  const [visible, setVisible] = useState(false);
  const [selfValue, setSelfValue] = useState<ValueType>();
  const areaData = useCascaderAreaData();
  const options = useMemo(() => {
    return JSON.parse(
      JSON.stringify(areaData).replaceAll("text", "label")
    ) as CascadePickerOption[];
  }, [areaData]);

  const label = useMemo<string | undefined>(() => {
    const _value = value ?? selfValue;
    if (_value) {
      const areaTotalList = {
        ...areaList.city_list,
        ...areaList.county_list,
        ...areaList.province_list,
      };
      return _value.map((i) => areaTotalList[i as string]).join("/");
    }
  }, [value, selfValue]);

  return (
    <>
      <div onClick={() => setVisible(true)} className={styles["input-wrapper"]}>
        <Input placeholder={placeholder} value={label} readOnly />
        <DownFill
          className={styles["arrow"]}
          style={{
            transform: `rotate(${visible ? 0 : "-90deg"})`,
          }}
        />
      </div>
      <CascadePicker
        title={placeholder}
        value={value ?? selfValue}
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(value, extend) => {
          onChange?.(value, extend.items);
          setSelfValue(value);
        }}
      />
    </>
  );
}

export const getNameByCode = (code: string) =>
  ({
    ...areaList.city_list,
    ...areaList.county_list,
    ...areaList.province_list,
  }[code]);

const getCodeByRecord = (name: string, record: Record<string, string>) =>
  Object.entries(record).find((i) => i[1] === name)?.[0];

export const getCodesByNameOption = (option: {
  province: string;
  city: string;
  district: string;
}) => {
  const { province, city, district } = option;
  const recordList = [
    areaList.province_list,
    areaList.city_list,
    areaList.county_list,
  ];
  return [province, city, district].map((name, idx) =>
    getCodeByRecord(name, recordList[idx])
  );
};
