import React, { useState } from "react";

const Title = ({ handleTitle }) => {
  const [titleContent, setTitleContent] = useState("");
  const handleTitleContent = inputText => {
    setTitleContent(inputText.target.value);
    handleTitle(inputText.target.value);
  };

  return (
    <li className="flex items-center mb-[60px]">
      <p className="w-[208px] text-[17px]"> 제목 </p>
      <input
        className="text-[20px] py-[10px] flex-1 border-b-[1px]"
        maxLength={20}
        value={titleContent}
        type="text"
        placeholder="20글자 이내로 작성해주세요!"
        onChange={handleTitleContent}
      />
    </li>
  );
};

export default Title;
