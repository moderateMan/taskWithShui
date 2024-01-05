'use client';

import { useEffect, useRef, useState } from 'react';
import * as PdfJs from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist';
import Page from './page';

// import './style.css';

type PdfJsType = typeof PdfJs;

declare global {
  interface Window {
    pdfjsLib: PdfJsType;
  }
}

function initPdfDist(): Promise<PdfJsType> {
  return new Promise((r) => {
    if (!!window.pdfjsLib) {
      r(window.pdfjsLib);
      return;
    }
    const id = 'pdf-dist';
    const existPdfDistScript = document.getElementById(id);
    if (existPdfDistScript) {
      existPdfDistScript.remove();
    }
    const pdfDistScript = document.createElement('script');
    pdfDistScript.src = '/assets/pdf-dist/build/pdf.mjs';
    pdfDistScript.id = id;
    pdfDistScript.type = 'module';
    document.head.appendChild(pdfDistScript);
    pdfDistScript.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf-dist/build/pdf.worker.mjs';
      r(window.pdfjsLib);
      console.log('wuyou pdfjs');
    };
  });
}

interface PdfViererProps {
  src: Parameters<PdfJsType['getDocument']>[0];
  onLoaded?: () => void;
  onRendered?: () => void;
  onError?: () => void;
}

const PdfViewer = ({ src }: PdfViererProps) => {
  const pdfInstance = useRef<PdfJsType>();
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [pages, setPages] = useState<PDFPageProxy[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>();

  useEffect(() => {
    initPdfDist().then((pdfJs) => {
      pdfInstance.current = pdfJs;
      setPdfjsLoaded(true);
    });
    setPageWidth(wrapperRef.current?.offsetWidth);
  }, []);

  useEffect(() => {
    const pdfJs = pdfInstance.current;
    if (!pdfJs) return;
    const loadingTask = pdfJs.getDocument(src);
    loadingTask.promise.then((pdf) => {
      const count = pdf.numPages;
      Promise.all(Array.from({ length: count }).map((_, idx) => pdf.getPage(idx + 1))).then(
        (res) => {
          setPages(res);
        }
      );
    });
    return () => {
      loadingTask.destroy();
    };
  }, [pdfjsLoaded, src]);

  return (
    <div ref={wrapperRef}>
      {pages.map((p) => (
        <Page page={p} key={p._pageIndex} width={pageWidth} />
      ))}
    </div>
  );
};
export default PdfViewer;
