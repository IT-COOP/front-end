import React, { useState } from "react";

import { Prev } from "../../../assets/icons";

function UserPortfolioUrl({
  handleNextChapter,
  handlePrevChapter,
  handlePortfolioUrl,
}) {
  const [userPortfolioUrl, setUserPortfolioUrl] = useState("");

  const handleUserPortfolioUrl = inputEvent => {
    handlePortfolioUrl(inputEvent.target.value);
    setUserPortfolioUrl(inputEvent.target.value);
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px] rounded-[16px] ">
      <button
        className="absolute top-[14px] left-[14px]"
        onClick={handlePrevChapter}
      >
        <Prev />
      </button>
      <h1 className="text-center font-bold text-[30px] mt-[74px] mb-[33px]">
        포트폴리오 URL을 작성해주세요!
      </h1>
      <p>깃허브, 드리블, 노션 본인의 포트폴리오 URL을 한개만 작성해주세요!</p>
      <div className="flex items-center mb-[40px] ">
        <input
          type="text"
          className="w-full border-b-[1px] mt-[50px] mb-[30px] py-[10px] text-[18px] px-[10px]"
          placeholder="https://github.com/"
          value={userPortfolioUrl}
          onChange={handleUserPortfolioUrl}
        />
      </div>
      <button
        className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
        onClick={handleNextChapter}
      >
        다음으로
      </button>
    </li>
  );
}

export default UserPortfolioUrl;
