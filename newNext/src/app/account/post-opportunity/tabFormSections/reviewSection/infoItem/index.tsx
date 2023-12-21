import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
const TypographyTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      sx={{
        color: 'var(--text-secondary, #59745D)',
        fontFamily: 'Public Sans',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '18px' /* 150% */,
        marginBottom: '4px',
      }}
    >
      {children}
    </Typography>
  );
};

const TypographyValue = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      sx={{
        overflow: 'hidden',
        color: 'var(--text-primary, #114634)',
        textOverflow: 'ellipsis',
        /* Desktop/Body2 */
        fontFamily: 'Public Sans',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '22px' /* 157.143% */,
      }}
    >
      {children}
    </Typography>
  );
};
const InfoItem = () => {
  return (
    <Stack
      sx={{
        marginBottom: '40px',
      }}
      direction={'column'}
    >
      <TypographyTitle>Company name</TypographyTitle>
      <TypographyValue>Ro-Jo & Co</TypographyValue>
    </Stack>
  );
};

export default InfoItem;
