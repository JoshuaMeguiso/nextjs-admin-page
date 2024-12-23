// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Your root reducer file

const store = configureStore({
  reducer: rootReducer, // Pass your root reducer here
  // Optionally, you can provide middleware, dev tools configuration, etc.
});

export default store;
