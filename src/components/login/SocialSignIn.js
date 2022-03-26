import React from "react";
import { Outlet } from "react-router-dom";
import {
  GoogleIcon,
  KakaoIcon,
  GitHubIcon,
} from "../../assets/icons/socialLogin";
import { Close } from "../../assets/icons";

const GITHUB_URL = process.env.REACT_APP_AUTH_GITHUB_URL;
const GOOGLE_URL = process.env.REACT_APP_AUTH_GOOGLE_URL;
const KAKAO_URL = process.env.REACT_APP_AUTH_KAKAO_URL;

function SocialSignIn({ closeSignInModal }) {
  const moveToSocialLoginPage = url => () => window.location.replace(url);
  const socialBtnCss = `relative mb-4 mx-auto w-[300px] h-[46px] px-[12px] pl-[48px] rounded-[12px] font-bold text-[14px] shadow-md`;
  const btnIconCss = `absolute left-[16px]`;
  const loginTitleCss = `text-[30px] mb-[32px] font-bold text-center `;

  const closeModal = e => {
    if (e.target.nodeName === "svg" || e.target.nodeName === "SECTION") {
      closeSignInModal(false);
    }
  };

  return (
    <section
      className="fixed top-0 flex z-[999] items-center justify-center w-screen h-screen bg-black/70 "
      onClick={closeModal}
    >
      <div className="flex relative flex-col bg-[#F9F9F9] rounded-[15px] w-[800px] h-[500px] px-[50px] justify-center items-center">
        <button className="absolute right-4 top-4">
          <Close className="fill-black" />
        </button>
        <ul className="flex flex-col w-[100%]">
          <li>
            <h1 className={`${loginTitleCss}`}>
              <span className="sm:block">IT COOP에</span> 오신것을 환영합니다!
            </h1>
            <p className="text-[20px] mb-[40px] text-center ">
              로그인이 필요한 서비스 입니다.
            </p>
          </li>
          <li className="flex flex-col">
            <button
              className={`${socialBtnCss} bg-[#FEE500]`}
              onClick={moveToSocialLoginPage(KAKAO_URL)}
            >
              <KakaoIcon className={btnIconCss} />
              카카오로 시작하기
            </button>
            <button
              className={`${socialBtnCss} bg-white`}
              onClick={moveToSocialLoginPage(GOOGLE_URL)}
            >
              <GoogleIcon className={btnIconCss} />
              구글로 시작하기
            </button>
            <button
              className={`${socialBtnCss} bg-[#242424] text-white`}
              onClick={moveToSocialLoginPage(GITHUB_URL)}
            >
              <GitHubIcon className={btnIconCss} />
              GitHub로 시작하기
            </button>
          </li>
        </ul>
        <Outlet />
      </div>
    </section>
  );
}

export default SocialSignIn;
