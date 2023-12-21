'use client';

import { useEffect, useRef } from 'react';
/* Core */
import { Provider } from 'react-redux';
import { usePathname, useRouter } from 'src/routes/hooks';

/* Instruments */
import { paths } from 'src/routes/paths';
import { reduxStore, useFlatInject } from 'src/service';

// socket io

const App = (props: React.PropsWithChildren) => {
  const { token } = useFlatInject('authStore');
  const { notificationQueryAct } = useFlatInject('notificationStore');

  const notificationLoop = useRef<null | NodeJS.Timeout>(null);

  const startLoop = () => {
    notificationLoop.current = setInterval(() => {
      notificationQueryAct();
    }, 15000);
  };

  const stopLoop = () => {
    if (notificationLoop.current) {
      clearInterval(notificationLoop.current);
    }
  };

  useEffect(() => {
    // 这个 if(token) 就是在判断用户是否已经登陆
    if (token) {
      startLoop();
    } else {
      stopLoop();
    }
    return () => {
      stopLoop();
    }
  }, [token]);
  return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <App>{props.children}</App>
    </Provider>
  );
};

export default ServiceProvider;
