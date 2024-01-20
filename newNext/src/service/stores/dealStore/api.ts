import { http } from 'src/commonOld/http';
import {
  DealStatisticsQueryModel,
  IDealUpdate,
  INewDealDraft,
  QueryDealForDashboard,
  QueryDealForMarketplace,
  TargetDeal,
  UploadDealFileModel,
} from 'src/service/model';
import { DealEntity } from 'src/types/deal';
import { DealStatistics, QueryDealByIdApiRequest } from './model';
import { FileUploadApiRespone } from 'src/service/model/appStoreModel';
import { ICommentWithReplies } from '../commentStore/model';

function commentFindByDealIDApi(payload: { deal_id: number; page: number; page_size: number }) {
  return http.request<{ content: ICommentWithReplies[]; count: number }>({
    url: '/api/comment/query/deal',
    method: 'POST',
    data: { ...payload },
  });
}

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
      page: 1,
      page_size: 5,
    },
  });
}

function createDraftApi(data: INewDealDraft) {
  return http.request<{ content: DealEntity[] }>({
    url: '/api/deal/draft',
    method: 'POST',
    data,
  });
}

function updateDraftApi(data: IDealUpdate) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/update',
    method: 'POST',
    data,
  });
}

function submitDraftApi(data: { id: number }) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/submit',
    method: 'POST',
    data: {
      id: data.id,
    },
  });
}

function publishDraftApi(data: TargetDeal) {
  return http.request<string>({
    url: '/api/deal/publish',
    method: 'POST',
    data,
  });
}

function renewDealApi(data: TargetDeal) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/re-newal',
    method: 'POST',
    data,
  });
}

function queryDealByIdApi(data: QueryDealByIdApiRequest) {
  return http.request<{ content: DealEntity[] }>({
    url: '/api/deal/query/id',
    method: 'POST',
    data,
  });
}

function queryDealForDashboard(data: QueryDealForDashboard) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/dashboard',
    method: 'POST',
    data,
  });
}

// 文件上传
function getDealFileUploadApi(params: UploadDealFileModel) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: '/api/deal/file/upload',
    method: 'POST',
    data: params,
  });
}

function fileUploadApi(url: string, params: File) {
  return http.put(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// 统计数据获取
function getDealStatisticsApi(params: DealStatisticsQueryModel) {
  return http.request<{ content: DealStatistics[]; count: number }>({
    url: '/api/statistics/query/deal',
    method: 'POST',
    data: params,
  });
}

const api = {
  // 查询deal详情
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
  dealMarketplaceListApi,
  dealLandingPageListApi,
  createDraftApi,
  updateDraftApi,
  submitDraftApi,
  publishDraftApi,
  renewDealApi,
  queryDealByIdApi,
  queryDealForDashboard,
  getDealFileUploadApi,
  fileUploadApi,
  getDealStatisticsApi,
  commentFindByDealIDApi,
};

export default api;
