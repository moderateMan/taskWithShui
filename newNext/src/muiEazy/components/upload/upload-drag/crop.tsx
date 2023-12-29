import 'cropperjs/dist/cropper.min.css';
import React, { createRef, useEffect, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { dataURLToBlob } from '../../../utils';
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
  const [image] = useState(src);
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
