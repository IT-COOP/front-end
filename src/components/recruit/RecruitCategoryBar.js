import React, { useState } from "react";
import { Filter } from "../../assets/icons";

import checkAll from "../../lib/checkAll";
import getPerfectFields from "../../lib/getPerfectFields";

import { Location, Task, Stack } from "../../constants/enums";
import classNames from "classnames";

function RecruitCategoryBar({
  config: { stack, task, loc },
  onCategorySelected,
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategoryList = () => setIsCategoryOpen(prev => !prev);

  const locationList = getPerfectFields(Location);
  const taskList = getPerfectFields(Task);
  const stackList = getPerfectFields(Stack);

  const filteredStackList =
    task < 300
      ? ["전체"]
      : stackList.filter(v => {
          if (v === "전체") {
            return true;
          }
          //task - 200 : 프론트엔드 stack 번호 리스트 (101~199)
          //task - 100 : 백엔드 stack 번호 리스트 (301~399)
          const startPoint = task === 300 ? task - 200 : task - 100;
          const targetPoint = Stack[v];
          return startPoint < targetPoint && targetPoint < startPoint + 100;
        });

  const handleLocationSelect = name => () => {
    const loc = checkAll(name, Location);
    onCategorySelected(prev => ({ ...prev, loc }));
  };

  const handleTaskSelect = name => () => {
    const task = checkAll(name, Task);
    onCategorySelected(prev => ({ ...prev, task, stack: "" }));
  };

  const handleStackSelect = name => () => {
    const stack = checkAll(name, Stack);
    onCategorySelected(prev => ({ ...prev, stack }));
  };

  return (
    <div className="z-[100] w-full bg-white border-b border-solid border-b-gray2">
      <div className="relative w-[1224px] mx-auto my-[28px]">
        <ul className="flex items-center justify-between">
          <li>
            <button
              className="flex items-center text-[20px] font-bold"
              onClick={toggleCategoryList}
            >
              <Filter className="inline-block mr-[16px]" /> 필터
            </button>
          </li>
          <li>
            <button className="w-[180px] text-[17px] h-[40px] bg-blue3 text-white rounded-[5px]">
              모집글 작성하기
            </button>
          </li>
        </ul>
        {isCategoryOpen && (
          <div className="absolute top-[100%] w-full z-10 overflow-hidden border border-solid border-gray2">
            <div className="flex items-center h-[40px]">
              <p className="shrink-0 w-[182px] h-full flex items-center pl-[12px] text-left text-[15px] text-white font-medium whitespace-nowrap border-b border-solid border-white bg-blue">
                지역
              </p>
              <ul className="pl-[19px] flex items-center gap-x-[23px] w-full h-full overflow-x-auto border-b border-solid border-b-gray1 bg-white">
                {locationList.map(locationName => (
                  <li
                    key={locationName}
                    className={classNames(
                      "px-1 z-10 h-[40px] leading-[40px] cursor-pointer whitespace-nowrap relative",
                      {
                        "font-bold border-b-2 border-solid border-b-black":
                          loc === (Location[locationName] ?? ""),
                      },
                    )}
                    onClick={handleLocationSelect(locationName)}
                  >
                    {locationName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="shrink-0 w-[182px] h-full flex items-center pl-[12px] text-left text-[15px] text-white font-medium whitespace-nowrap border-b border-solid border-white bg-blue">
                직군
              </p>
              <ul className="pl-[19px] flex items-center gap-x-[23px] w-full h-full overflow-x-auto border-b border-solid border-b-gray1 bg-white">
                {taskList.map(taskName => (
                  <li
                    key={taskName}
                    className={classNames(
                      "px-1 z-10 h-[40px] leading-[40px] cursor-pointer whitespace-nowrap ",
                      {
                        "font-bold border-b-2 border-solid border-b-black":
                          task === (Task[taskName] ?? ""),
                      },
                    )}
                    onClick={handleTaskSelect(taskName)}
                  >
                    {taskName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="shrink-0 w-[182px] h-full flex items-center pl-[12px] text-left text-[15px] text-white font-medium whitespace-nowrap border-b border-solid border-white bg-blue">
                스택
              </p>
              <ul className="pl-[19px] flex items-center gap-x-[23px] w-full h-full overflow-x-auto border-b border-solid border-b-gray1 bg-white">
                {filteredStackList.map(stackName => (
                  <li
                    key={stackName}
                    className={classNames(
                      "px-1 z-10 h-[40px] leading-[40px] cursor-pointer whitespace-nowrap ",
                      {
                        "font-bold border-b-2 border-solid border-b-black":
                          stack === (Stack[stackName] ?? ""),
                      },
                    )}
                    onClick={handleStackSelect(stackName)}
                  >
                    {stackName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruitCategoryBar;
