import Stack from '@mui/material/Stack';
import Scrollbar from 'src/commonOld/components/scrollbar';
import { DealEntity } from 'src/types/deal';
import EcommerceCartItem from './item';
import { DealStatistics } from 'src/service/stores/dealStore/model';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
// ----------------------------------------------------------------------

type Props = {
  list: DealEntity[];
  statistics: DealStatistics[];
  wishlist?: boolean;
  handleAction?: (params: DealEntity) => void;
  handleRenewal?: (params: DealEntity) => void;
};

export default function DealList({
  list,
  wishlist = false,
  handleAction,
  handleRenewal,
  statistics,
}: Props) {
  const [curPage, setCuePage] = useState(1);
  return (
    <>
      <Scrollbar>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            minWidth: 720,
            typography: 'subtitle2',
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Stack flexGrow={1}>Item</Stack>
          <Stack sx={{ width: 90 }}>Expires</Stack>
          <Stack sx={{ width: 90 }}>Views</Stack>
          <Stack sx={{ width: 90 }}>CTRs</Stack>
          <Stack sx={{ width: 90 }}>Likes</Stack>
          <Stack sx={{ width: 90 }}>Status</Stack>
          <Stack sx={{ width: 60 }} />
          {wishlist && <Stack sx={{ width: 36 }} />}
        </Stack>

        {list.slice((curPage - 1) * 5, curPage * 5).map((product) => (
          <EcommerceCartItem
            statistic={statistics.find((item) => item.deal_id === product.official_deal_id)!}
            handleAction={handleAction}
            handleRenewal={handleRenewal}
            key={product.id}
            itemData={product}
            wishlist={wishlist}
          />
        ))}
      </Scrollbar>
      <Stack direction='row' justifyContent={'center'}>
        <Pagination
          sx={{
            mt: 3
          }}
          onChange={(_, page) => {
            setCuePage(page);
          }}
          page={curPage}
          count={Math.floor(list.length / 5)}
        />
      </Stack>
    </>
  );
}
