import Bar from "@/components/bar";
import { Card } from "@/components/card";
import Pie from "@/components/pie";
import Signal from "@/components/signal";
import { Table } from "@/components/table";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <>
      <Link to="/">Home page</Link> / <span>Contrast</span>
      <div className="flex mt-5">
        <div className="w-[25rem] bg-white rounded-[1.25rem] p-[1.875rem]">
          <Card className="w-[20.625rem] h-[16.375rem]" />
        </div>
        <div className="flex-1 ml-6">
          <div className="bg-white rounded-[1.25rem] px-2 py-6 mb-5">
            <Pie
              className="w-full min-h-[30rem]"
              series={[
                {
                  name: "product 1",
                  data: {
                    mechanical: 3,
                    chemical: 2.2,
                  },
                  color: "#000000",
                },
                {
                  name: "product 2",
                  data: {
                    mechanical: 2,
                    chemical: 1.5,
                  },
                  color: "red",
                },
                {
                  name: "product 3",
                  data: {
                    mechanical: 1.2,
                    chemical: 0.3,
                  },
                  color: "blue",
                },
              ]}
            />
          </div>
          <div className="bg-white rounded-[1.25rem] p-6 mb-5">
            <Bar
              className="w-full min-h-[21.25rem]"
              names={["PF-95IN", "TF-14BK", "PF-12WG"]}
              series={[
                {
                  name: "Chemical",
                  color: "#2E75B5",
                  data: [120, 200, 150, 80, 70, 110, 130],
                },
                {
                  name: "Mechanical",
                  color: "#538234",
                  data: [120, 200, 150, 80, 70, 110, 130],
                },
              ]}
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
              dataSource={[
                {
                  name: "Product 1",
                  Chemical: "100",
                  Mechanical: 3,
                },
                {
                  name: "Product 2",
                  Chemical: "100",
                  Mechanical: 2,
                },
                {
                  name: "Product 3",
                  Chemical: "100",
                  Mechanical: 1,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 柱状图
 * option = {
  legend: {},
  xAxis: {
    type: 'value',
    show:false
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
    axisLine:{
      show:false
    },
    splitLine:{
      show:false
    },
    axisTick: {
      show: false
    },
  },
  series: [
    {
      name:'Chemical',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      color:"#2E75B5"
    },
    {
      name:'Mechanical',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      color:'#538234'
    }
  ]
};
 */
