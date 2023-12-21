/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import { IUserEnquiry } from 'src/service/model';
import { createSliceCustom } from 'redux-eazy';
import names from '../names';
import thunks from './thunks';

/* Types */
export interface SliceState {
  totalCount: number;
  user_enquiry: IUserEnquiry[];
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    totalCount: 0,
    user_enquiry: [],
    loading: false,
  };
};

const user_enquirySlice = createSliceCustom({
  name: names.enquiryStore,
  stateInit: initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.totalCount = payload;
    },
    setUserEnquiry: (state, action: PayloadAction<IUserEnquiry[]>) => {
      const { payload } = action;
      state.user_enquiry = payload;
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

export default user_enquirySlice;
