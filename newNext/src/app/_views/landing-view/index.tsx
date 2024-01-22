'use client';

import Box from '@mui/material/Box';
import { useResponsive } from 'src/muiEazy';
import { useEffect } from 'react';
import { useFlatInject } from 'src/service';
import { ExploreDeals } from './components/explore-deals';
import { ForAnyone } from './components/for-anyone';
import { GetStarted } from './components/get-started';
import LandingHeroMain from './components/landing-hero';
import { ReadyToScaleYourSuccess } from './components/ready-to-scale-your-success';
import Section4 from './components/section-4';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export default function LangdingView() {
  const { landingPageDealList, landingQueryListAct } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');

  console.log(mdUp);

  useEffect(() => {
    landingQueryListAct({
      page: 1,
      page_size: 8
    });
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative', marginTop: '150px' }}>
        <LandingHeroMain />
      </Box>
      <GetStarted mdUp={mdUp} />
      <ReadyToScaleYourSuccess mdUp={mdUp} />
      <ExploreDeals mdUp={mdUp} deals={landingPageDealList} />
      <ForAnyone mdUp={mdUp} />
      <Section4 />
    </>
  );
}
