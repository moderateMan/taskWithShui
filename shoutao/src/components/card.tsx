import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

export interface ICardProps {
  isNew?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Card = (props: ICardProps) => {
  const { isNew, children, className,style } = props;
  return (
    <div
      className={cn(
        "bg-[#F2F2F2] flex flex-col rounded-[1.25rem] relative",
        className
      )}
      style={style}
    >
      {isNew && (
        <i className="inline-block text-white text-sm font-arialblack not-italic bg-[#6AA442] absolute -top-3 right-11 px-[0.625rem] py-[0.125rem]">
          NEW
        </i>
      )}
      <div className="w-24 h-40 absolute -right-10 top-[calc(50%-5rem)] bg-slate-50"></div>
      <div className="flex-1 py-4 px-8">
        <div className="h-32 w-full"></div>
        <span className="font-arialblack text-lg">
          Powder-Free Nitrile Examination Gloves
        </span>
      </div>
      {children}
    </div>
  );
};
