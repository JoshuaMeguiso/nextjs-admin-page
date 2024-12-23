// src/redux/reducers/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapse: false,
};

const collapseSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCollapse: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setCollapse } = collapseSlice.actions;
export default collapseSlice.reducer;
