/* Core */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSliceCustom } from 'redux-eazy';
import names from 'src/service/stores/names';
import { DealType } from 'src/types/deal';

/* Types */
export interface SliceState {
  // 旧设计留下的字段 暂时不知道是否deprecated 留着吧
  searchPostCode: number | undefined;
  postCode: number | undefined;
  title: string;
  // 第一阶段只需要Deal， 所以只需要Deal相关的字段, 实际上， 一开始
  seachParams: {
    name: string | undefined;
    category: string | undefined;
  };
  marketDealType: DealType | undefined; // null 代表全部
}

const initialState = (): SliceState => {
  return {
    searchPostCode: 0,
    postCode: 0,
    title: '',

    seachParams: {
      name: undefined,
      category: undefined,
    },
    marketDealType: DealType.ALL,
  };
};

const appSlice = createSliceCustom({
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
    setTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },

    // 第一阶段只需要Deal， 所以只需要Deal相关的字段
    setSeachParams(
      state,
      { payload }: PayloadAction<{ name: string | undefined; category: string | undefined }>
    ) {
      state.seachParams = payload;
    },
    setMarketDealType(state, { payload }: PayloadAction<DealType | undefined>) {
      state.marketDealType = payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export default appSlice;
