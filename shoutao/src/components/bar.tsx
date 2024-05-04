import * as echarts from "echarts";
import { CSSProperties, useEffect, useRef } from "react";

export interface IBarProps {
  series?: { name: string; data: number[]; color: string }[];
  names?: string[];
  className?: string;
  style?: CSSProperties;
}

export default function Bar(props: IBarProps) {
  const { series = [], names, className, style } = props;
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(barRef.current!, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    chart.setOption({
      legend: {
        itemWidth: 40,
        itemHeight: 20,
        itemGap: 40,
        icon: "rect",
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: names,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      grid: {
        bottom: 0,
        top: 40,
      },
      series: series.map((item) => ({
        ...item,
        type: "bar",
        label: {
          show: true,
          position: "right",
          textStyle: {
            fontSize: "12px",
            color: "#333333",
          },
          formatter: "{c}",
        },
      })),
    });
    return () => chart.dispose();
  }, [names, series]);

  return <div ref={barRef} className={className} style={style} />;
}
