import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import SvgColor from 'src/commonOld/components/svg-color';
import { secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

export interface IDealTabSelectorItemProps {
  active?: boolean;
  name: string;
  icon: string;
}

// ----------------------------------------------------------------------

export default function DealTabSelectorItem(props: IDealTabSelectorItemProps) {
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
