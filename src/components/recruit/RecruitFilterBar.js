import React, { useState } from "react";

function RecruitFilterBar() {
  const [isOpen, setOpen] = useState(false);

  const toggleBarRecruitFilterBar = () => {
    let toggle = !isOpen;
    setOpen(toggle);
  };

  const handleFilterSelector = e => {
    let target = e.target;
    if (target.nodeName === "LI") {
      for (let key of target.parentNode.children) {
        key.style.fontWeight = "normal";
        key.style.borderBottom = "none";
      }
      target.style.fontWeight = "bold";
      target.style.borderBottom = "2px solid black";
    }
  };

  return (
    <div className="sticky ">
      <div className="bg-[#F9F9F9]">
        <button
          className="px-[18px] py-[6px]"
          onClick={toggleBarRecruitFilterBar}
        >
          필터
        </button>
      </div>
      <ul
        style={isOpen ? { display: "block" } : { display: "none" }}
        onClick={handleFilterSelector}
        className="hidden overflow-hidden "
      >
        <li className="flex items-center">
          <p className="px-[18px] py-[8px] text-center whitespace-nowrap">
            지역
          </p>
          <ul className="inline-flex overflow-hidden overflow-x-auto">
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              전체
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              서울/수도권
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              강원도
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              충청도
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              경상도
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              전라도
            </li>
          </ul>
        </li>
        <li className="flex ">
          <p className="px-[18px] py-[8px] text-center whitespace-nowrap">
            직군
          </p>
          <ul className="inline-flex overflow-hidden overflow-x-auto">
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              전체
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              프론트엔드
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              백엔드
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              디자이너
            </li>
            <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
              기획자
            </li>
          </ul>
        </li>
        <li className="inline-flex">
          <p className="px-[18px] py-[8px] text-center whitespace-nowrap">
            스택
          </p>
          <ul className="inline-flex overflow-hidden overflow-x-auto"></ul>
        </li>
      </ul>
    </div>
  );
}

export default RecruitFilterBar;
