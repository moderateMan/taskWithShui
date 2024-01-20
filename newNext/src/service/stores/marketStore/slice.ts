/* Core */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSliceCustom } from 'redux-eazy';
import names from 'src/service/stores/names';
import { DealEntity, DealType } from 'src/types/deal';

/* Types */
export interface SliceState {
  // 旧设计留下的字段 暂时不知道是否deprecated 留着吧
  searchPostCode: number | undefined;
  postCode: number | undefined;
  title: string;
  // 第一阶段只需要Deal， 所以只需要Deal相关的字段, 实际上， 一开始
  searchData: string | undefined;
  marketDealType: DealType | undefined; // null 代表全部
  page: number;
  pageSize: number;
  dealMarketListCount: number;
  landingPageDealList: DealEntity[];
  landingPageDealListCounter: number;
  dealMarketList: DealEntity[];
  dealMarketListPageNum: number | undefined;
}

const initialState = (): SliceState => {
  return {
    searchPostCode: 0,
    postCode: 0,
    title: '',
    pageSize: 8,
    page: 1,
    searchData: '',
    marketDealType: DealType.ALL,
    // 首页-列表数据
    landingPageDealList: [],
    landingPageDealListCounter: 1,
    // 市场页-列表数据
    dealMarketList: [],
    dealMarketListPageNum: 1,
    dealMarketListCount: 0,
  };
};

const marketSlice = createSliceCustom({
  name: names.marketStore,
  stateInit: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // 旧设计留下的字段 暂时不知道是否deprecated 留着吧
    setSearchPostCode(state, { payload }: PayloadAction<number | undefined>) {
      state.searchPostCode = payload;
    },
    setPostCode(state, { payload }: PayloadAction<number | undefined>) {
      state.postCode = payload;
    },
    // 第一阶段只需要Deal， 所以只需要Deal相关的字段
    setSeachParams(state, { payload }: PayloadAction<string>) {
      state.searchData = payload;
    },
    setMarketDealType(state, { payload }: PayloadAction<DealType | undefined>) {
      state.marketDealType = payload;
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
      state.dealMarketListCount = payload;
    },
    setLandingDealList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.landingPageDealList = payload;
    },
    setLandingDealListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.landingPageDealListCounter = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default marketSlice;
