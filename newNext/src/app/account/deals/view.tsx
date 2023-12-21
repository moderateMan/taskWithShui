'use client';

import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import DealList from './_components/deal-list/list';
import { statisticsReducer, statisticsSeparator } from 'src/common/utils/statistics-reducer';
import storageHelper from 'src/common/utils/storageHelper';

// ----------------------------------------------------------------------

const tabs = [
  {
    value: 'dealType',
    label: 'Deal Type',
  },
  {
    value: 'dealBasics',
    label: 'Deal Basics',
  },
  {
    value: 'businessDetails',
    label: 'Business Details',
  },
  {
    value: 'marketCompetition',
    label: 'Market Competition',
  },
  {
    value: 'uploadsMedia',
    label: 'Uploads & Media',
  },
  {
    value: 'faq',
    label: 'FAQs',
  },
];

// ----------------------------------------------------------------------

export default function DealView() {
  const [tab, setTab] = useState('dealType');
  const router = useRouter();
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);
  const {
    setCurrentDeal,
    dealMarketList,
    marketplaceDealQueryAct,
    current_user_deals_list,
    current_user_deals_list_counter,
    queryDealForDashboardAct,
    renewDealAct,
    statistics,
    statistics_count,
    getDealStatisticsAct,
  } = useFlatInject('dealStore');
  useEffect(() => {
    marketplaceDealQueryAct();
    queryDealForDashboardAct();
    getDealStatisticsAct();
  }, []);

  const processed_statistics = statisticsSeparator({
    ids: current_user_deals_list.map((item) => item.official_deal_id),
    data: statistics,
  });

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Deals
      </Typography>
      <DealList
        list={current_user_deals_list}
        statistics={processed_statistics}
        handleAction={(data) => {
          setCurrentDeal(data);
          storageHelper.setItem('DEAL_ID', data.id);
          router.push(`${paths.account.dealEdit}?id=${data.id}&tabid=1`);
        }}
        handleRenewal={(data) => {
          renewDealAct({
            id: data.id,
          });
        }}
      ></DealList>
    </>
  );
}
