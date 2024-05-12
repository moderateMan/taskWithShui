import clsx from "clsx";
import { CSSProperties } from "react";

interface PaginationProps {
  className?: string;
  style?: CSSProperties;
  total?: number;
  current?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
}

const btnClassName =
  "border border-solid border-[#BFBFBF] hover:border-[#000] font-bold px-[0.3125rem] py-[0.1875rem]";

const hrefClassName = clsx(btnClassName, "text-[#525ddc] hover:underline");

export default function Pagination({
  className,
  style,
  total = 0,
  current = 1,
  pageSize = 20,
  onChange,
}: PaginationProps) {
  const size = Math.ceil(total / pageSize);
  if (total <= 0) {
    return null;
  }
  return (
    <div
      className={clsx("flex justify-center items-center gap-x-1", className)}
      style={style}
    >
      {current > 1 && (
        <button
          onClick={() => onChange && onChange(current - 1)}
          className={hrefClassName}
        >
          «
        </button>
      )}
      {Array.from({ length: size }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange && onChange(page)}
          className={clsx(
            btnClassName,
            page === current
              ? "text-[#2d2a26] cursor-text"
              : "text-[#525ddc] hover:underline"
          )}
        >
          {page}
        </button>
      ))}
      {current < size && (
        <button
          onClick={() => onChange && onChange(current + 1)}
          className={hrefClassName}
        >
          »
        </button>
      )}
    </div>
  );
}
