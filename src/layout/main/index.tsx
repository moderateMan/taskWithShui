import { TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { useEffect } from "react";
import cls from "classnames";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/learnScientific",
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          学科研
        </span>
      ),
    },
    {
      key: "/readDocument",
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          读文献
        </span>
      ),
    },
    {
      key: "/workScientific",
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>
          做科研
        </span>
      ),
    },
    {
      key: "/personalCenter",
      title: (active: boolean) => (
        <span className={cls(styles.link, active && styles.active)}>我的</span>
      ),
    },
  ];

  useEffect(() => {
    if (pathname === "/") {
      navigate(tabs[0].key, { replace: true });
    }
  }, [pathname]);

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
            <TabBar.Item key={item.key} title={item.title} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
