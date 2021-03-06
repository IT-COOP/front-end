import React, { useRef, useState } from "react";

const DurationWeek = ({ handleDurationWeek }) => {
  const [selectedDurationWeek, setSelectedDurationWeek] =
    useState("예상 소요 기간을 선택해주세요!");

  const weekList = [1, 2, 3, 4];
  const detailsRef = useRef(null);
  const handleClickWeek = week => () => {
    const details = detailsRef.current;
    handleDurationWeek(week);
    if (details.open) {
      details.open = false;
    }
    setSelectedDurationWeek(week);
  };

  return (
    <li className="flex items-center mb-[62px] relative">
      <p className="w-[208px] text-[17px]"> 예상 소요 기간</p>
      <details
        className="relative  w-[392px] text-[17px] h-[40px]"
        ref={detailsRef}
      >
        <summary
          className="leading-[40px] pl-[20px] cursor-pointer border-[1px] border-black"
          defaultValue="hidden"
        >
          <span>
            {Number(selectedDurationWeek)
              ? `${selectedDurationWeek} 주`
              : "예상 소요 기간을 선택해주세요!"}
          </span>
        </summary>

        <ul className="absolute w-[392px] border border-black bg-white z-10">
          {weekList.map(week => (
            <li
              key={week}
              className="pl-[20px] leading-[40px] cursor-pointer hover:bg-gray1"
              onClick={handleClickWeek(week)}
            >{`${week}주`}</li>
          ))}
        </ul>
      </details>
      <p className="absolute left-[208px] top-[50px]">
        현재 시연을 위해 15/30/45/60초로 적용됩니다.
      </p>
    </li>
  );
};

export default DurationWeek;
