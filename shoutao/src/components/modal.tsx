import { X } from "lucide-react";
import {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface ModalProps {
  open?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
}

export default forwardRef(function Modal(
  { title = <span></span>, children, open, onClose, onOk }: ModalProps,
  ref: Ref<HTMLDialogElement | null>
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [open]);

  useImperativeHandle(ref, () => dialogRef.current);
  return (
    <dialog ref={dialogRef} className="w-[800px]">
      <header className="bg-[#549231] flex justify-between items-center p-2 text-white text-lg font-bold">
        {title}
        <X className="cursor-pointer" onClick={onClose} />
      </header>
      <div className="p-4">{children}</div>
      <footer className="bg-gray-100 flex justify-end items-center p-2">
        <button
          onClick={onOk}
          className="bg-[#77A14F] py-1 px-4 text-white rounded-[1.25rem] font-bold"
        >
          OK
        </button>
      </footer>
    </dialog>
  );
});
