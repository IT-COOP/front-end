import React, { useRef } from "react";
import classNames from "classnames";

import { Close, Reset } from "../../../assets/icons";
import { Task, Stack } from "../../../constants/enums";

const ALL_TASK = Object.values(Task).filter(Number);
const ALL_STACK = Object.values(Stack).filter(Number);

function EditUserTaskAndStack({
  task,
  stackList,
  onTaskChange,
  onStackChange,
}) {
  const accordionRef = useRef(null);

  const handleTaskColorChipClick = taskNumber => e => {
    e.stopPropagation();
    const accordion = accordionRef.current;
    onTaskChange(taskNumber);
    onStackChange([]);
    if (accordion) {
      accordion.open = false;
    }
  };

  const handleStackClick = stackNumber => e => {
    e.stopPropagation();
    const copiedStackList = [...stackList];
    const accordion = accordionRef.current;

    const targetIndex = copiedStackList.findIndex(
      currentStackNumber => currentStackNumber === stackNumber,
    );
    if (targetIndex !== -1) {
      copiedStackList.splice(targetIndex, 1);
    } else {
      if (stackList.length === 3) {
        alert("스택은 최대 3개까지만 선택 가능합니다.");
        return;
      }

      copiedStackList.push(stackNumber);
    }
    onStackChange(copiedStackList);

    if (accordion) {
      accordion.open = false;
    }
  };
  const handleResetButtonClick = () => onStackChange([]);
  const handleStackDeleteButtonClick = stackNumber => () => {
    if (stackList.length === 0) {
      throw new Error("This would not be happened");
    }
    const copiedStackList = [...stackList];
    const targetIndex = copiedStackList.findIndex(
      currentStackNumber => currentStackNumber === stackNumber,
    );
    copiedStackList.splice(targetIndex, 1);
    onStackChange(copiedStackList);
  };

  const availableStackList = ALL_STACK.filter(stackNumber => {
    if (task === Task["기획자"] || task === Task["디자이너"]) {
      return null;
    }

    if (task === Task["프론트엔드"]) {
      return 100 < stackNumber && stackNumber < 200;
    }

    if (task === Task["백엔드"]) {
      return 300 < stackNumber && stackNumber < 400;
    }

    throw new Error("invalid stackNumber");
  });

  return (
    <div>
      <div className="flex items-center gap-x-[38px] mb-[27px]">
        <span className="font-medium text-[17px] text-gray4">직군</span>
        <ul className="flex gap-x-4">
          {ALL_TASK.map(taskNumber => (
            <li
              key={taskNumber}
              onClick={handleTaskColorChipClick(taskNumber)}
              className={classNames(
                "py-[6px] px-[16px] rounded-[20px] text-[18px] font-medium cursor-pointer transition duration-100 ease-in",
                {
                  "bg-coral text-white": task === taskNumber,
                  "bg-white2 text-gray3": task !== taskNumber,
                },
              )}
            >
              {Task[taskNumber]}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-start gap-x-[38px] mb-[27px]">
        <span className="h-[40px] leading-[40px] font-medium text-[17px] text-gray4">
          스택
        </span>
        <div>
          <details className="w-[410px]" ref={accordionRef}>
            <summary className="h-[40px] border-gray2 border flex justify-start items-center cursor-pointer text-[15px] pl-[21px] pr-[28px]">
              <span className="h-[40px] leading-[40px]">태그 선택</span>
            </summary>
            {availableStackList.length > 0 ? (
              <ul className="absolute w-[410px] bg-white border border-gray1 z-10">
                {availableStackList.map(stackNumber => (
                  <li
                    onClick={handleStackClick(stackNumber)}
                    className={classNames(
                      "h-[40px] pl-[22px] text-[18px] leading-[40px] cursor-pointer hover:bg-blue3 hover:text-white",
                      {
                        "bg-coral hover:bg-coral text-white":
                          stackList.includes(stackNumber),
                      },
                    )}
                    key={stackNumber}
                  >
                    {Stack[stackNumber]}
                  </li>
                ))}
              </ul>
            ) : null}
          </details>
          <div className="flex mt-[20px]">
            <ul className="flex gap-[9px] max-w-[460px] flex-wrap">
              {stackList.map(stackNumber => (
                <li
                  onClick={handleStackDeleteButtonClick(stackNumber)}
                  key={stackNumber}
                  className="flex items-center py-[6px] px-[16px] rounded-[20px] text-[18px] font-medium  text-coral border border-coral"
                >
                  <span>{Stack[stackNumber]}</span>
                  <Close className="cursor-pointer fill-coral" />
                </li>
              ))}
            </ul>
            <div
              onClick={handleResetButtonClick}
              className="ml-[15px] text-[15px] text-gray4 flex items-center cursor-pointer h-min relative top-1/2 translate-y-1/2"
            >
              <span>선택 초기화</span> <Reset />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditUserTaskAndStack;
