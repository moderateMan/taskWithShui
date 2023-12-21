/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import { DealEntity, DealType } from 'src/types/deal';
import { createSliceCustom } from 'redux-eazy';
import names from '../names';
import thunks from './thunks';
import { DealStatistics } from './model';

/* Types */
export interface SliceState {
  dealMarketList: DealEntity[];
  dealMarketListCounter: number | undefined;

  current_user_deals_list: DealEntity[];
  current_user_deals_list_counter: number;

  landingPageDealList: DealEntity[];
  landingPageDealListCounter: number;

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
}

const initialState = (): SliceState => {
  return {
    loading: false,
    dealMarketList: [],
    dealMarketListCounter: undefined,

    current_user_deals_list: [],
    current_user_deals_list_counter: 0,

    landingPageDealList: [],
    landingPageDealListCounter: 0,

    currentDeal: null,
    new_draft_type: DealType.CAPITAL_RAISING,
    new_draft: null,
    current_editing_id: null,
    currentEditingDraft: null,
    dealList: [],
    pageSize: 10,
    page: 0,
    count: 0,

    statistics: [],
    statistics_count: 0,
  };
};

const categorySlice = createSliceCustom({
  name: names.dealStore,
  stateInit: initialState,
  reducers: {
    // 设置交易产品列表
    setDealMarketList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.dealMarketList = payload;
    },
    setMarketListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.dealMarketListCounter = payload;
    },

    setCurrentUserDealsList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.current_user_deals_list = payload;
    },
    setCurrentUserDealsListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.current_user_deals_list_counter = payload;
    },

    setLandingPageDealList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.landingPageDealList = payload;
    },
    setLandingPageDealListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.landingPageDealListCounter = payload;
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

    // 设置statistics
    setStatistics: (state, action: PayloadAction<Array<DealStatistics>>) => {
      state.statistics = action.payload;
    },
    setStatisticsCount: (state, action: PayloadAction<number>) => {
      state.statistics_count = action.payload;
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
