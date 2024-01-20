import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useResponsive } from 'src/muiEazy';
import { useEffect } from 'react';
import DealMarketItem from 'src/app/marketplace/_components/list/deal-market-item';
import Scrollbar from 'src/commonOld/components/scrollbar';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

export default function DealWishList() {
  const { userInfo } = useFlatInject('authStore');
  const { likeList, fetchDealWishlistAct } = useFlatInject('dealStore');
  const mdUp = useResponsive('up', 'md');

  useEffect(() => {
    if (userInfo && userInfo.wishlist_deal) {
      fetchDealWishlistAct({
        ids: userInfo?.wishlist_deal || [],
      });
    }
  }, [userInfo]);

  return (
    <Scrollbar>
      <Typography
        fontFamily={secondaryFont.style.fontFamily}
        fontSize={'20px'}
        fontStyle={'normal'}
        fontWeight={600}
        lineHeight={'22px'}
        color={'#14417D'}
        width={'230px'}
        noWrap={true}
        alignSelf={'stretch'}
      >
        Active deals
      </Typography>

      <Stack
        marginTop={'20px'}
        width={'100%'}
        direction={'row'}
        spacing={'20px'}
        flexWrap={'wrap'}
        justifyContent={mdUp ? 'flex-start' : 'center'}
      >
        {!userInfo ||
          (!userInfo?.wishlist_deal && (
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'12px'}
              fontStyle={'normal'}
              fontWeight={400}
              lineHeight={'22px'}
              color={'gray.600'}
              alignSelf={'stretch'}
            >
              No Deals in Deal wishlist
            </Typography>
          ))}
        {likeList.map((deal) => (
          <DealMarketItem key={deal.id} deal={deal} />
        ))}
      </Stack>
    </Scrollbar>
  );
}
