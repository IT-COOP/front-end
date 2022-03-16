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

function LoginButtons() {
  const moveToSocialLoginPage = url => () => window.location.replace(url);

  const buttonCss = `relative mb-4 p-4 sm:w-[100%] sm:h-[45px] rounded-[5px] font-bold text-[14px] mb-[10px] shadow-md`;
  const buttonIconCss = `absolute`;
  const loginTitleCss = `text-[30px] mb-[32px] font-bold text-center sm:text-[20px] sm:mb-[40px]`;
  return (
    <section className="fixed w-screen h-screen bg-black/70 flex justify-center items-center sm:px-[20px]">
      <section className="flex relative flex-col bg-[#F9F9F9] rounded-[15px] w-[800px] h-[570px] justify-center items-center sm:w-screen sm:h-[392px] sm:px-[10px]">
        <button className="absolute right-4 top-4">
          <Close />
        </button>
        <ul className="flex flex-col w-[100%]">
          <li>
            <h1 className={`${loginTitleCss}`}>
              <span className="sm:block">IT COOP에</span> 오신것을 환영합니다!
            </h1>
            <p className="text-[14px] mb-[40px] text-center sm:mb-[31px]">
              로그인이 필요한 서비스 입니다.
            </p>
          </li>
          <li className="flex flex-col">
            <button
              className={`${buttonCss} bg-[#FEE500]`}
              onClick={moveToSocialLoginPage(KAKAO_URL)}
            >
              <KakaoIcon className={buttonIconCss} />
              카카오로 시작하기
            </button>
            <button
              className={`${buttonCss} bg-white`}
              onClick={moveToSocialLoginPage(GOOGLE_URL)}
            >
              <GoogleIcon className={buttonIconCss} />
              구글로 시작하기
            </button>
            <button
              className={`${buttonCss} bg-[#242424] text-white`}
              onClick={moveToSocialLoginPage(GITHUB_URL)}
            >
              <GitHubIcon className={buttonIconCss} />
              GitHub로 시작하기
            </button>
          </li>
        </ul>
        <Outlet />
      </section>
    </section>
  );
}

export default LoginButtons;
