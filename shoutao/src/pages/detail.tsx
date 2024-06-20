import Bar from "@/components/bar";
import { Card } from "@/components/card";
import Pie from "@/components/pie";
// import Signal from "@/components/signal";
// import { Table } from "@/components/table";
// import { createRadomColorFactory } from "@/lib/utils";
import { useCompareSotre } from "@/store/layout";
import { useMemo } from "react";
// import { Link } from "react-router-dom";

// const colorFactory = createRadomColorFactory();
const colors = ["#4978b9", "#7cb253", "#ece0be", "#3a3a3b"];

export default function Detail() {
  const { compareData } = useCompareSotre();

  // useEffect(() => {
  //   colorFactory.reset();
  // }, []);

  const pieData = useMemo(
    () =>
      compareData.map((i, idx) => ({
        name: i.name!,
        data: { chemical: i.chemical!, mechanical: i.mechanical! },
        color: colors[idx % colors.length],
      })),
    [JSON.stringify(compareData)]
  );

  const barData = useMemo(() => {
    const map = {
      Chemical: {
        name: "Chemical",
        color: "#ff1b1b",
        data: [] as number[],
      },
      Mechanical: {
        name: "Mechanical",
        color: "#5781ca",
        data: [] as number[],
      },
    };
    compareData.forEach((i) => {
      map.Chemical.data.push(i.chemical!);
      map.Mechanical.data.push(i.mechanical!);
    });
    return [map.Chemical, map.Mechanical];
  }, [JSON.stringify(compareData)]);

  // const tableData = useMemo(
  //   () =>
  //     compareData.map((i) => ({
  //       name: i.name,
  //       chemical: Math.round(i.chemical!),
  //       mechanical: Math.round(i.mechanical!),
  //     })),
  //   [JSON.stringify(compareData)]
  // );

  return (
    // <Link to="/">Home page</Link> / <span>Contrast</span>
    <div className="flex">
      <div className="w-[25rem] bg-white rounded-[1.25rem] p-[1.875rem] flex flex-col gap-y-12 h-fit">
        {compareData.map((i) => (
          <Card
            key={i.id}
            cover={i.coverUrl}
            glove={i.gloveUrl}
            name={i.description}
            url={i.linkUrl}
          />
        ))}
      </div>
      <div className="flex-1 ml-6">
        <div className="bg-white rounded-[1.25rem] px-2 py-4 mb-5">
          <h2 className="text-xl font-bold text-center mt-2">
            Physicochemical Performance Spectrum
          </h2>
          <Pie className="w-full h-[28.75rem]" series={pieData} />
        </div>
        <div className="bg-white rounded-[1.25rem] p-6 mb-5">
          <Bar
            className="w-full"
            style={{ height: `${3.75 + 4 * compareData.length}rem` }}
            names={compareData.map((i) => i.name!)}
            series={barData}
          />
        </div>
        {/* <div className="bg-white rounded-[1.25rem] px-2 py-6">
            <Table
              columns={[
                { dataIndex: "name" },
                {
                  title: "Chemical",
                  dataIndex: "chemical",
                  render: (text: number) => <Signal value={text} />,
                },
                {
                  title: "Mechanical",
                  dataIndex: "mechanical",
                  render: (text: number) => <Signal value={text} />,
                },
              ]}
              dataSource={tableData}
            />
          </div> */}
      </div>
    </div>
  );
}
