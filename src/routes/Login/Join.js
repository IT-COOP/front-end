import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import {
  setUserProfile,
  checkUserInfo,
} from "../../state/redux/module/userSlice";
import { Close, Prev } from "../../assets/icons";

function Join() {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("accessToken");

  useEffect(() => {
    dispatch(setUserProfile(userInfo));
  }, []);

  const handleUserData = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const userValue = { ...userInfo };
    userValue[inputName] = inputValue;
    setUserInfo(userValue);
    console.log(userInfo);
  };

  const handleNextChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const nextLi = currentLi.nextElementSibling;
    currentLi.classList.remove("z-10");
    nextLi.classList.add("z-10");
  };

  const handlePrevChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const prevLi = currentLi.previousElementSibling;
    currentLi.classList.remove("z-10");
    prevLi.classList.add("z-10");
  };

  const handleJoinSubmit = e => {
    e.preventDefault();
    dispatch(setUserProfile(userInfo));
  };

  const formLi = `flex flex-col absolute w-[800px] h-[500px] duration-700 rounded-[16px] bg-[#F9F9F9] sm:w-[100%] sm:h-[392px] sm:px-[20px]`;
  const formTitle = `text-center font-bold text-[30px] mt-[74px] mb-[32px] sm:mt-[55px] sm:mb-[36px] sm:text-[20px]  `;
  const formDesc = `text-center text-[20px] text-[#797979] mb-[40px] sm:mb-[60px] sm:text-[12px]`;
  const nextBtn = `mx-auto absolute bottom-[95px] left-[50%] font-bold text-[24px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] sm:w-[calc(100%-40px)] sm:h-[45px] sm:text-[14px] sm:bottom-[38px] sm:left-[50%] translate-x-[-50%]`;

  return (
    <section className="fixed w-screen h-screen z-50 flex items-center justify-center sm:px-[20px] transition-opacity">
      <ul className="relative w-[800px] h-[500px] flex sm:h-[392px]">
        <button className="absolute top-[14px] right-[14px] z-50">
          <Close />
        </button>
        <li className={`${formLi} z-10`}>
          <h1 className={formTitle}>
            <span className="sm:block">사용하실 닉네임을</span> 설정해주세요.
          </h1>
          <p className={`${formDesc}`}>
            <span>서비스를 이용할 때</span>사용되는 이름이에요!
          </p>
          <div className="mx-auto mb-[50px] sm:w-[100%] sm:mb-[45px] flex justify-between">
            <input
              type="text"
              className="border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px] sm:px-[10px] sm:py-[14px] sm:text-[12px] sm:w-[80%] sm:h-[42px]"
              placeholder="12자 이내로 입력해주세요"
              maxLength={12}
              name="nickname"
              onChange={handleUserData}
            />
            <button className="w-[117px] h-[72px] text-[24px] text-[#797979] bg-[#CCCCCC] rounded-[5px] sm:w-[60px] sm:h-[42px]  sm:text-[14px]">
              중복확인
            </button>
          </div>
          <button className={`${nextBtn}`} onClick={handleNextChapter}>
            다음으로
          </button>
        </li>
        <li className={`${formLi}`}>
          <button
            className="absolute top-[14px] left-[14px]"
            onClick={handlePrevChapter}
          >
            <Prev />
          </button>
          <h1 className={`${formTitle} mb-[85px] sm:mb-[15px]`}>
            <span className="sm:block">직군과 스택을</span> 설정해주세요.
          </h1>
          <div className="flex sm:flex-col items-center mx-[auto]">
            <p className="text-left font-bold text-[22px] mr-[28px] sm:mb-[12px]">
              직군
            </p>
            <ul className="flex sm:mb-[19px]">
              <li className="bg-[#c0c0c0] mr-[16px] text-[22px] px-[16px] py-[6px] rounded-[20px] sm:text-[12px] sm:mr-[8px] sm:px-[11px] sm:py-[3px]">
                프론트엔드
              </li>
              <li className="bg-[#c0c0c0] mr-[16px] text-[22px] px-[16px] py-[6px] rounded-[20px] sm:text-[12px] sm:mr-[8px] sm:px-[11px] sm:py-[3px]">
                백엔드
              </li>
              <li className="bg-[#c0c0c0] mr-[16px] text-[22px] px-[16px] py-[6px] rounded-[20px] sm:text-[12px] sm:mr-[8px] sm:px-[11px] sm:py-[3px]">
                디자이너
              </li>
              <li className="bg-[#c0c0c0] rounded-[20px] text-[22px] px-[16px] py-[6px] sm:text-[12px] sm:px-[11px] sm:py-[3px]">
                기획
              </li>
            </ul>
          </div>
          <div className="flex mx-[auto] sm:flex-col">
            <p className="text-left sm:mb-[2px] font-bold">스택</p>
            <select className="rounded-[5px] border-2 sm:w-[100%] sm:h-[45px] sm:px-[5px] sm:mb-[38px]">
              <option>ㅁㄴㅇㄹ</option>
              <option>ㅁㄴㅇㄹ</option>
              <option>ㅁㄴㅇㄹ</option>
              <option>ㅁㄴㅇㄹ</option>
              <option>ㅁㄴㅇㄹ</option>
            </select>
          </div>
          <button className={`${nextBtn}`} onClick={handleNextChapter}>
            다음으로
          </button>
        </li>
        <li className={`${formLi}`}>
          <button
            className="absolute top-[14px] left-[14px]"
            onClick={handlePrevChapter}
          >
            <Prev />
          </button>
          <h1 className={formTitle}>
            <span className="sm:block">사용하실 프로필 사진을</span>
            설정해주세요.
          </h1>
          <p className={`${formDesc}`}>
            서비스를 이용할 때 사용되는 이미지에요!
          </p>
          <div className="">
            <label></label>
            <input
              type="file"
              className=""
              placeholder="12자 이내로 입력해주세요"
              maxLength={12}
              name="nickname"
            />
          </div>
          <button className={`${nextBtn}`} onClick={handleNextChapter}>
            다음으로
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Join;
