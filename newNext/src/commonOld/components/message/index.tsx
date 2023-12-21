'use client';

import { SnackbarProvider } from 'notistack';
import * as React from 'react';
type Props = {
  children: React.ReactNode;
};

export default function MessageProvider({ children }: Props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
}
