import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkUserInfo } from "./state/redux/module/userSlice";
import { setCookie, getCookie, deleteCookie } from "./utils/cookie";
import LoginButtons from "./routes/Login/LoginButtons";
import Join from "./routes/Login/Join";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    searchParams.get("accessToken") ?? "",
  );
  const [isProfileSet, setIsProfileSet] = useState(
    searchParams.get("isProfileSet") ?? "",
  );
  const [socialModal, setSoialModal] = useState(false);
  const isLogin = useSelector(state => state.user.userInfo);
  let isFirst = true;
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("coopToken", accessToken);
    if (isProfileSet === "false") {
    } else {
      dispatch(checkUserInfo(accessToken));
    }

    setSearchParams({});
  }, [setSearchParams]);

  const openSocialModal = () => {
    setSoialModal(true);
    localStorage.setItem("coopToken", "asdffasd");
    dispatch(checkUserInfo(accessToken));
  };
  const closeSocialModal = value => {
    setSoialModal(value);
  };
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200">
      <nav className="fixed cursor-pointer top-10 right-10">
        {isLogin ? (
          <button>로그아웃</button>
        ) : (
          <button onClick={openSocialModal}>로그인</button>
        )}
      </nav>
      {isFirst && <Join />}
      {socialModal && <LoginButtons closeSocialModal={closeSocialModal} />}
      <p className="font-bold text-red-400 uppercase">welcome to tailwind</p>
      <p className="font-bold text-red-400 uppercase">
        setup by semyung oh & taeyoung hwang
      </p>
    </main>
  );
}

export default App;
