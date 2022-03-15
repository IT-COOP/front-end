import { instance } from './axiosInstance';


export const userApis ={
  // 토큰 확인해서 회원가입한 사람이면 유저 정보 가져오고 아니면 빈 스트링 받음
  getUser : token =>
    instance.get("login/validation",{
      headers : {
        authorization :token
      }}
    ),

  //최초 로그인이나, 유저정보 튜토리얼 완성 안한 사람들 
  createUser : ({ data, token }) => 
    instance.post("login/completion",data,{
      headers : {
        authorization : token
      }
    }
    ),
  
  //유저 데이터 수정 
  userProfileEdit : data =>
    instance.post("api/",{
      data
    }),

  
} 

export default instance