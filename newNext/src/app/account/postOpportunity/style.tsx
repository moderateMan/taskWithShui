import { Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const DividerNode = () => {
  return (
    <Divider
      sx={{
        mb: 3,
        mt: 3,
      }}
    />
  );
};
export const TypographyNode = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        mb: 3,
      }}
    >
      {children}
    </Typography>
  );
};
