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
