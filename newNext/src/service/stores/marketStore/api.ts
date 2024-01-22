import { http } from 'src/commonOld/http';
import {
  QueryDealForMarketplace
} from 'src/service/model';
import { DealEntity } from 'src/types/deal';

// 市场列表
function dealMarketplaceListApi(params: QueryDealForMarketplace) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/marketplace',
    method: 'POST',
    data: { ...params },
  });
}

function dealLandingPageListApi(params: QueryDealForMarketplace) {
  return http.request<{ content: DealEntity[]; counter: number }>({
    url: '/api/deal/query/public',
    method: 'POST',
    data: {
      ...params,
     
    },
  });
}

const api = {
  dealMarketplaceListApi,
  dealLandingPageListApi,
};

export default api;
