import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApis } from '../../apis/userApi'


const initialState = {
  userInfo:{
  },
  isLogin:false,
  isFirst:false,
}

export const socialLogin = createAsyncThunk("user/sociallogin",
  async (token, thunkAPI) =>{
    try{
      console.log(token)
      const result = await userApis.getUser(token);
      console.log(result)
      return true
    }catch{

    }
  }
)

export const userProfileSet = createAsyncThunk("user/set/profile",
  async (data, thunkAPI) =>{
    try{

    }catch{

    }
  }
)

export const userProfileEdit = createAsyncThunk("user/edit/profile",
  async (data, thunkAPI) =>{
    try{

    }catch{

    }
  }
)



const userSlice = createSlice({
  name:"user",
  initialState,
  extraReducers :{
    [socialLogin.pending.type] : (state) => {
      state.status = 'lodding'
    },
    [socialLogin.fulfilled.type] : (state,action) =>{

    },
    [socialLogin.rejected.type] : (state) =>{

    }
  }
})



export default userSlice.reducer;  