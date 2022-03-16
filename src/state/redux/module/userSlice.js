import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userApis } from "../../apis/userApi";

const initialState = {
  userInfo: {},
  isLogin: false,
  isFirst: false,
};

export const socialLogin = createAsyncThunk(
  "user/sociallogin",
  async (token, thunkAPI) => {
    try {
      const response = await userApis.getUser(token);
      return response.data.data.userInfo;
    } catch {}
  },
);

export const setUserProfile = createAsyncThunk(
  "user/set/profile",
  async (data, thunkAPI) => {
    try {
      const response = await userApis.createUser(data);
      console.log(response);
      return response;
    } catch {}
  },
);

export const editUserProfile = createAsyncThunk(
  "user/edit/profile",
  async (data, thunkAPI) => {
    try {
    } catch {}
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [socialLogin.pending.type]: state => {
      state.status = "lodding";
    },
    [socialLogin.fulfilled.type]: (state, action) => {},
    [socialLogin.rejected.type]: state => {},
    [setUserProfile.pending.type]: state => {},
    [setUserProfile.fulfilled.type]: (state, action) => {
      console.log(action);
    },
    [setUserProfile.rejected.type]: state => {},
  },
});

export default userSlice.reducer;
