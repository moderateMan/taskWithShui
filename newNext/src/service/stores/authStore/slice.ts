/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import { IUser } from 'src/service/model';
import { createSliceCustom } from 'redux-eazy';
import storageHelper from 'src/commonOld/utils/storageHelper';
import names from '../names';
import thunks from './thunks';

/* Types */
export interface SliceState {
  loading: boolean;
  isPartner: boolean;

  // user auth token
  token: string;
  userInfo: IUser | null;

  email_verified: boolean;
  email_verification_result: string;
  email_verification_resend: boolean;

  // after change passwordAct is performed this is the response
  changePasswordResponse: any;

  landing_temp_password: string;
}

const initialState = (): SliceState => {
  return {
    loading: false,
    isPartner: false,
    token: storageHelper.getItem('ACCESS_TOKEN') || '',
    userInfo: null,
    email_verified: false,
    email_verification_result: '',
    email_verification_resend: false,
    landing_temp_password: 'yghbnGTTV18dIM8314',

    changePasswordResponse: null,
  };
};
export type AuthSlice = typeof authSlice;

const authSlice = createSliceCustom({
  name: names.authStore,
  stateInit: initialState,
  reducers: {
    // 设置是否是
    setIsPartner(state, action: PayloadAction<boolean>) {
      state.isPartner = action.payload;
    },
    // 设置用户信息
    setToken: (state, action: PayloadAction<string | null>) => {
      const { payload } = action;
      if (payload && Object.values(payload).length) {
        state.token = payload;
        storageHelper.setItem('ACCESS_TOKEN', payload);
      } else {
        state.token = '';
        storageHelper.removeItem('ACCESS_TOKEN');
      }
    },
    setUserInfoMember: (state, action: PayloadAction<IUser>) => {
      const { payload } = action;
      state.userInfo = payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      const { payload } = action;
      state.loading = payload;
    },
    setEmailVerified(state, action: PayloadAction<string>) {
      const { payload } = action;
      console.log('email token', payload);

      state.email_verification_result = payload;
    },

    setPasswordChangeResponse(state, action: PayloadAction<any>) {
      const { payload } = action;
      state.changePasswordResponse = payload;
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

export default authSlice;
