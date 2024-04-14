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
        });
      }
    } else {
      navigate("/register", { replace: true });
    }
  }, []);
  return (
    <div className="px-3 py-6 size-full overflow-auto">
      <Outlet />
    </div>
  );
}
