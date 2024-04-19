import { useEffect, useState } from "react";
import { getDeclareInfo } from "../api";

export default function Declare() {
  const [innerHtml, setInnerHtml] = useState("");

  useEffect(() => {
    getDeclareInfo().then((data) => {
      setInnerHtml(data?.contentHtml);
    });
  }, []);
  return <div className="px-3" dangerouslySetInnerHTML={{ __html: innerHtml }}></div>;
}
