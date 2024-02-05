import { Button, ErrorBlock } from "antd-mobile";
import { useNavigate } from "react-router";
import { rootPrefix } from "../router";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <ErrorBlock fullPage status="empty">
      <Button
        color="primary"
        onClick={() => navigate(rootPrefix, { replace: true })}
      >
        返回首页
      </Button>
    </ErrorBlock>
  );
}
