import { cn } from "@/lib/utils";
import { CSSProperties, Key, ReactNode } from "react";

export interface IColumn<T = Record<string, any>> {
  dataIndex: keyof T;
  title?: ReactNode;
  render?(value: unknown, record: T, index: number): ReactNode;
}

export interface ITableProps<T> {
  dataSource?: T[];
  columns?: IColumn<T>[];
  className?: string;
  style?: CSSProperties;
}

export const Table = <T extends Record<string, any> = any>(
  props: ITableProps<T>
) => {
  const { columns = [], dataSource = [], className, style } = props;
  return (
    <table style={style} className={cn("", className)}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.dataIndex as Key}
              className="w-60 h-10 text-left border border-[#EDEDED] leading-10 px-4"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, index) => (
          <tr key={index}>
            {columns.map((column) => {
              return (
                <td
                  key={column.dataIndex as Key}
                  className="w-60 h-10 border border-[#EDEDED] leading-10 px-4"
                >
                  {column.render?.(record[column.dataIndex], record, index) ??
                    record[column.dataIndex]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
