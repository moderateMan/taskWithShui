import React, { useState, createRef, useEffect } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './demo.css';
function dataURLToBlob(dataurl: string) {
  const type = dataurl.match(/data:(.+);/)?.[1];
  ;
  const base64 = dataurl.split(',')[1];
  const binStr = atob(base64);
  const u8a = new Uint8Array(binStr.length);
  let p = binStr.length;
  while (p) {
    p--;
    u8a[p] = binStr.codePointAt(p)!;
  }
  return new Blob([u8a], { type });
}

export const Demo = ({
  name,
  src,
  onComplete,
  callRef,
}: {
  callRef: React.MutableRefObject<any>;
  onComplete: (file: File) => void;
  src: string;
  name: string;
}) => {
  const [image, setImage] = useState(src);
  const cropperRef = createRef<ReactCropperElement>();
  const onCrop = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      let dataUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      let blob = dataURLToBlob(dataUrl);
      const fileName = name || 'hello.txt';
      const file = new File([blob], fileName, { type: blob.type });
      onComplete(file);
    }
  };
  useEffect(() => {
    callRef.current = onCrop;
  }, [callRef]);
  return (
    <div>
      <div style={{ width: '100%' }}>
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: '100%' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          // preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
      </div>
      <br style={{ clear: 'both' }} />
    </div>
  );
};

export default Demo;
