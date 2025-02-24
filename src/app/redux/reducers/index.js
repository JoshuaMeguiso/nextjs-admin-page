// src/redux/reducers/index.js

import { combineReducers } from "@reduxjs/toolkit";
import collapseReducer from "./collapseSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  collapsed: collapseReducer,
  auth: userReducer,
});

export default rootReducer;
