import { ChevronDown, ChevronRight } from "lucide-react";
import { useCompareSotre } from "../store/layout";
import { useEffect } from "react";
import { fetchDictList, fetchList } from "@/api";
import { useNavigate } from "react-router";
import { Card } from "@/components/card";

export default function Home() {
  const { compareData, setCompareData } = useCompareSotre();

  const navigate = useNavigate();

  useEffect(() => {
    fetchList({ page: { pageNo: 1, pageSize: 10 }, criteria: {} }).then(
      (res) => {
        console.log(res.list);
      }
    );
    fetchDictList().then((res) => console.log(res.list));
  }, []);

  return (
    <>
      <div className="py-[1.5rem] px-[1.875rem] rounded-[1.25rem] bg-white mb-5">
        <div className=" flex justify-between items-center mb-3">
          <div className="rounded border-2 border-solid border-[#549231] text-[#549231] w-[30rem] py-[0.375rem] flex pl-3">
            <input
              type="text"
              className="flex-1 outline-none placeholder-[#666666]"
              placeholder="Search"
            />
            <button className="w-[3rem] border-l border-solid border-l-[#54923166]">
              Go
            </button>
          </div>
          <button className="rounded bg-[#F2F2F2] text-[#666666] not-italic px-2 py-1 text-sm">
            展开筛选
            <ChevronDown size={14} />
          </button>
        </div>
        <ul className="text-[#666666] text-sm flex py-5 border-b border-solid border-[#F0F0F0] ">
          <li className="text-[#222222] font-bold">Industry：</li>
          <li className="ml-6">Chemical</li>
          <li className="ml-10">Construction</li>
          <li className="ml-10">Food</li>
          <li className="ml-10">Health Care</li>
          <li className="ml-10">Life Science</li>
          <li className="ml-10">Manufacturing</li>
          <li className="ml-10">Oil&Gas</li>
          <li className="ml-10">Service</li>
        </ul>
      </div>
      <div className="p-[1.875rem] rounded-[1.25rem] bg-white grid grid-cols-3 gap-x-10">
        <Card isNew>
          <div className="bg-[#E2E2E2] flex py-3 items-center justify-center rounded-b-[1.25rem]">
            <label className="cursor-pointer inline-flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => {
                  console.log(e);
                  setCompareData([...compareData, e.target.value]);
                }}
              />
              Compare
            </label>
          </div>
        </Card>
      </div>
      {compareData.length > 0 && (
        <div className="fixed flex justify-center items-center bottom-0 right-0 w-full py-3 bg-white border-t-2 border-solid border-[#F2F2F2]">
          <div className="border border-solid border-[#F2F2F2] w-9 h-14 rounded-xl mr-2"></div>
          <div className="border border-solid border-[#F2F2F2] w-9 h-14 rounded-xl mr-3"></div>
          <span className="mr-6 text-[#2C2A26]">
            Compare your selected products
          </span>
          <button
            className="bg-[#77A14F] py-1 px-2 text-white rounded-[1.25rem] font-bold"
            onClick={() => {
              navigate("/detail");
            }}
          >
            Compare now
            <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
      )}
    </>
  );
}
