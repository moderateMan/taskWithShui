import { SafeArea, TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { useEffect } from "react";
import cls from "classnames";
import {
  AppOutline,
  ContentOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { getAbsolutePath, routes, rootPrefix } from "../../router";
import { useFlat } from "../../service";
import {
  getWechatLoginCode,
  gotoCodeUrl,
} from "../../common/utils/wechat-login";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, login } = useFlat("authStore");
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value, { replace: true });
  };

  const tabs = [
    {
      key: getAbsolutePath(routes.learnScientific.pathname),
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          {routes.learnScientific.title}
        </span>
      ),
      icon: (active: boolean) => (
        <AppOutline className={cls(styles.link, active && styles.active)} />
      ),
    },
    {
      key: getAbsolutePath(routes.readScientific.pathname),
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          {routes.readScientific.title}
        </span>
      ),
      icon: (active: boolean) => (
        <ContentOutline className={cls(styles.link, active && styles.active)} />
      ),
    },
    {
      key: getAbsolutePath(routes.workScientific.pathname),
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          {routes.workScientific.title}
        </span>
      ),
      icon: (active: boolean) => (
        <UnorderedListOutline
          className={cls(styles.link, active && styles.active)}
        />
      ),
    },
    {
      key: getAbsolutePath(routes.personalCenter.pathname),
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          {routes.personalCenter.title}
        </span>
      ),
      icon: (active: boolean) => (
        <UserOutline className={cls(styles.link, active && styles.active)} />
      ),
    },
  ];

  useEffect(() => {
    if (pathname === rootPrefix) {
      navigate(tabs[0].key, { replace: true });
    }
  }, [pathname]);

  useEffect(() => {
    if (!userInfo) {
      const code = getWechatLoginCode();
      if (!code) {
        gotoCodeUrl({ appId: "wx40b7f14d86ba784c" });
      } else {
        login({ code });
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabbar}>
        <TabBar
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
