import * as echarts from "echarts";
import { CSSProperties, useEffect, useRef } from "react";

export interface IPieProps {
  series?: {
    name: string;
    data: {
      chemical: number;
      mechanical: number;
    };
    color: string;
  }[];
  className?: string;
  style?: CSSProperties;
}

export default function Pie(props: IPieProps) {
  const { series = [], className, style } = props;
  const pieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(pieRef.current!, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    chart.setOption({
      height: "120%",
      legend: {
        bottom: "10%",
        left: "center",
        // selectedMode: false,
      },
      series: series.map((item, idx) => {
        const radius = 100 - idx * 10;
        const left = (item.data.chemical / 4) * 90 + 90;
        const right = 90 - (item.data.mechanical / 4) * 90;
        return {
          color: item.color,
          type: "pie",
          radius: `${radius}%`,
          center: ["50%", "65%"],
          startAngle: left,
          endAngle: right,
          data: [{ value: 1, name: item.name }],
          label: {
            show: false,
          },
          z: idx + 1,
        };
      }),
      graphic: [
        {
          type: "image",
          right: "center",
          bottom: "22%",
          z: 0,
          style: {
            image: "https://www.boxuegu.com/assets/user/background1.png",
            width: 720,
            height: 480 * 1.2,
          },
        },
      ],
    });
    return () => chart.dispose();
  }, [series]);

  return <div ref={pieRef} className={className} style={style} />;
}
