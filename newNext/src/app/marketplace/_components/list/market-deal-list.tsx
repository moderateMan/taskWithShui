import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { isEmpty } from 'lodash-es';
import { ReactNode, useEffect } from 'react';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useFlatInject } from 'src/service';
import Empty from '../empty';
import DealItemMarket from './deal-market-item';
import TravelTourItemSkeleton from './travel-tour-item-skeleton';

// ----------------------------------------------------------------------

export default function MarketDealList() {
  const {
    dealMarketList,
    pageSize,
    dealMarketListCount,
    setMarketListPageNum,
    dealMarketListPageNum
  } = useFlatInject('marketStore');
  const isLoaded = useBoolean(false);
  useEffect(() => {
    // 进页面就重置页码
    setMarketListPageNum(1);
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
              })
            )}

            <Pagination
              sx={{
                my: 10,
                [`& .${paginationClasses.ul}`]: {
                  justifyContent: 'center',
                },
              }}
              onChange={(_, page) => {
                setMarketListPageNum(page);
              }}
              page={dealMarketListPageNum}
              count={Math.ceil(dealMarketListCount / pageSize)}
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
