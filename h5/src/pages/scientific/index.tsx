import { useLoaderData, useLocation, useParams } from "react-router";
import styles from "./index.module.scss";
import { HeartFill, HeartOutline, SendOutline } from "antd-mobile-icons";
import { pdfjs, Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import { Space, SpinLoading } from "antd-mobile";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useFlat } from "../../service";
import { uncollect, collect } from "../../common/apis";
import { share } from "../../common/components/wxShare";
import { LoaderDataType } from "../../router";

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
  const { detail: initDetail, isFree } = useLoaderData() as LoaderDataType;
  const [detail, setDetail] = useState(initDetail);

  const actions = [
    {
      title: "分享",
      icon: <SendOutline className={styles["icon"]} color="#000000" />,
      onClick: share,
    },
    {
      title: "收藏",
      icon: detail?.collect ? (
        <HeartFill className={styles["icon"]} color="#f04859" />
      ) : (
        <HeartOutline className={styles["icon"]} color="#000000" />
      ),
      onClick: () => {
        const promise = detail?.collect
          ? uncollect({ id: params.id })
          : collect({ courseId: params.id });
        promise.then(() => {
          setDetail({ ...detail!, collect: !detail?.collect });
        });
      },
    },
  ];
  return (
    <div className={styles["scientific"]}>
      <div className={styles["header"]}>
        <h3 className={styles["title"]}>
          {detail.course.title}=
        </h3>
        {!isFree && (
          <div className={styles["desc"]}>
            <span className={styles["label"]}>文献价格：</span>
            <span className={styles["price"]}>{detail.course.price}元</span>
          </div>
        )}
      </div>
      <div
        className={styles["content"]}
        dangerouslySetInnerHTML={{ __html: detail.course.detailHtml! }}
      >
        {/* <Document
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
        </Document> */}
      </div>
      <div className={styles["footer"]}>
        {actions.map((i) => (
          <div
            key={i.title}
            className={styles["action"]}
            onClick={() => i.onClick()}
          >
            {i.icon}
            {i.title}
          </div>
        ))}
      </div>
    </div>
  );
}
