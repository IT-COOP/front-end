import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";

import { Bell, DownArrow } from "../../assets/icons";
import SocialSignIn from "../login/SocialSignIn";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import { deleteCookie } from "../../utils/cookie";

function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isMyPageModalOpen, setIsMyPageModalOpen] = useState(false);

  const { data: userData, isLoading } = useGetUserInfoQuery();

  const client = useQueryClient();
  const isUserLogin = Boolean(userData);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const toggleMyPageModal = () => {
    setIsMyPageModalOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("coopToken");
    deleteCookie("coopCookie");
    client.clear();
    window.location.replace("/");
  };

  return (
    <>
      {isSignInModalOpen && (
        <SocialSignIn closeSignInModal={closeSignInModal} />
      )}
      <header className="w-full sticky top-0 mx-auto py-[12px] z-10 bg-white shadow-[0_4px_4px_-4px_rgba(0,0,0,0.3)]">
        <div className="w-[1224px] mx-auto flex items-center justify-between">
          <div>
            <NavLink to="/">
              <img
                src="https://s3.ap-northeast-2.amazonaws.com/it-coop.co.kr/images/Logo.png"
                alt="itcoop banner"
                className="w-[84px] h-[28px]"
              />
            </NavLink>
          </div>
          <nav>
            <ul className="flex gap-[44px] items-center text-[17px]">
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">
                <NavLink to="/">협업 페이지</NavLink>
              </li>
              <li className="cursor-pointer">
                <Bell />
              </li>

              {isLoading ? (
                <div className="w-[82px] h-[21px] animate-pulse bg-white2" />
              ) : isUserLogin ? (
                <li className="relative cursor-pointer">
                  <div
                    className="flex items-center "
                    onClick={toggleMyPageModal}
                  >
                    <img
                      className="w-[44px] h-[44px] rounded-full mr-[10px]"
                      src={userData.profileImgUrl}
                      alt="유저 프로필"
                    />
                    <DownArrow className="inline-block" />
                  </div>
                  {isMyPageModalOpen && (
                    <ul className="absolute border-[1px] mt-[8px] -right-[25px] border-gray2 w-[180px] leading-[40px] rounded-[4px] bg-white ">
                      <div className="absolute border-t-[1px] border-l-[1px] -top-[9px] right-[23.5px] border-gray2  w-[16px] h-[16px] bg-white rotate-45"></div>
                      <li>
                        <NavLink
                          className=" pl-[10px] block leading-[40px]"
                          to={`/user/${userData.userId}`}
                        >
                          마이페이지
                        </NavLink>
                      </li>
                      <li
                        className="pl-[10px] leading-[40px]"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className="cursor-pointer" onClick={openSignInModal}>
                  로그인
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
