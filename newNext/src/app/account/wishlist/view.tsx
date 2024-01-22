'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFlatInject } from 'src/service';
import DealWishList from './components/wishList';
// ----------------------------------------------------------------------

export default function EcommerceAccountWishlistView() {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Favourites
      </Typography>
      <Box width={'100%'} height={'100%'}>
        <DealWishList />
      </Box>
    </>
  );
}
