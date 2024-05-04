export interface ISignalProps {
  value?: number;
  className?: string;
  color?: [string, string];
}

export default function Signal(props: ISignalProps) {
  const { className, color, value = 0 } = props;
  const [activeColor = "#2E75B5", disableColor = "#EFEFEF"] = color || [];
  const _value = parseInt(value.toString());
  const count = _value < 0 ? 0 : _value > 4 ? 4 : _value;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      className={className}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M${2 + i * 7} 28v-${4 + 6 * (i + 1)}`}
          color={i + 1 <= count ? activeColor : disableColor}
        />
      ))}
    </svg>
  );
}
