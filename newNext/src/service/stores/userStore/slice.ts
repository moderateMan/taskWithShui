/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';
import { createSliceCustom } from 'redux-eazy';
import thunks from './thunks';
import names from '../names';

export interface ITalkjsUser {
  sendbird_id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

/* Types */
export interface SliceState {
  user_talkjs: ITalkjsUser | null;
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    user_talkjs: null,
    loading: false,
  };
};

const userSlice = createSliceCustom({
  name: names.notificationStore,
  stateInit: initialState,
  reducers: {
    setUserTalkjs: (
      state,
      action: PayloadAction<{
        content: ITalkjsUser;
      }>
    ) => {
      const { payload } = action;
      state.user_talkjs = payload.content;
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

export default userSlice;
