import React, { useState } from "react";
import classNames from "classnames";

import useConfirmNicknameMutation from "../../../hooks/useConfirmNicknameMutation";

function Nickname({ handleNextChapter, handleUserNickname }) {
  const [userNickname, setUserNickname] = useState("");
  const [confirmNickname, setConfirmNickname] = useState(false);
  const [checkDuplicateUserNickname, setCheckDuplicate] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { mutateAsync: duplicateUserNickname } = useConfirmNicknameMutation();

  const handleCheckUserNickname = async () => {
    const { data } = await duplicateUserNickname(userNickname);
    if (data) {
      setCheckDuplicate(true);
      setIsDuplicate(false);
    } else {
      setCheckDuplicate(false);
      setIsDuplicate(true);
      setTimeout(() => {
        setIsDuplicate(false);
      }, 1500);
    }
  };

  const confirmUserNickname = e => {
    const regex = /^[가-힣|a-z|A-Z|0-9|]+$/;
    const nickname = e.target.value;
    setUserNickname(nickname);
    if (regex.test(nickname) & (nickname.length > 1) & (nickname.length <= 6)) {
      setConfirmNickname(true);
      handleUserNickname(nickname);
      setCheckDuplicate(false);
    } else {
      setConfirmNickname(false);
      setCheckDuplicate(false);
    }
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white px-[158px] z-10 opacity-100 rounded-[16px] ">
      <h1 className="text-center font-bold text-[30px] mt-[74px] mb-[32px]">
        사용하실 닉네임을 설정해주세요.
      </h1>
      <p className="text-center text-[20px] text-[#797979] mb-[40px]">
        서비스를 이용할 때 사용되는 이름이에요!
      </p>
      <div className="mb-[6px] flex justify-between">
        <input
          type="text"
          className="border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px]"
          placeholder="2~6자 이내로 입력해주세요"
          maxLength={6}
          name="nickname"
          onChange={confirmUserNickname}
          value={userNickname}
        />
        <button
          className={classNames(
            "w-[117px] h-[72px] text-[24px]   rounded-[5px]",
            {
              "bg-[#CCCCCC] text-gray4": !confirmNickname,
              "bg-blue text-white": confirmNickname,
              "bg-red text-white": isDuplicate,
            },
          )}
          disabled={!confirmNickname}
          onClick={handleCheckUserNickname}
        >
          중복확인
        </button>
      </div>
      <p className="mb-[70px] text-[20px] leading-[25.04px] text-gray4">
        <span>닉네임은 공백 없이 한글/영문/숫자만 가능합니다</span>
      </p>
      <button
        className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
        onClick={handleNextChapter}
        disabled={!checkDuplicateUserNickname}
      >
        {checkDuplicateUserNickname ? "다음으로" : "중복검사를 해주세요!"}
      </button>
    </li>
  );
}

export default Nickname;
