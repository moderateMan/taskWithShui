import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

export interface ICardProps {
  isNew?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  cover?: string;
  name?: string;
  glove?: string;
}

export const Card = (props: ICardProps) => {
  const { isNew, children, className, style, cover, name, glove } = props;
  return (
    <div
      className={cn(
        "bg-[#F2F2F2] flex flex-col rounded-[1.25rem] relative group",
        className
      )}
      style={style}
    >
      {isNew && (
        <i className="inline-block text-white text-sm font-arialblack not-italic bg-[#6AA442] absolute -top-3 right-11 px-[0.625rem] py-[0.125rem]">
          NEW
        </i>
      )}
      <img
        className="w-24 h-40 absolute -right-10 top-[calc(50%-6rem)] group-hover:scale-110 transition-transform duration-300"
        src={glove}
      ></img>
      <div className="flex-1 py-[0.9375rem] px-[10%]">
        <img className="h-32 w-full mb-[0.9375rem]" src={cover}></img>
        <span className="font-arialblack text-lg text-[#2D2A27]">{name}</span>
      </div>
      {children}
    </div>
  );
};
