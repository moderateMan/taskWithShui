import Bar from "@/components/bar";
import { Card } from "@/components/card";
import Pie from "@/components/pie";
import Signal from "@/components/signal";
import { Table } from "@/components/table";
import { createRadomColorFactory } from "@/lib/utils";
import { useCompareSotre } from "@/store/layout";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const colorFactory = createRadomColorFactory();

export default function Detail() {
  const { compareData } = useCompareSotre();

  useEffect(() => {
    colorFactory.reset();
  }, []);

  const pieData = useMemo(
    () =>
      compareData.map((i) => ({
        name: i.name!,
        data: { chemical: i.chemical!, mechanical: i.mechanical! },
        color: colorFactory.createRadomColor(),
      })),
    [JSON.stringify(compareData)]
  );

  const barData = useMemo(() => {
    const map = {
      Chemical: {
        name: "Chemical",
        color: "#2E75B5",
        data: [] as number[],
      },
      Mechanical: {
        name: "Mechanical",
        color: "#538234",
        data: [] as number[],
      },
    };
    compareData.forEach((i) => {
      map.Chemical.data.push(i.chemical!);
      map.Mechanical.data.push(i.mechanical!);
    });
    return [map.Chemical, map.Mechanical];
  }, [JSON.stringify(compareData)]);

  const tableData = useMemo(
    () =>
      compareData.map((i) => ({
        name: i.name,
        Chemical: Math.round(i.chemical!),
        Mechanical: Math.round(i.mechanical!),
      })),
    [JSON.stringify(compareData)]
  );

  return (
    <>
      <Link to="/">Home page</Link> / <span>Contrast</span>
      <div className="flex mt-5">
        <div className="w-[25rem] bg-white rounded-[1.25rem] p-[1.875rem] flex flex-col gap-y-12">
          {compareData.map((i) => (
            <Card
              key={i.id}
              cover={i.coverUrl}
              glove={i.gloveUrl}
              name={i.name}
            />
          ))}
        </div>
        <div className="flex-1 ml-6">
          <div className="bg-white rounded-[1.25rem] px-2 py-4 mb-5">
            <Pie className="w-full min-h-[28.75rem]" series={pieData} />
          </div>
          <div className="bg-white rounded-[1.25rem] p-6 mb-5">
            <Bar
              className="w-full min-h-[21.25rem]"
              names={["PF-95IN", "TF-14BK", "PF-12WG"]}
              series={barData}
            />
          </div>
          <div className="bg-white rounded-[1.25rem] px-2 py-6">
            <Table
              columns={[
                { dataIndex: "name" },
                { title: "Chemical", dataIndex: "Chemical" },
                {
                  title: "Mechanical",
                  dataIndex: "Mechanical",
                  render: (text: number) => <Signal value={text} />,
                },
              ]}
              dataSource={tableData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
