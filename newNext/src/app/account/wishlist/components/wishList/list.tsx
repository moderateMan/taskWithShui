import Stack from '@mui/material/Stack';
import { IProductItemProps } from 'src/types/product';
import { IOpportunity } from 'src/service/model';
import Scrollbar from 'src/commonOld/components/scrollbar';
import WisListItem from './item';

// ----------------------------------------------------------------------

type Props = {
  products: IProductItemProps[];
  wishlist?: boolean;
  opportunityWished: IOpportunity[];
};

export default function EcommerceCartList({
  products,
  wishlist = false,
  opportunityWished,
}: Props) {
  console.log('opportunityWished', opportunityWished);

  return (
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
        <Stack flexGrow={1}>Name</Stack>
        <Stack sx={{ width: 250 }}>Description</Stack>
        <Stack sx={{ width: 120 }}>Price</Stack>
        <Stack sx={{ width: 35 }} />
        {/* {wishlist && <Stack sx={{ width: 36 }} />} */}
      </Stack>

      {opportunityWished.map((item) => (
        <WisListItem key={item.id} opportunity={item} wishlist={wishlist} />
      ))}
    </Scrollbar>
  );
}
