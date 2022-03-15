import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Join from './Join';
import { socialLogin } from '../../state/redux/module/userSlice'

function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    searchParams.get("accessToken") ?? "",
  );
  const [isProfileSet,setIsProfileSet] = useState(
    searchParams.get("isProfileSet") ?? "",
  )
  const dispatch = useDispatch()
  const [token,setToken] = useState()
  const isFirst = useSelector(state=>state.user.isFirst);
  console.log(isFirst)

  const data = {
    userId : 'hty3466@naver.com',
    nickname : "13자ㅇㅋ",
    profileImgUrl : "https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F216C553953FC27C335&imgrefurl=https%3A%2F%2Fjcjj7504.tistory.com%2F397&tbnid=wrue_HXJTydnqM&vet=12ahUKEwjr_JOxrsL2AhWOAd4KHVOAA8cQMygCegUIARC1AQ..i&docid=43cbDH0OM423-M&w=540&h=357&q=%EA%B3%A0%EC%96%91%EC%9D%B4%EC%82%AC%EC%A7%84&ved=2ahUKEwjr_JOxrsL2AhWOAd4KHVOAA8cQMygCegUIARC1AQ",
    technologyStack:'react',
    activityPoint: 5,
    selfIntroduction: '개빡세네 ㅎㅎ',
    portfolioUrl:'https://naver.com'
  }
  useEffect(() => {
    console.log(accessToken)
    console.log(isProfileSet)
    localStorage.setItem('token',accessToken)
    //dispatch(socialLogin(accessToken))
    //setSearchParams({});
  }, [setSearchParams]);

  return(
      <>
        <Join/>
      </>
      )  
}

export default Test;
