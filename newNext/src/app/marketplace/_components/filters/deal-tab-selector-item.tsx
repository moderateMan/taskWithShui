import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import { useFlatInject } from 'src/service';
import { secondaryFont } from 'src/theme/typography';
import { useResponsive } from 'mui-eazy';

// ----------------------------------------------------------------------

export interface IDealTabSelectorItemProps {
  name: string;
  pic_url: string;
}

// ----------------------------------------------------------------------

export default function DealTabSelectorItem(props: IDealTabSelectorItemProps) {
  const { marketplaceDealQueryAct } = useFlatInject('dealStore');
  const { seachParams, marketDealType, setSeachParams } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');

  return (
    <Stack
      spacing={2.5}
      alignItems={'center'}
      direction={'column'}
      sx={{
        width: '120px',
        padding: '13px 0px 12px 0px',
        whiteSpace: 'nowrap',
        justifyContent: 'flex-start',
        // backgroundColor: 'grey.100',
      }}
    >
      <Box component={'img'} src={props.pic_url} height={'20px'} />
      <Typography
        fontFamily={secondaryFont.style.fontFamily}
        fontSize={'14px'}
        fontStyle={'normal'}
        fontWeight={600}
        lineHeight={'22px'}
        color={'#14417D'}
        textAlign={'center'}
      >
        {props.name}
      </Typography>
    </Stack>
  );
}
