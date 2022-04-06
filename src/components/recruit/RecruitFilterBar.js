import React from "react";
import classNames from "classnames";
import { RecruitFilter, RecruitStatus } from "../../constants/enums";

function RecruitFilterBar({
  onFilterChanged,
  currentSortNumber,
  currentStatusNumber,
}) {
  const filterList = Object.values(RecruitFilter).filter(v => !isNaN(v));

  const handleFilterButtonClick = sortNumber => () => {
    onFilterChanged(prev => ({ ...prev, sort: sortNumber }));
  };

  const handleStatusButtonClick = () => {
    onFilterChanged(prev => ({
      ...prev,
      over:
        currentStatusNumber === RecruitStatus.ALL
          ? RecruitStatus.CURRENT
          : RecruitStatus.ALL,
    }));
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
      <li className="font-medium">
        <div
          role="button"
          className="flex items-center"
          onClick={handleStatusButtonClick}
        >
          <span
            className={classNames(
              "w-[20px] h-[20px] rounded-full inline-block mr-[8px]",
              {
                "bg-blue3": currentStatusNumber === RecruitStatus.CURRENT,
                "border-2 border-gray3":
                  currentStatusNumber === RecruitStatus.ALL,
              },
            )}
          />
          <span className="text-[17px] font-medium relative top-px">
            모집 중인 글만 보기
          </span>
        </div>
      </li>
    </ul>
  );
}

export default RecruitFilterBar;
