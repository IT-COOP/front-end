import React, { useRef, useState } from "react";

import { Location } from "../../../constants/enums";

const LocationSelect = ({ handleLocation }) => {
  const [selectedLocation, setSelectedLocation] =
    useState("지역을 선택해 주세요!");

  const detailsRef = useRef();

  const locationList = Object.values(Location).filter(v => !isNaN(v));

  const selectLocation = location => () => {
    const details = detailsRef.current;
    if (details) {
      details.open = false;
    }
    setSelectedLocation(location);
    handleLocation(location);
  };

  return (
    <li className="flex items-center mb-[62px] ">
      <p className="w-[208px] text-[17px]">지역</p>
      <details
        className="relative w-[392px] text-[17px] h-[40px] "
        ref={detailsRef}
      >
        <summary className="leading-[40px] border-[1px] border-black pl-[20px] cursor-pointer">
          <span>
            {Number(selectedLocation)
              ? Location[selectedLocation]
              : selectedLocation}
          </span>
        </summary>
        <ul className="absolute border-[1px] border-black w-full z-10">
          {locationList.map(location => (
            <li
              key={location}
              className="pl-[20px] leading-[40px] cursor-pointer hover:bg-gray1 bg-white"
              onClick={selectLocation(location)}
            >
              {Location[location]}
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default LocationSelect;
