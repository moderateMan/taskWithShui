/* Core */
import { type PayloadAction } from '@reduxjs/toolkit';
import { IConnection } from 'src/service/model';
import names from '../names';
import thunks from './thunks';
import { createSliceCustom } from 'redux-eazy';

/* Types */
export interface SliceState {
  connectionFilter: string | null;
  connection: IConnection[];
  connectionRequests: IConnection[];
  connectionRequested: IConnection[];
  connectionIgnored: IConnection[];
  count: number;
  requestCount: number;
  requestedCount: number;
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    connectionFilter: null,
    connection: [],
    connectionRequests: [],
    connectionRequested: [],
    connectionIgnored: [],
    count: 0,
    requestCount: 0,
    requestedCount: 0,
    loading: false,
  };
};

const connectionSlice = createSliceCustom({
  name: names.notificationStore,
  stateInit: initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<{ content: IConnection[]; count: number }>) => {
      const { payload } = action;
      state.connection = payload.content;
      state.count = payload.count;
    },
    setConnectionRequests: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionRequests = payload.content;
      state.requestCount = payload.count;
    },
    setConnectionRequested: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionRequested = payload.content;
      state.requestedCount = payload.count;
    },
    setConnectionIgnored: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionIgnored = payload.content;
    },
    setConenctionFilter: (state, action: PayloadAction<string>) => {
      state.connectionFilter = action.payload;
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

export default connectionSlice;
