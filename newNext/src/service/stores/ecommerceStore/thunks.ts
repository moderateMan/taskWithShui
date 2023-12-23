import names from 'src/service/stores/names';
import httpApi from './api';
import { TargetDeal } from './modal';
import { createThunks } from 'src/service/setup';
import { dp } from 'src/service';

const thunks = createThunks(names.ecommerceStore, {
  fetchDealDetailAct: async (params: TargetDeal) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('ecommerceStore', 'setDealDetail', content?.[0]);
  },
  fetchAct: async (params: TargetDeal) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('ecommerceStore', 'setDealDetail', content?.[0]);
  },
  likeDealAct: async (params: TargetDeal) => {
    const {
      data: { content },
      code
    } = await httpApi.likeDealApi(params);
    return code === 1
  },
  fetchDealWishlistAct: async (params: { ids: number[] }) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealWishlistApi(params);
    dp('ecommerceStore', 'setLikeList', content);
  },
});

export default thunks;
