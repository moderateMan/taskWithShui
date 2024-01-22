/* Instruments */
import { dp } from 'src/service';
import {
  DealStatisticsQueryModel,
  IDealUpdate,
  INewDealDraft,
  QueryDealForDashboard,
  QueryDealForMarketplace,
  TargetDeal,
  UploadDealFileModel,
} from 'src/service/model';
import { createThunks } from 'src/service/setup';
import names from '../names';
import httpApi from './api';
import { QueryDealByIdApiRequest } from './model';
let a = (params: { a: 1 }) => 1;
type C = Parameters<typeof a>[0];
const thunks = createThunks(names.dealStore, {
  fetchDealDetailAct: async (params: TargetDeal) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('dealStore', 'setDealDetail', content?.[0]);
  },
  fetchAct: async (params: TargetDeal) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('dealStore', 'setDealDetail', content?.[0]);
  },
  likeDealAct: async (params: TargetDeal) => {
    const {
      data: { content },
      code,
    } = await httpApi.likeDealApi(params);
    return code === 1;
  },
  fetchDealWishlistAct: async (params: { ids: number[] }) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealWishlistApi(params);
    dp('dealStore', 'setLikeList', content);
  },
  queryDealDetailAct: async (params: TargetDeal, api) => {
    // debugger;
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('dealStore', 'setDealDetail', content?.[0]);
  },
  queryCommentList: async (payload: { deal_id?: number } = {}, api) => {
    // 取comment的Pagination信息
    const {
      currentDealId,
      dealComentPagination: { pageNum, pageSize },
    } = api.getState().dealStore;
    const {
      data: { content, count },
    } = await httpApi.commentFindByDealIDApi({
      deal_id: currentDealId,
      page: pageNum,
      page_size: pageSize,
      ...payload,
    });
    dp('dealStore', 'setComments', content);
    dp('dealStore', 'setDealComentPagination', { pageCount: count });
  },
  queryDealListAct: async (searchParams: QueryDealForMarketplace, api) => {
    let params = searchParams || {};
    const { marketDealType } = api.getState().marketStore;
    const { pageSize, page } = api.getState().dealStore;
    if (marketDealType) {
      params.type = marketDealType;
    }
    const {
      data: { content, count },
    } = await httpApi.dealMarketplaceListApi({ ...params, page_size: pageSize, page: page + 1 });
    dp('dealStore', 'setMarketList', content);
    dp('dealStore', 'setMarketListCount', count);
  },
  createDraftAct: async (arg: INewDealDraft, api) => {
    const { data } = await httpApi.createDraftApi(arg);
    return data;
  },

  updateDraftAct: async (arg: IDealUpdate, api) => {
    const { data } = await httpApi.updateDraftApi(arg);
  },

  submitDraftAct: async (arg: { id: number }, api) => {
    const { data } = await httpApi.submitDraftApi(arg);
  },

  publishDraftAct: async (arg: TargetDeal, api) => {
    const { data } = await httpApi.publishDraftApi(arg);
  },

  //
  renewDealAct: async (arg: TargetDeal, api) => {
    const { data } = await httpApi.renewDealApi(arg);
  },

  //延长60天Deal life span
  queryDealByIdAct: async (arg: QueryDealByIdApiRequest, api) => {
    const { data } = await httpApi.queryDealByIdApi(arg);
    dp('dealStore', 'setCurrentDeal', data.content[0]);
  },

  queryDealForDashboardAct: async (arg: QueryDealForDashboard, api) => {
    const { data } = await httpApi.queryDealForDashboard(arg);
    dp('dealStore', 'setCurrentUserDealsList', data.content);
    dp('dealStore', 'setListTotalCount', data.count);
  },

  // 统计数据获取
  getDealStatisticsAct: async (arg: DealStatisticsQueryModel, api) => {
    const {
      data: { content, count },
    } = await httpApi.getDealStatisticsApi(arg);
    dp('dealStore', 'setStatistics', content);
    dp('dealStore', 'setStatisticsCount', count);
  },

  // file uploads
  getUploadUrlAct: async (arg: UploadDealFileModel, api) => {
    const { file, ...rest } = arg;
    const { data } = await httpApi.getDealFileUploadApi(rest);
    const { fileUrl, presignedUrl } = data.content;
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },
});

export default thunks;
