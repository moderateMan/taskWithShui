import { http } from 'src/commonOld/http';
import { TargetDeal } from './modal';
import { DealEntity } from 'src/types/deal';

const api = {
  fetchDealDetailApi(params: TargetDeal) {
    return http.request<{ content: DealEntity[]; count: number }>({
      url: '/api/deal/query/id',
      method: 'POST',
      data: {
        id: params.id,
      },
    });
  },

  fetchDealWishlistApi(params: { ids: number[] }) {
    return http.request<{ content: DealEntity[]; count: number }>({
      url: '/api/deal/query/marketplace',
      method: 'POST',
      data: {
        ids: params.ids,
      },
    });
  },

  likeDealApi(params: TargetDeal) {
    return http.request<{ content: string }>({
      url: '/api/deal/wish',
      method: 'POST',
      data: {
        id: params.id,
      },
    });
  },
};

export default api;
