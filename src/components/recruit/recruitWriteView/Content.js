import React, { useState } from "react";

const Content = ({ handleContent }) => {
  const [boardContent, setBoardContent] = useState();
  const handleBoardContent = onChange => {
    setBoardContent(onChange.target.value);
    handleContent(onChange.target.value);
  };
  return (
    <li className="flex pb-[60px]">
      <p className="w-[208px] text-[17px]"> 내용 </p>
      <div className="flex-1">
        <textarea
          className=" w-full h-[315px] border border-gray3 resize-none p-[4px] applyUserUl"
          type="text"
          onChange={handleBoardContent}
          value={boardContent}
          maxLength={1000}
        />
      </div>
    </li>
  );
};

export default Content;
