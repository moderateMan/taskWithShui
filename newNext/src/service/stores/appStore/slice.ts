/* Core */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSliceCustom } from 'redux-eazy';
import { IGeo } from 'src/service/model/geo';
import names from '../names';

/* Types */
export interface SliceState {
  geoData: IGeo[];
  info: string;
}

const initialState = (): SliceState => {
  return {
    geoData: [],
    info: 'test',
  };
};

const appSlice = createSliceCustom({
  name: names.appStore,
  stateInit: initialState,
  reducers: {
    setInfo(state, action: PayloadAction<string>) {
      state.info = action.payload;
    },
    setGeoData(state, action: PayloadAction<IGeo[]>) {
      state.geoData = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default appSlice;
