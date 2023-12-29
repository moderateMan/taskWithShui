import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import DealItemMarket from './deal-market-item';
import TravelTourItemSkeleton from './travel-tour-item-skeleton';
import { ReactNode, useEffect } from 'react';
import { useFlatInject } from 'src/service';
import { useResponsive } from 'src/muiEazy';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { isEmpty } from 'lodash-es';
import Empty from '../empty';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function MarketDealList() {
  const { marketplaceDealQueryAct, dealMarketList, dealMarketListCounter } =
    useFlatInject('dealStore');
  const { seachParams, marketDealType } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');
  const isLoaded = useBoolean(false);
  useEffect(() => {
    marketplaceDealQueryAct();
  }, []);

  useEffect(() => {
    isLoaded.onTrue();
  }, [dealMarketList]);

  const renderListWrapper = (children: ReactNode) => (
    <Box
      sx={{
        justifyItems: 'center',
        columnGap: 3,
        display: 'grid',
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
      }}
    >
      {children}
    </Box>
  );

  return (
    <>
      {isLoaded.value ? (
        isEmpty(dealMarketList) ? (
          <Empty>
            <Button color="primary" variant="contained">
              Clear filters
            </Button>
            <Button variant="outlined">Post a deal</Button>
          </Empty>
        ) : (
          <>
            {renderListWrapper(
              dealMarketList.map((deal, index) => {
                return <DealItemMarket key={index} deal={deal} />;
                // if (!marketDealType) {
                //   return <DealItemMarket key={index} deal={deal} />;
                // } else {
                //   if (deal.type === marketDealType) {
                //     return <DealItemMarket key={index} deal={deal} />;
                //   }
                // }
              })
            )}

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
        )
      ) : (
        renderListWrapper(
          [...Array(10)].map((_item, index) => <TravelTourItemSkeleton key={index} />)
        )
      )}
    </>
  );
}
