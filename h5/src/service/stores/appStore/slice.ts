/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";

/* Types */
export interface SliceState {
	initUrl: string;
}

const initialState = (): SliceState => {
	return {
		initUrl: window.location.href,
	};
};

const appSlice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setAppInfo(state, action: PayloadAction<string>) {
		},
	},

	extraReducers: (builder) => {},
});

export default appSlice;
