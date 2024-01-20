import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import { useResponsive } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import DealFilterMain from './deal-filter-main';

// ----------------------------------------------------------------------

// 这个搜索框专门用于搜索Deal, 也就是第一阶段专用的

// ----------------------------------------------------------------------

export default function DealFilters({ sx, ...other }: StackProps) {
  // 用作参考
  const { setSeachParams, setMarketListPageNum } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');
  return (
    <Stack
      spacing={2.5}
      alignItems={'center'}
      direction={'row'}
      sx={{ p: 4, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      <DealFilterMain />
      <Button
        size="large"
        color="primary"
        variant="contained"
        sx={{
          padding: '11px 22px 11px 22px',
          minWidth: { xs: '95px', md: '95px' },
          height: '48px',
          borderRadius: '8px',
        }}
        onClick={() => {
          setMarketListPageNum(1)
        }}
      >
        Search
      </Button>

      {mdUp && (
        <Button
          size="large"
          color="primary"
          variant="text"
          sx={{
            padding: '11px',
            minWidth: { xs: 1, md: '105px' },
            height: '48px',
            borderRadius: '8px',
          }}
          onClick={() => {
            setSeachParams('');
          }}
        >
          Reset All
        </Button>
      )}
    </Stack>
  );
}
