'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFlatInject } from 'src/service';
import DealFormView from '../../postDeal/formView';
export default () => {
  const query = useSearchParams();
  const { queryDealByIdAct, currentDeal } = useFlatInject('dealStore');
  let id = query.get('id');
  useEffect(() => {
    if (id) {
      queryDealByIdAct({
        id: Number(id),
      });
    }
  }, []);
  return <>{id && currentDeal && <DealFormView />}</>;
};
