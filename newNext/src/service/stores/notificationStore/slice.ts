import { type PayloadAction } from '@reduxjs/toolkit';
import names from '../names';
import thunks from './thunks';
import { createSliceCustom } from 'redux-eazy';
import { INotification } from './model';
export interface SliceState {
  notification: INotification[]; // all notifications
  count: number;
  count_new: number;
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    notification: [],
    count: 0,
    count_new: 0,
    loading: false,
  };
};

const notificationSlice = createSliceCustom({
  name: names.notificationStore,
  stateInit: initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ content: INotification[]; count: number }>
    ) => {
      const { payload } = action;
      state.notification = payload.content;
      state.count = payload.count;
      // count new notifications
      state.count_new = payload.content.filter((item) => !item.is_read).length;
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

export default notificationSlice;
