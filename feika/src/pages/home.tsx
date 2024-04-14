import CardHeader from "../components/card-header";
import ImgWithoutEvent from "../components/img-without-event";

import NewsIcon from "../assets/news.svg";
import BookIcon from "../assets/book.svg";
import RedPacketImg from "../assets/red-packet.png";
import { useEffect, useState } from "react";
import { ParamListResponseData, getConfigList } from "../api";

export default function Home() {
  const [config, setConfig] = useState<ParamListResponseData[]>([]);

  useEffect(() => {
    getConfigList().then((res) => {
      setConfig(res.list);
    });
  }, []);

  const couponLink = config.find((item) => item.code === "COUPON_LINK")?.value;
  const productInfo = config.find(
    (item) => item.code === "PRODUCT_INFO"
  )?.value;
  const untritionKnowledge = config.find(
    (item) => item.code === "NUTRITION_KNOWLEDGE"
  )?.value;
  const adVedioUrl = config.find((item) => item.code === "AD_VIDEO_URL")?.value;

  return (
    <div className="size-full flex flex-col">
      <div className="flex-1">
        <CardHeader title="会员专属权益" />
        <div className="w-full px-4 mt-2">
          <button
            className="w-full bg-[#FFC726] rounded align-center text-base shadow-lg shadow-[rgba(229,177,26,0.32)] text-white flex justify-center items-center"
            onClick={() => {
              if (couponLink) {
                window.location.href = couponLink;
              }
            }}
          >
            <ImgWithoutEvent
              src={RedPacketImg}
              alt="icon"
              className="w-8 h-10"
            />
            确认领取电子优惠券
          </button>
        </div>
        <div className="w-full border border-solid border-[#ECE9EB] rounded-lg flex justify-around py-4 text-sm mt-10">
          <div
            className="flex flex-col items-center"
            role="button"
            onClick={() => {
              if (productInfo) {
                window.location.href = productInfo;
              }
            }}
          >
            <div className="bg-[linear-gradient(140deg,rgba(58,149,232,0.8),#0063BE)] rounded-xl w-11 h-11 flex justify-center items-center">
              <ImgWithoutEvent src={NewsIcon} alt="icon" />
            </div>
            <span className="mt-2">产品资讯</span>
          </div>
          <div
            className="flex flex-col items-center"
            role="button"
            onClick={() => {
              if (untritionKnowledge) {
                window.location.href = untritionKnowledge;
              }
            }}
          >
            <div className="bg-[linear-gradient(140deg,rgba(58,149,232,0.8),#0063BE)] rounded-xl w-11 h-11 flex justify-center items-center">
              <ImgWithoutEvent src={BookIcon} alt="icon" />
            </div>
            <span className="mt-2">营养科普</span>
          </div>
        </div>
      </div>
      {adVedioUrl && (
        <footer className="w-full flex flex-col items-center text-[#737493] px-4">
          <video
            src={adVedioUrl}
            className="w-full rounded"
            autoPlay
            loop
            muted
            controls
          />
          <span className="mt-2">费费带你360°参观费卡华瑞特医食品生产线</span>
        </footer>
      )}
    </div>
  );
}
