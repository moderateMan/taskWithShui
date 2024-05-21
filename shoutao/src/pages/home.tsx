import { ChevronDown, ChevronRight } from "lucide-react";
import { useCompareSotre, usePageStore } from "../store/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "@/components/card";
import clsx from "clsx";
import { fetchDictDetail, fetchDictList, fetchList } from "@/api";
import Pagination from "@/components/pagination";

export default function Home() {
  const {
    dict,
    setDict,
    name,
    setName,
    params,
    setParams,
    expanse,
    setExpanse,
    list,
    setList,
  } = usePageStore();
  const { compareData, setCompareData } = useCompareSotre();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getDictConfig = async () => {
    const res = await fetchDictList();
    const config = await Promise.all(
      res.list.map(async (i) => {
        const detail = await fetchDictDetail(i.code);
        const children = detail.list.map((j) => ({
          label: j.value,
          value: j.code,
        }));
        return {
          label: i.value,
          value: i.code,
          children,
        };
      })
    );
    setDict(config);
  };

  const getList = (current = 1, params = {}) => {
    setLoading(true);
    setCurrent(current);
    fetchList({
      page: { pageNo: current, pageSize: 10 },
      criteria: {
        valid: 1,
        name,
        ...params,
      },
    })
      .then((res) => {
        setList(res.list);
        setTotal(res.count);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getList(1, params);
    getDictConfig();
  }, []);

  return (
    <>
      <div className="py-[1.5rem] px-[1.875rem] rounded-[1.25rem] bg-white mb-5">
        <div
          className={clsx(
            "flex justify-between items-center",
            dict.length > 0 && "mb-3"
          )}
        >
          <div className="rounded border-2 border-solid border-[#549231] text-[#549231] w-[30rem] py-[0.375rem] flex pl-3">
            <input
              type="text"
              className="flex-1 outline-none placeholder-[#666666]"
              placeholder="Search"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="w-[3rem] border-l border-solid border-l-[#54923166]"
              onClick={() => getList(current)}
            >
              Go
            </button>
          </div>
          <button
            className="rounded bg-[#F2F2F2] text-[#666666] not-italic px-2 py-1 text-sm"
            onClick={() => setExpanse(!expanse)}
          >
            {expanse ? "收起筛选" : "展开筛选"}
            <ChevronDown
              size={14}
              className={clsx(expanse && "rotate-180", "transition-transform")}
            />
          </button>
        </div>
        {dict.map(
          (i, idx) =>
            (expanse || idx === 0) && (
              <ul
                className="text-[#666666] text-sm flex py-5 border-b border-solid border-[#F0F0F0]"
                key={i.value}
              >
                <li className="text-[#222222] font-bold">{i.label}：</li>
                {i.children.map((j, idx) => (
                  <li
                    className={clsx(
                      "cursor-pointer",
                      idx === 0 ? "ml-6" : "ml-10",
                      params[i.value] === j.value && "text-[#549231] font-bold"
                    )}
                    key={j.value}
                    onClick={() => {
                      const newParams =
                        params[i.value] === j.value
                          ? { ...params, [i.value]: undefined }
                          : { ...params, [i.value]: j.value };
                      setParams(newParams);
                      getList(current, newParams);
                    }}
                  >
                    {j.label}
                  </li>
                ))}
              </ul>
            )
        )}
      </div>
      {list.length === 0 ? (
        <p className="text-[#2d2a26] mt-[8.125rem] my-[5.625rem] text-xl text-center">
          We can't seem to find the page you're looking for.
        </p>
      ) : (
        <div
          className={clsx(
            "p-[1.875rem] bg-white rounded-[1.25rem] grid grid-cols-3 gap-x-10",
            loading && "opacity-50 pointer-events-none"
          )}
        >
          {list.map((i) => (
            <Card
              key={i.id}
              cover={i.coverUrl}
              glove={i.gloveUrl}
              name={i.description}
              className="h-[18.75rem]"
            >
              <div className="bg-[#E2E2E2] flex py-2 items-center justify-center rounded-b-[1.25rem]">
                <label className="cursor-pointer inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!compareData.find((c) => c.id === i.id)}
                    onChange={() => {
                      const isExist = !!compareData.find((c) => c.id === i.id);
                      if (!isExist && compareData.length >= 4) return;
                      const newData = isExist
                        ? compareData.filter((c) => c.id !== i.id)
                        : [...compareData, i];
                      setCompareData(newData);
                    }}
                  />
                  Compare
                </label>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Pagination
        className={clsx(loading && "opacity-50 pointer-events-none", "mt-5")}
        total={total}
        current={current}
        onChange={(page) => {
          getList(page);
        }}
      />
      {compareData.length >= 2 && (
        <div className="fixed flex justify-center items-center bottom-0 right-0 w-full py-3 bg-white border-t-2 border-solid border-[#F2F2F2]">
          {compareData.map((c) => (
            <div
              className="border border-solid border-[#F2F2F2] w-9 h-14 rounded-xl mr-2"
              key={c.id}
            >
              <img src={c.gloveUrl} alt="" className="size-full object-cover" />
            </div>
          ))}
          <span className="mr-6 pl-1 text-[#2C2A26]">
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
