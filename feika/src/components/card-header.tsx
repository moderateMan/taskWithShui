import LogoSvg from "../assets/logo.svg";
import ImgWithoutEvent from "./img-without-event";

export interface CardHeaderProps {
  title: string;
}

export default function CardHeader(props: CardHeaderProps) {
  return (
    <header className="h-[10.5rem] relative">
      <div className="h-36 w-full shadow-lg shadow-[rgba(128,180,224,0.6)] rounded-xl text-white bg-[rgb(0,185,240)] px-4 py-8">
        <h2 className="text-[1.375rem] font-bold mb-2">会员权益卡</h2>
        <span className="text-sm">{props.title}</span>
      </div>
      <ImgWithoutEvent
        src={LogoSvg}
        alt="logo"
        className="w-[42%] right-0 bottom-0"
        style={{ position: "absolute" }}
      />
    </header>
  );
}
