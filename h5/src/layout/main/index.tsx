import { TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";
import { useEffect } from "react";
import cls from "classnames";
import { getAbsolutePath, routes, rootPrefix } from "../../router";
import { Icon } from "@iconify/react";
import useWxShare from "../../common/hooks/useWxShare";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  useWxShare();

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
        <Icon
          icon="iconoir:home-alt-slim-horiz"
          className={cls(styles.link, active && styles.active)}
        />
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
        <Icon
          icon="fluent:book-32-regular"
          className={cls(styles.link, active && styles.active)}
        />
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
        <Icon
          icon="carbon:datastore"
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
        <Icon
          icon="ep:user"
          className={cls(styles.link, active && styles.active)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (pathname === rootPrefix) {
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
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
