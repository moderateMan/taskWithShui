'use client';

import AuthCoverLayout_v2 from 'src/common/layouts/authLayout_v2';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthCoverLayout_v2 title={`Hi, Welcome Back `} image={'/assets/images/login/2.png'}>
      {children}
    </AuthCoverLayout_v2>
  );
}
