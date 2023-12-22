'use client';

import AuthCoverLayout_v2 from 'src/common/layouts/authLayout_v2';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthCoverLayout_v2 title="Hi, Welcome Back" image={'/assets/images/travel/travel_post_03.jpg'}>
      {children}
    </AuthCoverLayout_v2>
  );
}
