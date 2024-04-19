import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../store/user";
import { getWechatLoginCode, gotoCodeUrl } from "../utils/wechat-login";
import { LoginResponseData, login } from "../api";

export default function Layout() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserStore();
  const location = useLocation();

  const redirect = (userInfo?: LoginResponseData) => {
    const isRegistered = userInfo?.enroll === 1;
    const pathname = isRegistered ? "/home" : "/register";
    if (location.pathname !== pathname) {
      navigate(pathname, { replace: true });
    }
  };

  useEffect(() => {
    if (!userInfo?.token) {
      const code = getWechatLoginCode();
      if (!code) {
        gotoCodeUrl();
      } else {
        login({ code }).then((res) => {
          setUserInfo(res);
          redirect(res);
        });
      }
    } else {
      redirect(userInfo);
    }
  }, []);
  return (
    <div className="size-full overflow-auto">
      <Outlet />
    </div>
  );
}
