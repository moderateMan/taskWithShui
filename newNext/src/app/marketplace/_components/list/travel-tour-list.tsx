import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import DealItemMarket from './deal-market-item';
import TravelTourItemSkeleton from './travel-tour-item-skeleton';
import { useEffect } from 'react';
import { useFlatInject } from 'src/service';
import { useResponsive } from 'mui-eazy';

// ----------------------------------------------------------------------

export default function MarketDealList() {
  const { marketplaceDealQueryAct, dealMarketList, dealMarketListCounter } =
    useFlatInject('dealStore');
  const { seachParams, marketDealType } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');
  useEffect(() => {
    marketplaceDealQueryAct();
  }, []);

  return (
    <>
      <Box
        sx={{
          justifyItems: 'center',
          columnGap: 3,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
        }}
      >
        {!dealMarketList.length &&
          [...Array(10)].map((item, index) => <TravelTourItemSkeleton key={index} />)}
        {dealMarketList.map((deal, index) => {
          if (!marketDealType) {
            return <DealItemMarket key={index} deal={deal} />;
          } else {
            if (deal.type === marketDealType) {
              return <DealItemMarket key={index} deal={deal} />;
            }
          }
        })}
      </Box>

      <Pagination
        count={dealMarketListCounter}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
