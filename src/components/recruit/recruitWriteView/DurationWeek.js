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
    <li className="flex items-center mb-[62px]">
      <p className="w-[208px] text-[17px]">
        {" "}
        예상 소요 기간
        <span className="block">현재 테스트를위해</span>
        <span className="block">
          1/5/10/20분
          <br />
          으로 적용됩니다.
        </span>
      </p>
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
    </li>
  );
};

export default DurationWeek;
