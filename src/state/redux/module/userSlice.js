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
      const result = await userApis.getUser(token);
      console.log(result)
      localStorage.setItem('token',result.data.data.authorization)
      return result.data.data.userInfo
    }catch{

    }
  }
)

export const userProfileSet = createAsyncThunk("user/set/profile",
  async (data, thunkAPI) =>{
    try{
      const result = await userApis.createUser(data)
      console.log(result)
      return result
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

    },
    [userProfileSet.pending.type] : (state)=>{

    },
    [userProfileSet.fulfilled.type] : (state,action)=>{
      console.log(action)
    },
    [userProfileSet.rejected.type] : (state)=>{

    }
  }
})



export default userSlice.reducer;  