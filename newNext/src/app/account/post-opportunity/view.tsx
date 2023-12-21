'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFlatInject } from 'src/service';
import DealFormView from './fromView';
import useHashParams from 'src/routes/hooks/use-hash-params';
export default () => {
  const hashData = useHashParams();
  const query = useSearchParams();
  const { queryDealByIdAct, currentDeal } = useFlatInject('dealStore');
  let id = query.get('id') || hashData().id;
  useEffect(() => {
    if (id) {
      queryDealByIdAct({
        id: Number(id),
      });
    }
  }, []);
  return <>{((id && currentDeal) || !id) && <DealFormView />}</>;
};
