import { upload } from "../../../api";
import cn from "classnames";
import { CircleX, Plus } from "lucide-react";
import { CSSProperties, useRef, useState } from "react";
import { error } from "../../../utils/toast";
import ImgWithoutEvent from "../../img-without-event";
import { Mask } from "antd-mobile";

export interface UploadProps {
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Upload(props: UploadProps) {
  const { className, value, onChange, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);

  const uploadRequest = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      return error("文件大小不能超过2M");
    }
    const formData = new FormData();
    formData.append("file", file);
    const plyload = {
      type: file.type,
      file: formData,
    };
    upload(plyload)
      .then((res) => {
        onChange?.(res);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  return (
    <div
      {...rest}
      className={cn(
        className,
        "relative size-[4.5rem] rounded border-2 border-solid border-[#E5E6EB]cursor-pointer flex justify-center items-center flex-col text-[#737493] box-content"
      )}
      onClick={() => !value && inputRef.current?.click()}
    >
      {value ? (
        <>
          <ImgWithoutEvent
            src={value}
            alt="upload"
            className="size-full object-cover"
            onClick={() => setVisible(true)}
          />
          <CircleX
            className="absolute -top-2 -right-2 size-4"
            onClick={() => onChange?.(undefined)}
            color="var(--adm-color-danger)"
          />
          <Mask visible={visible}>
            <div
              className="h-screen w-screen flex justify-center items-center"
              onClick={() => {
                setVisible(false);
              }}
            >
              <img
                src={value}
                alt="preview"
                className="max-w-[80%] max-h-[100%]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          </Mask>
        </>
      ) : (
        <>
          <Plus />
          <span className="text-xs mt-1">不超过10M</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="size-full hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadRequest(file);
              }
            }}
          />
        </>
      )}
    </div>
  );
}
