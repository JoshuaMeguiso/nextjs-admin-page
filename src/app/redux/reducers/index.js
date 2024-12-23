// src/redux/reducers/index.js

import { combineReducers } from "@reduxjs/toolkit";
import collapseReducer from "./collapseSlice";

const rootReducer = combineReducers({
  collapsed: collapseReducer,
});

export default rootReducer;
