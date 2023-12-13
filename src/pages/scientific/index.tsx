import { useParams } from "react-router";
import styles from "./index.module.scss";
import { HeartFill, HeartOutline, SendOutline } from "antd-mobile-icons";
import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
import { Space, SpinLoading } from "antd-mobile";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const url = new URL("../../assets/test.pdf", import.meta.url).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};
export default function Scientific() {
  const params = useParams();

  const [numPages, setNumPages] = useState<number>();
  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
    },
    {
      title: "收藏",
      icon:
        Number(params?.id) % 2 === 0 ? (
          <HeartOutline className={styles["icon"]} />
        ) : (
          <HeartFill className={styles["icon"]} color="#f04859" />
        ),
    },
  ];
  return (
    <div className={styles["scientific"]}>
      <div className={styles["header"]}>
        <h3 className={styles["title"]}>
          浅析未来的5至10年不同领域的CAR-T技术的研究进展及应用趋势
        </h3>
        <div className={styles["desc"]}>
          <span className={styles["label"]}>文献价格：</span>
          <span className={styles["price"]}>20元</span>
        </div>
      </div>
      <div className={styles["content"]}>
        <Document
          file={url}
          className={styles["pdf"]}
          options={options}
          onLoadSuccess={(doc) => {
            setNumPages(doc.numPages);
          }}
          loading={
            <Space
              direction="vertical"
              align="center"
              className={styles["loading"]}
            >
              <SpinLoading />
              <span>加载中...</span>
            </Space>
          }
        >
          {Array.from(new Array(numPages), (_, idx) => (
            <Page
              key={`page_${idx + 1}`}
              pageNumber={idx + 1}
              width={window.innerWidth}
            />
          ))}
        </Document>
      </div>
      <div className={styles["footer"]}>
        {actions.map((i) => (
          <div key={i.title} className={styles["action"]}>
            {i.icon}
            {i.title}
          </div>
        ))}
      </div>
    </div>
  );
}
