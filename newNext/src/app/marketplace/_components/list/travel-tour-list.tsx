import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import DealItemMarket from './deal-market-item';
import TravelTourItemSkeleton from './travel-tour-item-skeleton';
import { ReactNode, useEffect } from 'react';
import { useFlatInject } from 'src/service';
import { useResponsive } from 'mui-eazy';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import isEmpty from 'lodash.isempty';
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
    if (!isLoaded.value) {
      isLoaded.onTrue();
    }
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
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
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
                if (!marketDealType) {
                  return <DealItemMarket key={index} deal={deal} />;
                } else {
                  if (deal.type === marketDealType) {
                    return <DealItemMarket key={index} deal={deal} />;
                  }
                }
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
