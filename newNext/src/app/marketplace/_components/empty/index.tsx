import { Box, Stack, Typography } from '@mui/material';
import { useResponsive } from 'mui-eazy';
import { ReactNode } from 'react';
import { secondaryFont } from 'src/theme/typography';

export interface EmptyProps {
  children?: ReactNode;
}

export default function Empty(props: EmptyProps) {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        pt: 4,
        pb: 8,
        px: mdUp ? 4 : 1,
      }}
    >
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          borderBottom: '1px solid #919EAB3D',
          pb: 4,
        }}
      >
        <Typography
          fontFamily={secondaryFont.style.fontFamily}
          fontSize={'20px'}
          fontStyle={'normal'}
          fontWeight={600}
          lineHeight={'28px'}
          color={'#14417D'}
          noWrap={true}
        >
          No deals found.
        </Typography>
        <Typography
          fontSize={'16px'}
          fontWeight={400}
          lineHeight={'24px'}
          color={'#696969'}
          paragraph
        >
          Try adjusting your filters or search again. We're here to help you find what you need!
        </Typography>
        <Stack direction={'row'} spacing={1.5}>
          {props.children}
        </Stack>
      </Stack>
    </Box>
  );
}
