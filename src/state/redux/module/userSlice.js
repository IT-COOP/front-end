import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userApis } from "../../apis/userApi";

const initialState = {
  userInfo: null,
  isFirst: false,
};

export const checkUserInfo = createAsyncThunk(
  "user/checkUserInfo",
  async (token, thunkAPI) => {
    try {
      const response = await userApis.checkUser(token);
      console.log(response);
      return response.data.data.userInfo;
    } catch {}
  },
);

export const setUserProfile = createAsyncThunk(
  "user/setProfile",
  async (data, thunkAPI) => {
    try {
      const response = await userApis.createUser(data);
      console.log(response);
      return response;
    } catch {}
  },
);

export const editUserProfile = createAsyncThunk(
  "user/editProfile",
  async (data, thunkAPI) => {
    try {
    } catch {}
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkUserInfo.pending, (state, action) => {
        console.log(action);
      })
      .addCase(checkUserInfo.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(checkUserInfo.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default userSlice.reducer;
