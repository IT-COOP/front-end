import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Close } from "../../assets/icons";

import { setCookie } from "../../utils/cookie";

import { plDefaultImgUrl } from "../../constants/defaultImages";

import Nickname from "./signUpView/Nickname";

import SignUpTaskAndStack from "./signUpView/SignUpTaskAndStack";
import UserProfileImgUpload from "./signUpView/UserProfileImgUpload";
import UserPortfolioUrl from "./signUpView/UserPortfolioUrl";
import UserSelfIntroduction from "./signUpView/UserSelfIntroduction";

import useCreateUserMutation from "../../hooks/useCreateUserMutation";

function SocialSignIn() {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    profileImgUrl: plDefaultImgUrl,
    technologyStack: [100],
    portfolioUrl: "",
  });

  const [defaultImageUrl, setDefaultImageUrl] = useState("");

  const navigate = useNavigate();

  const {
    mutateAsync: createUser,
    isSuccess: createSuccess,
    data: createdUserData,
  } = useCreateUserMutation();

  const handleNextChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const nextLi = currentLi.nextElementSibling;
    currentLi.classList.remove("z-10");
    currentLi.style.opacity = 0;
    nextLi.classList.add("z-10");
    nextLi.style.opacity = 1;
  };

  const handlePrevChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const prevLi = currentLi.previousElementSibling;
    currentLi.classList.remove("z-10");
    currentLi.style.opacity = 0;
    prevLi.classList.add("z-10");
    prevLi.style.opacity = 1;
  };

  const handleProfileImg = profileImgUrl => {
    setUserInfo(prev => ({ ...prev, profileImgUrl }));
  };

  const handleUserNickname = nickname => {
    setUserInfo(prev => ({ ...prev, nickname }));
  };

  const handleSelectedTask = technologyStack => {
    setUserInfo(prev => ({
      ...prev,
      technologyStack,
    }));
  };

  const handleSelectedStacks = technologyStack => {
    setUserInfo(prev => ({
      ...prev,
      technologyStack: [...prev.technologyStack, technologyStack],
    }));
  };

  const handleremoveStacks = technologyStack => {
    setUserInfo(prev => ({
      ...prev,
      technologyStack: [...prev.technologyStack].filter(
        stack => stack !== technologyStack,
      ),
    }));
  };

  const handlePortfolioUrl = portfolioUrl => {
    setUserInfo(prev => ({ ...prev, portfolioUrl }));
  };

  const closeModal = e => {
    if (e.target.nodeName === "svg") {
      localStorage.removeItem("coopToken");
      navigate("/");
    }
  };

  const handleSelfIntroduction = selfIntroduction => {
    setUserInfo(prev => ({ ...prev, selfIntroduction }));
  };

  const handleDefaultImg = profileImgUrl => {
    setDefaultImageUrl(profileImgUrl);
    setUserInfo(prev => ({ ...prev, profileImgUrl }));
  };

  const submitUserData = async () => {
    const taskAndStack = [...userInfo.technologyStack].join(",");
    const userData = {
      ...userInfo,
      technologyStack: taskAndStack,
    };
    createUser(userData);
  };

  useEffect(() => {
    if (createSuccess) {
      localStorage.setItem("coopToken", createdUserData?.accessToken);
      setCookie("coopCookie", createdUserData?.refreshToken);
      navigate("/", { replace: true });
    }
  }, [
    createSuccess,
    createdUserData?.accessToken,
    createdUserData?.refreshToken,
    navigate,
  ]);

  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <ul className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] ">
        <button
          className="absolute top-[14px] right-[14px] z-50"
          onClick={closeModal}
        >
          <Close className="fill-black" />
        </button>
        <Nickname
          handleNextChapter={handleNextChapter}
          handleUserNickname={handleUserNickname}
        />
        <SignUpTaskAndStack
          handleNextChapter={handleNextChapter}
          handlePrevChapter={handlePrevChapter}
          handleDefaultImg={handleDefaultImg}
          handleSelectedTask={handleSelectedTask}
          handleSelectedStacks={handleSelectedStacks}
          handleremoveStacks={handleremoveStacks}
        />
        <UserProfileImgUpload
          handlePrevChapter={handlePrevChapter}
          handleNextChapter={handleNextChapter}
          profileImgUrl={userInfo.profileImgUrl}
          handleProfileImg={handleProfileImg}
          defaultImageUrl={defaultImageUrl}
        />
        <UserPortfolioUrl
          handlePortfolioUrl={handlePortfolioUrl}
          handleNextChapter={handleNextChapter}
          handlePrevChapter={handlePrevChapter}
        />
        <UserSelfIntroduction
          handlePrevChapter={handlePrevChapter}
          handleSelfIntroduction={handleSelfIntroduction}
          submitUserData={submitUserData}
        />
      </ul>
    </section>
  );
}

export default SocialSignIn;
