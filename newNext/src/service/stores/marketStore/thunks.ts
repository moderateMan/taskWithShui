/* Instruments */
import { dp } from 'src/service';
import { QueryDealForMarketplace } from 'src/service/model';
import { createThunks } from 'src/service/setup';
import names from '../names';
import httpApi from './api';

const thunks = createThunks(names.marketStore, {
  // 市场页面的列表查询
  marketQueryListAct: async (searchParams: QueryDealForMarketplace, api) => {
    let params = searchParams || {};
    const { searchData, marketDealType, pageSize, dealMarketListPageNum } =
      api.getState().marketStore;
    if (marketDealType) {
      params.type = marketDealType;
    }
    if (searchData) {
      params.title = searchData;
    }
    const {
      data: { content, count },
    } = await httpApi.dealMarketplaceListApi({
      ...params,
      page_size: pageSize,
      page: dealMarketListPageNum,
    });
    dp('marketStore', 'setMarketList', content);
    dp('marketStore', 'setMarketListCount', count);
  },

  // 首页的卡牌列表查询
  landingQueryListAct: async (searchParams: QueryDealForMarketplace) => {
    const {
      data: { content, counter },
    } = await httpApi.dealLandingPageListApi(searchParams);
    dp('marketStore', 'setLandingDealList', content);
    dp('marketStore', 'setLandingDealListCounter', counter);
  },
});

export default thunks;
