'use client';

import AccountLayout from '../../common/layouts/accountLayout';

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return <AccountLayout>{children}</AccountLayout>;
}
