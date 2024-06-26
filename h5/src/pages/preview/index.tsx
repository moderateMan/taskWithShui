import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Sample.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useLoaderData, useParams } from "react-router";
import { Dialog, DotLoading } from "antd-mobile";
import { Button, Toast } from "antd-mobile";
import { AddOutline, MinusOutline } from "antd-mobile-icons";
import useWxShare from "../../common/hooks/useWxShare";
import { getTextByHtml } from "../../common/utils/html";
import { LoaderDataType, getAbsolutePath, routes } from "../../router";
import { loading } from "../../common/utils/toast";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

// type PDFFile = string | File | null;

export default function Sample() {
  const params = useParams<{ id: string }>();
  // const [file, setFile] = useState<PDFFile>("./sample.pdf");
  const { detail } = useLoaderData() as LoaderDataType;
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  useWxShare({
    img: detail?.course.cover,
    title: detail?.course.title,
    desc: getTextByHtml(detail?.course.introductionHtml),
    link:
      window.location.origin + getAbsolutePath(routes.pay.pathname(params.id!)),
  });

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    ref.current?.();
    setNumPages(nextNumPages);
  }
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = loading();
    return () => {
      ref.current?.();
    };
  }, []);
  const zoomIn = () => {
    setContainerWidth((w) => {
      if (!w) return w;
      const nw = w * 1.2;
      if (nw >= 800) {
        Toast.show({ content: "这已经是最大啦！" });
        return 800;
      }
      return nw;
    });
  };
  const zoomOut = () => {
    setContainerWidth((w) => {
      if (!w) return w;
      const nw = w * 0.8;
      const minw = containerRef?.offsetWidth || window.innerWidth;
      if (nw <= minw) {
        Toast.show({ content: "这已经是最小啦！" });
        return minw;
      }
      return nw;
    });
  };
  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={detail?.course?.mediaUrl}
            onLoadError={() => {
              ref.current?.();
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
          {/* <iframe
            src={
              "/pdfOld/web/viewer.html?file=" +
              "http://shejun-images.jefferyqjy.com/media/1709710655769_1 科研入门_20240306153555.pdf"
            }></iframe> */}
        </div>
        <div className="Example__container__actions">
          <Button
            color="primary"
            fill="none"
            shape="rounded"
            size="large"
            onClick={zoomOut}>
            <MinusOutline />
          </Button>
          <Button
            color="primary"
            fill="none"
            shape="rounded"
            size="large"
            onClick={zoomIn}>
            <AddOutline />
          </Button>
        </div>
      </div>
    </div>
  );
}
