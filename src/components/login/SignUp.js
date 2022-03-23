import React, { useState } from "react";
import Select from "react-select";
import { Close, Prev } from "../../assets/icons";
import classNames from "classnames";
// import { Stack, Task } from "../../constants/enums";

function SocialSignIn({ closeSignUpModal }) {
  // const [userInfo, setUserInfo] = useState({});
  const [nicknameConfirm, setConfirm] = useState(false);
  // const [selectStack, setStack] = useState({});

  const options = [
    { a: "apple", label: "Apple" },
    { a: "banana", label: "Banana" },
    { a: "orange", label: "Orange" },
    { a: "berry", label: "Berry" },
  ];

  const confirmUserNickname = e => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const nickname = e.target.value;
    // const inputName = e.target.name;
    regex.test(nickname);
    if (regex.test(nickname) & (nickname.length > 1) & (nickname.length <= 8)) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  const closeModal = e => {
    if (e.target.nodeName === "svg") {
      closeSignUpModal();
    }
  };

  // const handleUserData = e => {
  //   const inputName = e.target.name;
  //   const inputValue = e.target.value;
  //   const userValue = { ...userInfo };
  //   userValue[inputName] = inputValue;
  //   setUserInfo(userValue);
  //   console.log(userInfo);
  // };

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

  const handleSelectStack = e => {
    return false;
  };

  // const handleJoinSubmit = e => {
  //   e.preventDefault();
  // };

  const formLi = `flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px]`;
  const formTitle = `text-center font-bold text-[30px] mt-[74px] mb-[32px] `;
  const formDesc = `text-center text-[20px] text-[#797979] mb-[40px] `;
  const nextBtn = `mx-auto font-bold text-[24px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] `;

  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <ul className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden">
        <button
          className="absolute top-[14px] right-[14px] z-50"
          onClick={closeModal}
        >
          <Close />
        </button>
        <li className={`${formLi} z-10 opacity-100`}>
          <h1 className={formTitle}>사용하실 닉네임을 설정해주세요.</h1>
          <p className={`${formDesc}`}>
            서비스를 이용할 때사용되는 이름이에요!
          </p>
          <div className="mb-[6px] flex justify-between">
            <input
              type="text"
              className="border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px]"
              placeholder="2~8자 이내로 입력해주세요"
              maxLength={8}
              name="nickname"
              onChange={confirmUserNickname}
            />
            <button
              className={classNames(
                "w-[117px] h-[72px] text-[24px]   rounded-[5px]",
                {
                  "pointer-events-none bg-[#CCCCCC] text-gray4":
                    !nicknameConfirm,
                  "pointer-events-auto bg-blue text-white": nicknameConfirm,
                },
              )}
            >
              중복확인
            </button>
          </div>
          <p className="mb-[20px] text-[20px] leading-[25.04px] text-gray4">
            {"닉네임은 공백잆어 한글/영문/숫자만 가능합니다"}
          </p>
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
          <h1 className={`${formTitle} mb-[33px]`}>
            <span>직군과 스택을</span> 설정해주세요.
          </h1>
          <div className="flex items-center mb-[25px] ">
            <p className="text-left text-[24px] leading-[30.05px] mr-[26px] text-gray4">
              직군
            </p>
            <div className="flex">
              <button className="bg-gray1 text-gray4 mr-[16px] text-[17px] px-[16px] py-[6px] rounded-[20px]">
                프론트엔드
              </button>
              <button className="bg-gray1 text-gray4 mr-[16px] text-[17px] px-[16px] py-[6px] rounded-[20px]">
                백엔드
              </button>
              <button className="bg-gray1 text-gray4 mr-[16px] text-[17px] px-[16px] py-[6px] rounded-[20px]">
                디자이너
              </button>
              <button className="bg-gray1 text-gray4 rounded-[17px] text-[20px] px-[16px] py-[6px] ">
                기획
              </button>
            </div>
          </div>
          <div className="flex stack">
            <p className="text-left text-[24px] leading-[30.05px] mr-[26px] text-gray4">
              스택
            </p>
            <div className="flex-1">
              <Select
                isMulti
                options={options}
                onChange={handleSelectStack}
                placeholder="스택을 선택해주세요"
              />
              <p className="leading-[40px] text-[20px] text-gray4 mb-[63px]">
                최소 1개부터 최대 3개까지 선택 해주세요!
              </p>
            </div>
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
          <h1 className={formTitle}>사용하실 프로필 사진을 설정해주세요.</h1>
          <p className={`${formDesc}`}>
            서비스를 이용할 때 사용되는 이미지에요!
          </p>
          <div className="">
            <label></label>
            <input type="file" className="" />
          </div>
          <button className={`${nextBtn}`} onClick={handleNextChapter}>
            완료하기
          </button>
        </li>
      </ul>
    </section>
  );
}

export default SocialSignIn;
