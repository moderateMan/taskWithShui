'use client';

import CompactLayout from 'src/common/layouts/compactLayout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <CompactLayout>{children}</CompactLayout>;
}
