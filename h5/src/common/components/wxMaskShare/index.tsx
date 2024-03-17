import { createPortal } from "react-dom";
import styles from "./index.module.scss";
import arrowImg from "./assets/arrow.png";
import tipImg from "./assets/tip.png";

export interface WxMaskShareProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function WxMaskShare(props: WxMaskShareProps) {
  const { visible = false, onClose } = props;

  if (!visible) return null;

  return createPortal(
    <div className={styles.mask} onClick={onClose}>
      <img className={styles.arrow} src={arrowImg} alt="提示" />
      <img className={styles.tip} src={tipImg} alt="箭头" />
    </div>,
    document.body
  );
}
