import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo, Bell, DownArrow } from "../../assets/icons";
import SignUp from "../login/SignUp";
import SocialSignIn from "../login/SocialSignIn";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import { deleteCookie } from "../../utils/cookie";

function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMyPageModalOpen, setIsMyPageModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { data } = useGetUserInfoQuery(localStorage.getItem("coopToken"));
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setIsSignUpModalOpen(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (data) {
      setUser(data.userInfo);
    }
  }, [data]);

  console.log(data);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };
  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };
  const closeSignUpModal = () => {
    localStorage.removeItem("coopToken");
    setIsSignUpModalOpen(false);
  };

  const toggleMyPageModal = () => {
    setIsMyPageModalOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("coopToken");
    deleteCookie("coopCokie");
    window.location.replace("/");
  };

  return (
    <>
      {isSignInModalOpen && (
        <SocialSignIn closeSignInModal={closeSignInModal} />
      )}
      {isSignUpModalOpen && <SignUp closeSignUpModal={closeSignUpModal} />}
      <header className="w-full top-0 left-0 right-0 mx-auto py-[12px] z-[900] fixed  bg-white shadow-[0_4px_4px_-4px_rgba(0,0,0,0.3)]">
        <div className="w-[1224px] mx-auto flex items-center justify-between">
          <div>
            <NavLink to="/">
              <Logo />
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
              {!user ? (
                <li className="cursor-pointer" onClick={openSignInModal}>
                  로그인
                </li>
              ) : (
                <li className="relative cursor-pointer">
                  <div
                    className="flex items-center "
                    onClick={toggleMyPageModal}
                  >
                    <img
                      className="w-[44px] h-[44px] rounded-full mr-[10px]"
                      src={user?.profileImgUrl}
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
                          to="/mypage"
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
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;