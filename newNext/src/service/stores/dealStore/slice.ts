/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import { DealEntity, DealType } from 'src/types/deal';
import { createSliceCustom } from 'redux-eazy';
import names from '../names';
import thunks from './thunks';
import { DealStatistics } from './model';
import { ICommentWithReplies } from '../commentStore/model';
import { IOpportunity } from 'src/service/model';
export interface PaginationData {
  pageNum: number;
  pageCount: number;
  pageSize: number;
}
/* Types */
export interface SliceState {
  targetType: DealType;
  loading: boolean;
  currentDeal: DealEntity | null;

  new_draft_type: DealType;
  new_draft: DealEntity | null;

  current_editing_id: number | null;
  currentEditingDraft: DealEntity | null;

  dealList: Array<DealEntity>;
  page: number;
  pageSize: number;
  count: number;

  // statistics, deal相关的统计数据
  statistics: Array<DealStatistics>;
  statistics_count: number;

  current_user_deals_list: DealEntity[];
  current_user_deals_list_counter: number;

  dealMarketList: DealEntity[];
  dealMarketListPageNum: number | undefined;

  // **deal详情页**
  // 当前详情的deal id
  currentDealId: number;
  // 当前详情
  dealDetail?: DealEntity | null;
  // 评论翻页数据
  dealComentPagination: PaginationData;
  comments: ICommentWithReplies[];
  wishList: IOpportunity[]; // for Opportunities
  likeList: DealEntity[]; // for Deals
}

const initialState = (): SliceState => {
  return {
    targetType: DealType.CAPITAL_RAISING,
    loading: false,
    currentDeal: null,
    new_draft_type: DealType.CAPITAL_RAISING,
    new_draft: null,
    current_editing_id: null,
    currentEditingDraft: null,
    dealList: [],
    pageSize: 8,
    page: 1,
    count: 0,
    statistics: [],
    statistics_count: 0,
    // 当前用户的deal列表
    current_user_deals_list: [],
    current_user_deals_list_counter: 1,
    // 市场页-列表数据
    dealMarketList: [],
    dealMarketListPageNum: 1,
    // **deal详情**
    dealDetail: null,
    currentDealId: NaN,
    // 评论翻页数据
    wishList: [],
    likeList: [],
    comments: [],
    dealComentPagination: {
      pageNum: 1,
      pageCount: 0,
      pageSize: 6,
    },
  };
};

const categorySlice = createSliceCustom({
  name: names.dealStore,
  stateInit: initialState,
  reducers: {
    // **deal详情页面**
    // 当前deal的id
    setCurrentDealId(state, action: PayloadAction<number>) {
      state.currentDealId = action.payload;
    },
    // 当前deal的详情信息
    setDealDetail(state, action: PayloadAction<DealEntity | null>) {
      state.dealDetail = action.payload;
    },
    //
    setDealType(state, action: PayloadAction<DealType>) {
      const { payload } = action;
      state.targetType = payload;
    },

    setCurrentUserDealsList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.current_user_deals_list = payload;
    },
    setCurrentUserDealsListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.current_user_deals_list_counter = payload;
    },

    setCurrentDeal(state, action: PayloadAction<DealEntity | null>) {
      state.currentDeal = action.payload;
    },
    // 设置草稿
    setDraft(state, action: PayloadAction<DealEntity>) {
      state.new_draft = action.payload;
    },
    // 设置当前草稿的类型
    setCurrentDraftingDealType: (state, action: PayloadAction<DealType>) => {
      state.new_draft_type = action.payload;
    },
    // 设置当前编辑的草稿
    setCurrentDraftingDeal: (state, action: PayloadAction<DealEntity>) => {
      state.currentEditingDraft = action.payload;
    },
    // 设置当前编辑的草稿的id
    setCurrentEditingDealId: (state, action: PayloadAction<number>) => {
      state.currentEditingDraft!.id = action.payload;
    },
    //
    setCurrentEditingDeal: (state, action: PayloadAction<DealEntity>) => {
      state.currentEditingDraft = action.payload;
    },

    //
    setListTotalCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setPageNum: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // 设置交易产品列表
    setMarketList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.dealMarketList = payload;
    },
    setMarketListPageNum: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.dealMarketListPageNum = payload;
    },
    setMarketListCount: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.count = payload;
    },
    // 设置statistics
    setStatistics: (state, action: PayloadAction<Array<DealStatistics>>) => {
      state.statistics = action.payload;
    },
    setStatisticsCount: (state, action: PayloadAction<number>) => {
      state.statistics_count = action.payload;
    },
    // **deal详情**
    // 评论翻页数据
    setDealComentPagination: (state, action: PayloadAction<Partial<PaginationData>>) => {
      const { payload } = action;
      state.dealComentPagination = {
        ...state.dealComentPagination,
        ...payload,
      };
    },
    setComments(state, action: PayloadAction<ICommentWithReplies[]>) {
      const { payload } = action;
      state.comments = payload;
    },
    setWishList(state, action: PayloadAction<IOpportunity[]>) {
      state.wishList = action.payload;
    },
    setLikeList(state, action: PayloadAction<DealEntity[]>) {
      state.likeList = action.payload;
    },
  },
  extraReducers: (builder) => {
    Object.values(thunks).forEach((thk) => {
      builder
        .addCase(thk.pending, (state) => {
          state.loading = true;
        })
        .addCase(thk.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(thk.rejected, (state, action) => {
          state.loading = false;
        });
    });
  },
});

export default categorySlice;
