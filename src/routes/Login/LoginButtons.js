import React from "react";
import { Outlet } from "react-router-dom";
import { GoogleIcon, KakaoIcon, GitHubIcon } from '../../assets/icons/socialLogin';
import { Close } from '../../assets/icons';

const GITHUB_URL = process.env.REACT_APP_AUTH_GITHUB_URL;
const GOOGLE_URL = process.env.REACT_APP_AUTH_GOOGLE_URL;
const KAKAO_URL = process.env.REACT_APP_AUTH_KAKAO_URL;

function LoginButtons() {
  const moveToSocialLoginPage = url => () => window.location.replace(url);

  const buttonCss = `relative mb-4 p-4 sm:w-[300px] sm:h-[45px] rounded-[5px] font-bold text-[14px] mb-[10px]`
  const buttonIconCss = `absolute`
  const loginTitleCss = `text-[30px] mb-[32px] font-bold text-center sm:text-[20px] sm:mb-[40px]`
  return (
  <section className='fixed w-screen h-screen bg-black/70 flex justify-center items-center'>
    <section className="flex relative flex-col w-[800px] h-[570px] justify-center items-center sm:w-[337px] sm:h-[392px] bg-[#F9F9F9]  rounded-xl">
        <button className='absolute right-4 top-4'>
          <Close/>
        </button>
      <ul className='flex flex-col'>
        <li>
          <h1 className={`${loginTitleCss}`}>
              IT COOP에 오신것을 환영합니다!
          </h1>
          <p className='text-[14px] mb-[40px] text-center sm:mb-[31px]'>
            로그인이 필요한 서비스 입니다.
          </p>
        </li>
        <li className='flex flex-col'>
          <button className={`${buttonCss} bg-[#FEE500]`} onClick={moveToSocialLoginPage(KAKAO_URL)}>
            <KakaoIcon className={buttonIconCss}/>
            카카오로 시작하기
          </button>
          <button className={`${buttonCss} bg-white`} onClick={moveToSocialLoginPage(GOOGLE_URL)}>
            <GoogleIcon className='absolute'/>
            구글로 시작하기
          </button>
          <button className={`${buttonCss} bg-[#242424] text-white`} onClick={moveToSocialLoginPage(GITHUB_URL)}>
            <GitHubIcon className={buttonIconCss}/>
            GitHub로 시작하기
          </button>
        </li>
      </ul>      
      <Outlet/>
    </section>
  </section>
  );
}

export default LoginButtons;
