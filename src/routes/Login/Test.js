import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Join from "./Join";
import { checkUserInfo } from "../../state/redux/module/userSlice";

function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    searchParams.get("accessToken") ?? "",
  );
  const [isProfileSet, setIsProfileSet] = useState(
    searchParams.get("isProfileSet") ?? "",
  );
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const isFirst = useSelector(state => state.user.isFirst);
  console.log(isFirst);

  const data = {
    nickname: "12자이내",
    profileImgUrl:
      "https://images.mypetlife.co.kr/content/uploads/2019/12/09152000/3418e09ad3dea830a19b2996a6098fd7.jpg",
    technologyStack: "react",
    activityPoint: 5,
    selfIntroduction: "",
    portfolioUrl: "https://naver.com",
  };
  useEffect(() => {
    console.log(accessToken);
    console.log(isProfileSet);
    localStorage.setItem("token", accessToken);
    dispatch(checkUserInfo(accessToken));
    //setSearchParams({});
  }, [setSearchParams]);

  return (
    <>
      <Join />
    </>
  );
}

export default Test;
