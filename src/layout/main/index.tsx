import { TabBar } from "antd-mobile";
import { Outlet, parsePath, useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";

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
      title: "学科研",
    },
    {
      key: "/readDocument",
      title: "读文献",
    },
    {
      key: "/workScientific",
      title: "做科研",
    },
    {
      key: "/personalCenter",
      title: "我的",
      icon: (active: boolean) => (
        <span style={{ color: active ? "blue" : "red" }}>asdfsfs</span>
      ),
    },
  ];
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
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
