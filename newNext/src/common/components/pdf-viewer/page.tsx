import { PDFPageProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

interface CanvasRenderProps {
  page: PDFPageProxy;
  width?: number;
}

export default function Page(props: CanvasRenderProps) {
  const { page, width } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const textRef = useRef<HTMLDivElement>(null);

  // const [scale, setScale] = useState(1);

  useEffect(() => {
    if (canvasRef.current) {
      const originViewpoart = page.getViewport({ scale: 1 });
      const scale = width ? width / originViewpoart.width : 1;
      const renderViewport = page.getViewport({ scale: scale * (window.devicePixelRatio || 1) });
      // setScale(scale);
      const viewport = page.getViewport({ scale: scale });
      const context = canvasRef.current.getContext('2d')!;
      canvasRef.current.height = renderViewport.height;
      canvasRef.current.width = renderViewport.width;
      canvasRef.current.style.width = `${Math.floor(viewport.width)}px`;
      canvasRef.current.style.height = `${Math.floor(viewport.height)}px`;
      const renderContext = {
        canvasContext: context,
        viewport: renderViewport,
      };
      const renderTask = page.render(renderContext);

      // const textContentSource = page.streamTextContent({ includeMarkedContent: true });
      // const parameters = {
      //   container: textRef.current!,
      //   textContentSource,
      //   viewport,
      // };

      // window.pdfjsLib.renderTextLayer(parameters);
      return () => renderTask.cancel();
    }
  }, [page]);
  return (
    // <div className="pdf-page">
    <canvas ref={canvasRef}></canvas>
    //   <div ref={textRef} className="page-text" style={{ '--scale-factor': scale }}></div>
    // </div>
  );
}
