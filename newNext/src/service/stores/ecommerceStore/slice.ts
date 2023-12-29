/* Core */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSliceCustom } from 'redux-eazy';
import { IOpportunity } from 'src/service/model';
import names from 'src/service/stores/names';
import { DealEntity } from 'src/types/deal';

/* Types */
export interface SliceState {
  wishList: IOpportunity[]; // for Opportunities
  likeList: DealEntity[]; // for Deals
  dealList: DealEntity[] | null;
  dealDetail?: DealEntity | null;
  currentDealId: number;
}

const initialState = (): SliceState => {
  return {
    wishList: [],
    likeList: [],
    dealList: null,
    dealDetail: null,
    currentDealId: NaN,
  };
};

const appSlice = createSliceCustom({
  name: names.ecommerceStore,
  stateInit: initialState,
  reducers: {
    setWishList(state, action: PayloadAction<IOpportunity[]>) {
      state.wishList = action.payload;
    },
    setLikeList(state, action: PayloadAction<DealEntity[]>) {
      state.likeList = action.payload;
    },
    setDealDetail(state, action: PayloadAction<DealEntity | null>) {
      state.dealDetail = action.payload;
    },
    setCurrentDealId(state, action: PayloadAction<number>) {
      state.currentDealId = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default appSlice;
