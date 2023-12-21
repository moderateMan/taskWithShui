/* Instruments */
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
import { dp } from 'src/service';
import names from '../names';
import httpApi from './api';
import { QueryDealByIdApiRequest } from './model';

const thunks = createThunks(names.dealStore, {
  marketplaceDealQueryAct: async (searchParams: QueryDealForMarketplace) => {
    const {
      data: { content, counter },
    } = await httpApi.dealMarketplaceListApi(searchParams);
    dp('dealStore', 'setDealMarketList', content);
    dp('dealStore', 'setMarketListCounter', counter);
  },

  landingPageDealQueryAct: async (searchParams: QueryDealForMarketplace) => {
    const {
      data: { content, counter },
    } = await httpApi.dealLandingPageListApi(searchParams);
    dp('dealStore', 'setLandingPageDealList', content);
    dp('dealStore', 'setLandingPageDealListCounter', counter);
  },

  dashboardPageDealQueryAct: async (searchParams: QueryDealForDashboard) => {
    const {
      data: { content, count },
    } = await httpApi.queryDealForDashboard(searchParams);

    dp('dealStore', 'setCurrentUserDealsList', content);
    dp('dealStore', 'setCurrentUserDealsListCounter', count);
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
    const { data: { content, count } } = await httpApi.getDealStatisticsApi(arg);
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
