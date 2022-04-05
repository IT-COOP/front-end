import React, { useState } from "react";

const Content = ({ handleContent }) => {
  const [boardContent, setBoardContent] = useState();
  const handleBoardContent = onChange => {
    console.log(onChange.target.value.split("\n").filter(text => text !== ""));
    setBoardContent(onChange.target.value);
    handleContent(onChange.target.value);
  };
  console.log(boardContent);
  return (
    <li className="flex flex-col pb-[60px]">
      <p className="w-[208px] text-[17px]"> 내용 </p>
      <p>{boardContent?.split("\n").filter(text => text !== "")}</p>
      <textarea
        className="flex-1 h-[315px] border border-gray3 resize-none p-[4px]"
        type="text"
        onChange={handleBoardContent}
        value={boardContent}
      />
    </li>
  );
};

export default Content;
