import React from "react";

function RecruitArrayBar() {
  return (
    <ul className="sticky flex justify-between items-center sm:border-b-[1px]  sm:px-[18px] sm:mt-[10px] sm:mb-[20px]">
      <li>
        <button className="sm:py-[6px] sm:mr-[10px]">최신순</button>
        <button className="sm:py-[6px] ">Keep it 많은 순</button>
      </li>
      <li>모집중인 글만</li>
    </ul>
  );
}

export default RecruitArrayBar;
