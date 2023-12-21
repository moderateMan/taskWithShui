'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { usePathname, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { reduxStore, useFlatInject } from 'src/service';

export const includePath = [
  paths.loginCover,
  paths.registerCover,
  paths.verify,
  paths.ResendEmailVerification,
  paths.forgotPassword,
  paths.changePassword,
  '',
];

const includePath2 = [
  paths.loginCover,
  paths.registerCover,
  paths.verify,
  paths.ResendEmailVerification,
  paths.forgotPassword,
  paths.changePassword,
];

const App = (props: React.PropsWithChildren) => {
  const { token, userInfoMemberAct } = useFlatInject('authStore');
  const init = () => {
    try {
      userInfoMemberAct();
    } catch (error) {
      console.log('error', error);
    }
  };
  const router = useRouter();
  const pathName = usePathname();
  let pathNameTemp = pathName.endsWith('/') ? pathName.slice(0, -1) : pathName;
  useEffect(() => {
    token && init();
  }, []);
  useEffect(() => {
    if (token) {
      if (includePath2.includes(pathNameTemp)) {
        router.push(paths.marketplace.root);
      }
    } else {
      if (!includePath.includes(pathNameTemp)) {
        router.push(paths.loginCover);
      }
    }
  }, [token, pathName]);
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
