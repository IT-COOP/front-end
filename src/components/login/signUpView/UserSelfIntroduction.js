import React, { useState } from "react";
import { Prev } from "../../../assets/icons";

function UserSelfIntroduction({
  handleSelfIntroduction,
  handlePrevChapter,
  submitUserData,
}) {
  const [userSelfIntroduction, setUserSelfIntroduction] = useState("");
  const handleUserPortfolioUrl = ({ target: { value } }) => {
    setUserSelfIntroduction(value);
    handleSelfIntroduction(value);
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px]">
      <button
        className="absolute top-[14px] left-[14px]"
        onClick={handlePrevChapter}
      >
        <Prev />
      </button>
      <h1 className="text-center font-bold text-[30px] mt-[74px] mb-[33px]">
        자기소개를 해주세요!
      </h1>
      <div className="flex items-center mb-[40px] ">
        <textarea
          className="w-full p-[10px] border-[1px] rounded-[10px] h-[200px] resize-none"
          onChange={handleUserPortfolioUrl}
          value={userSelfIntroduction}
        ></textarea>
      </div>
      <button
        className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
        onClick={submitUserData}
      >
        완료하기
      </button>
    </li>
  );
}

export default UserSelfIntroduction;
