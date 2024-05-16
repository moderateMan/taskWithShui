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
        data: series.map((item) => item.name),
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        bottom: 0,
        top: 40,
        left: 20,
        containLabel: true,
      },
      yAxis: {
        data: names,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30,
          },
        },
      },
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        max: 4,
      },
      series: series.map((item) => ({
        ...item,
        data: item.data.map((value) => ({
          value,
          symbol:
            "path://M8 42h27.833v-8S41 20.582 42 18c1-2.582-.5-5.335-4-5c-3.5.335-6.889 8.33-6.889 8.33S30.5 13 30 10.5S29 4 19.306 4C9.61 4 8 11.12 8 15z",
        })),
        barGap: "10%",
        type: "pictorialBar",
        symbolRepeat: true,
        symbolClip: true,
        symbolSize: 20,
        label: {
          show: true,
          position: "right",
          offset: [10, 0],
          fontSize: 16,
        },
      })),
    });
    return () => chart.dispose();
  }, [names, series]);

  return <div ref={barRef} className={className} style={style} />;
}
