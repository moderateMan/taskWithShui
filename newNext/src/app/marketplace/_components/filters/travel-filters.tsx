import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/commonOld/components/iconify';
import { useFlatInject } from 'src/service';
import FilterLocation from './filter-location';
import FilterMain from './filter-main';

// ----------------------------------------------------------------------

export default function TravelFilters({ sx, ...other }: StackProps) {
  const { opportunityFindMarketplaceAct } = useFlatInject('opportunityStore');
  const { title, postCode } = useFlatInject('marketStore');

  return (
    <Stack
      spacing={2.5}
      alignItems={{ md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 4, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      <FilterLocation />

      <Divider flexItem orientation="vertical" />

      <FilterMain />

      <Divider flexItem orientation="vertical" />

      <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{
          px: 0,
          flexShrink: 0,
          minWidth: { xs: 1, md: 48 },
        }}
        onClick={() => {
          opportunityFindMarketplaceAct({
            title,
            postcode: postCode,
          });
        }}
      >
        <Iconify icon="carbon:search" />
      </Button>
    </Stack>
  );
}
