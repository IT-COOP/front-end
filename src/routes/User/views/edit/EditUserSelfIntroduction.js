import React from "react";
import classNames from "classnames";

const MAXIMUM_TEXT_COUNT = 300;

function EditUserSelfIntroduction({
  selfIntroduction,
  onSelfIntroductionChange,
}) {
  const currentTextCount = selfIntroduction.length;
  const isMaximum = currentTextCount === MAXIMUM_TEXT_COUNT;

  const handleTextAreaChange = ({ target: { value } }) => {
    const nextTextCount = value.length;

    if (nextTextCount <= 300) {
      onSelfIntroductionChange(value);
      return;
    }

    onSelfIntroductionChange(value.slice(0, MAXIMUM_TEXT_COUNT));
  };

  return (
    <div className="mb-[30px]">
      <h2 className="text-[17px] mb-[23px] font-medium">소개글</h2>
      <div className="relative">
        <textarea
          className="resize-none w-full bg-white4 h-[120px] focus:outline-none p-[10px] text-[15px]"
          value={selfIntroduction}
          placeholder="자기소개"
          onChange={handleTextAreaChange}
        />
        <span
          className={classNames("absolute bottom-[10px] right-[20px]", {
            "text-gray3": !isMaximum,
            "text-red": isMaximum,
          })}
        >
          {currentTextCount} / {MAXIMUM_TEXT_COUNT}
        </span>
      </div>
    </div>
  );
}

export default EditUserSelfIntroduction;
