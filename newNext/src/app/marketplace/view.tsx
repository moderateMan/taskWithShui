'use client';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import DealFilters from './_components/filters/deal-filters';
import { useFlatInject } from 'src/service';
import MarketDealList from './_components/list/travel-tour-list';
import DealTabSelector from './_components/filters/deal-tab-selector';
import { SplashScreen } from 'src/commonOld/components/loading-screen';
import PreferenceView from './_components/preference/preference-view';

// ----------------------------------------------------------------------

export default function TravelToursView() {
  const { loading } = useFlatInject('dealStore');
  const { userInfo } = useFlatInject('authStore');

  return (
    <>
      <Container>
        <DealFilters
          maxWidth={'lg'}
          sx={{
            mt: 5,
            mb: { xs: 2, md: 3 },
            height: '80px',
          }}
        />
        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          sx={{
            width: '100%',
          }}
        >
          <DealTabSelector
            maxWidth={'100%'}
            sx={{
              overflow: 'auto',
            }}
          />
        </Stack>
        <MarketDealList />
        <PreferenceView is_open={!userInfo?.preferences || userInfo?.preferences.length < 3} />
      </Container>
      {loading && <SplashScreen />}
    </>
  );
}
