import { Button, ErrorBlock } from "antd-mobile";
import { useNavigate } from "react-router";
import { rootPrefix } from "../router";

export default function PageError() {
  const navigate = useNavigate();
  return (
    <ErrorBlock fullPage>
      <Button
        color="primary"
        onClick={() => navigate(rootPrefix, { replace: true })}
      >
        返回首页
      </Button>
    </ErrorBlock>
  );
}
