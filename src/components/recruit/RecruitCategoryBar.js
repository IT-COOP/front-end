import React, { useState } from "react";
import { Filter } from "../../assets/icons";

function RecruitCategoryBar({ handleCategory }) {
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
    <div className=" z-[100] w-full bg-white ">
      <ul className="relative w-[1224px] mx-[auto] flex justify-between items-center py-[12px]">
        <li>
          <button
            className="flex items-center text-[20px] font-bold"
            onClick={toggleBarRecruitFilterBar}
          >
            <Filter className="inline-block mr-[16px]" /> 필터
          </button>
        </li>
        <li>
          <button className="text-[17px] leading-[27.54px] h-[40px] bg-black text-white rounded-[5px] w-[180px]">
            모집글 작성하기
          </button>
        </li>
        <div
          style={isOpen ? { display: "block" } : { display: "none" }}
          onClick={handleFilterSelector}
          className="absolute top-[100%] z-[99] w-full hidden overflow-hidden border-[1px] border-black bg-gray2"
        >
          <div className="flex items-center">
            <p className="w-[182px]  px-[12px] py-[8px] text-left whitespace-nowrap  leading-[40px] border-r-[1px] border-b-[1px] border-black">
              지역
            </p>
            <ul className="flex overflow-hidden overflow-x-auto leading-[34px]">
              <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
                전체
              </li>
              <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
                서울/수도권
              </li>
            </ul>
          </div>
          <div className="flex ">
            <p className="w-[182px] px-[12px] py-[8px] text-left whitespace-nowrap leading-[40px] border-r-[1px] border-b-[1px] border-black">
              직군
            </p>
            <ul className="flex overflow-hidden overflow-x-auto ">
              <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
                전체
              </li>
              <li className="px-[18px] py-[8px] text-center whitespace-nowrap">
                프론트엔드
              </li>
            </ul>
          </div>
          <div className="flex">
            <p className="w-[182px]  px-[12px] py-[8px] text-left whitespace-nowrap leading-[40px] border-r-[1px] border-black">
              스택
            </p>
            <ul className="flex overflow-hidden overflow-x-auto"></ul>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default RecruitCategoryBar;
