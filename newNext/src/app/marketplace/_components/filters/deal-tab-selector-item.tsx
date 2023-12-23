import Stack from '@mui/material/Stack';
import { Box, Typography, TypographyProps } from '@mui/material';
import { useFlatInject } from 'src/service';
import { secondaryFont } from 'src/theme/typography';
import { useResponsive } from 'mui-eazy';
import Iconify from 'src/commonOld/components/iconify';
import { Icon } from '@iconify/react';
import { ReactNode } from 'react';
import SvgColor from 'src/commonOld/components/svg-color';

// ----------------------------------------------------------------------

export interface IDealTabSelectorItemProps {
  active?: boolean;
  name: string;
  icon: string;
}

// ----------------------------------------------------------------------

export default function DealTabSelectorItem(props: IDealTabSelectorItemProps) {
  const { marketplaceDealQueryAct } = useFlatInject('dealStore');
  const { seachParams, marketDealType, setSeachParams } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');

  const underlineActiveStyle = {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 2,
    left: 0,
    bottom: -2,
    backgroundColor: '#256CCB',
    ...(props.active && {
      width: '100%',
      backgroundColor: '#14417D',
    }),
  };
  const underlineAnimationStyle = {
    transition: 'width 0.3s ease',
    width: '100%',
  };

  return (
    <Stack
      spacing={1}
      alignItems={'center'}
      direction={'column'}
      sx={{
        width: '120px',
        padding: '13px 0px 12px 0px',
        whiteSpace: 'nowrap',
        justifyContent: 'flex-start',
        // backgroundColor: 'grey.100',
        position: 'relative',
        color: props.active ? '#14417D' : '#256CCB',
        '&:before': underlineActiveStyle,
        '&:hover': {
          '&::before': underlineAnimationStyle,
        },
      }}
    >
      {/* <Box component={'img'} src={props.pic_url} height={'28px'} /> */}
      <SvgColor
        src={props.icon}
        sx={{
          width: '28px',
          height: '28px',
        }}
      />
      <Typography
        fontFamily={secondaryFont.style.fontFamily}
        fontSize={'14px'}
        fontStyle={'normal'}
        fontWeight={600}
        lineHeight={'22px'}
        textAlign={'center'}
      >
        {props.name}
      </Typography>
    </Stack>
  );
}
