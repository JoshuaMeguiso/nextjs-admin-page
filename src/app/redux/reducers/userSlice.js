import { createSlice } from "@reduxjs/toolkit";
import isEmpty from "../../validation/is-empty";
import setAuthToken from "@/app/utilities/setAuthToken";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = !isEmpty(action.payload); // Use semicolon
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setAuthentication, clearUser } = userSlice.actions;
export default userSlice.reducer;
