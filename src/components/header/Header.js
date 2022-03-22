import React from "react";
import { Logo, Bell, DownArrow } from "../../assets/icons";

function Header() {
  return (
    <header className="w-full top-0 left-0 right-0 mx-[auto] py-[12px] z-[999] fixed  bg-white">
      <div className="w-[1224px] mx-[auto] flex items-start justify-between">
        <div>
          <Logo />
        </div>
        <nav>
          <ul className="flex gap-[44px] items-center text-[22px] leading-[27.54px]">
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">협업 페이지</li>
            <li className="cursor-pointer">
              <Bell />
            </li>
            <li className="cursor-pointer">로그인</li>
            <li className="relative cursor-pointer">
              <div className="flex items-center ">
                <img
                  className="w-[44px] h-[44px] rounded-[50%] mr-[10px]"
                  src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
                  alt="유저 프로필"
                />
                <DownArrow className="inline-block" />
              </div>
              <ul className="absolute border-[1px] mt-[8px] -right-[25px] border-gray2 w-[180px] leading-[40px] rounded-[4px] bg-white">
                <div className="absolute border-t-[1px] border-l-[1px] -top-[9px] right-[23.5px] border-gray2  w-[16px] h-[16px] bg-white rotate-45"></div>
                <li className="pl-[10px]">마이페이지</li>
                <li className="pl-[10px]">로그아웃</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
