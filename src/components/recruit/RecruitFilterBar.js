import React from "react";
import classNames from "classnames";
import { RecruitFilter } from "../../constants/enums";

function RecruitFilterBar({ onFilterChanged, currentSortNumber }) {
  const filterList = Object.values(RecruitFilter).filter(v => !isNaN(v));

  const handleFilterButtonClick = sortNumber => () => {
    onFilterChanged(prev => ({ ...prev, sort: sortNumber }));
  };

  return (
    <ul className="w-[1224px] mx-auto flex items-center mt-[28px] mb-[34px] justify-between leading-[30.05px] text-[24px] bg-white">
      <li>
        {filterList.map(sortingNumber => (
          <button
            key={sortingNumber}
            className={classNames("font-bold mr-[50px] relative pb-[4px]", {
              "text-black": currentSortNumber === sortingNumber,
              "text-gray3": currentSortNumber !== sortingNumber,
              "after:absolute after:inset-0 after:top-[100%] after:w-full after:h-[4px] after:bg-blue3 after:rounded-[2px]":
                currentSortNumber === sortingNumber,
            })}
            onClick={handleFilterButtonClick(sortingNumber)}
          >
            {RecruitFilter[sortingNumber]}
          </button>
        ))}
      </li>
      <li className="py- font-[500]">
        <button>모집중인 글만 보기</button>
      </li>
    </ul>
  );
}

export default RecruitFilterBar;
