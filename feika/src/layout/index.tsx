import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUserStore } from "../store/user";
import { getWechatLoginCode, gotoCodeUrl } from "../utils/wechat-login";
import { login } from "../api";

export default function Layout() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserStore();

  useEffect(() => {
    if (!userInfo?.token) {
      const code = getWechatLoginCode();
      if (!code) {
        gotoCodeUrl();
      } else {
        login({ code }).then((res) => {
          setUserInfo(res);
          navigate("/register", { replace: true });
        });
      }
    } else {
      navigate("/register", { replace: true });
    }
  }, []);
  return (
    <div className="size-full overflow-auto">
      <Outlet />
    </div>
  );
}
