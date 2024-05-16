import clsx from "clsx";
import * as echarts from "echarts";
import { CSSProperties, useEffect, useRef, useState } from "react";
import ChemicalImg from "../assets/chemical.png";
import MechanicalImg from "../assets/mechanical.png";
import BackgroundImg from "../assets/background.png";

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
  const [hideNames, setHideNames] = useState<string[]>([]);
  const instance = useRef<echarts.ECharts>();

  useEffect(() => {
    instance.current = echarts.init(pieRef.current!, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    instance.current.setOption({
      height: "90%",
      legend: {
        show: false,
      },
      tooltip: {
        formatter: ({ name, color }: { name: string; color: string }) => {
          const data = series.find((s) => s.name === name)?.data;
          return `<span style="color:${color};font-size:16px;font-weight:bold">${name}</span><br/>Chemical&nbsp&nbsp&nbsp&nbsp<b>${data?.chemical}</b><br/>Mechanical&nbsp&nbsp&nbsp&nbsp<b>${data?.mechanical}</b>`;
        },
      },
      series: series.map((item, idx) => {
        const radius = 100 - idx * 10;
        const left = (item.data.chemical / 4) * 90 + 90;
        const right = 90 - (item.data.mechanical / 4) * 90;
        return {
          name: item.name,
          color: item.color,
          type: "pie",
          radius: `${radius}%`,
          center: ["50%", pieRef.current!.offsetHeight - 94],
          startAngle: left,
          endAngle: right,
          data: [{ value: 1, name: item.name }],
          label: {
            show: false,
          },
          z: idx + 1,
          show: false,
        };
      }),
    });
    return () => instance.current?.dispose();
  }, [series]);

  return (
    <div className="size-full pb-6 relative px-12 -mt-12">
      <div className="absolute left-4 bottom-32 flex flex-col items-center justify-center">
        <img src={ChemicalImg} alt="" className="w-9 mb-2" />
        <span className="inline-blick border-4 border-solid rounded-[0.125rem] px-2 border-[#e63737] text-[#e25542]">
          Chemical
        </span>
      </div>
      <div className="absolute right-4 bottom-32 flex flex-col items-center justify-center">
        <img src={MechanicalImg} alt="" className="w-9 mb-2" />
        <span className="inline-blick border-4 border-solid rounded-[0.125rem] px-2 border-[#145ace] text-[#0458e3]">
          Mechanical
        </span>
      </div>
      <div
        ref={pieRef}
        className={clsx("bg-contain bg-center bg-no-repeat ", className)}
        style={{ backgroundImage: `url(${BackgroundImg})`, ...style }}
      />
      <div className="w-4/5 -mt-12 ml-[10%] flex flex-wrap justify-center gap-x-8 gap-y-2">
        {series.map((item) => (
          <i
            style={{
              backgroundColor: hideNames.includes(item.name)
                ? "#cccccc"
                : item.color,
            }}
            key={item.name}
            className="inline-block not-italic text-white text-xs px-4 py-1 rounded-xl cursor-pointer z-10"
            onClick={() =>
              setHideNames((names) => {
                if (names.includes(item.name)) {
                  instance.current?.setOption({
                    series: [
                      {
                        name: item.name,
                        data: [{ value: 1, name: item.name }],
                      },
                    ],
                  });
                  return names.filter((name) => name !== item.name);
                }
                instance.current?.setOption({
                  series: [
                    {
                      name: item.name,
                      data: [{ value: 0, name: item.name }],
                    },
                  ],
                });
                return [...names, item.name];
              })
            }
          >
            {item.name}
          </i>
        ))}
      </div>
    </div>
  );
}
