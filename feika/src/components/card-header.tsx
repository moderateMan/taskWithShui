import ImgWithoutEvent from "./img-without-event";

import LogoImg from "../assets/logo.png";
import FigureSvg from "../assets/figure.png";

export interface CardHeaderProps {
  bg: string;
}

export default function CardHeader(props: CardHeaderProps) {
  return (
    <header className="w-full relative overflow-hidden">
      <div className="w-full h-fit text-[0]">
        <ImgWithoutEvent src={props.bg} alt="logo" className="w-full" />
      </div>
      <ImgWithoutEvent
        src={LogoImg}
        alt="logo"
        className="w-[45%] -right-[5%] -top-[5%]"
        style={{ position: "absolute" }}
      />
      <ImgWithoutEvent
        src={FigureSvg}
        alt="logo"
        className="w-[44%] right-[3%] bottom-[1.6%]"
        style={{ position: "absolute" }}
      />
    </header>
  );
}
