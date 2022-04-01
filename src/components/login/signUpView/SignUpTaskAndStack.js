import React, { useState, useRef } from "react";
import classNames from "classnames";
import { Stack, Task } from "../../../constants/enums";
import { Close, Prev } from "../../../assets/icons";
import {
  beDefaultImgUrl,
  feDefaultImgUrl,
  deDefaultImgUrl,
  plDefaultImgUrl,
} from "../../../constants/defaultImages";

const SignUpTaskAndStack = ({
  handlePrevChapter,
  handleNextChapter,
  handleDefaultImg,
  handleSelectedTask,
  handleSelectedStacks,
  handleremoveStacks,
}) => {
  const [selectedTask, setSelectedTask] = useState(100);
  const [selectedStack, setSelectedStack] = useState([]);

  const filteredTask = Object.values(Task).filter(task => !isNaN(task));
  const filteredStackList =
    selectedTask < 300
      ? null
      : Object.values(Stack).filter(stack => {
          const startPoint =
            selectedTask === 300 ? selectedTask - 200 : selectedTask - 100;
          const targetPoint = Stack[stack];
          return startPoint < targetPoint && targetPoint < startPoint + 100;
        });

  const detailsRef = useRef(null);

  const handleSelectTask = task => () => {
    if (task === 100) {
      handleDefaultImg(plDefaultImgUrl);
    }
    if (task === 200) {
      handleDefaultImg(deDefaultImgUrl);
    }
    if (task === 300) {
      handleDefaultImg(feDefaultImgUrl);
    }
    if (task === 400) {
      handleDefaultImg(beDefaultImgUrl);
    }
    if (selectedTask === task) {
      return;
    }
    setSelectedStack([]);
    setSelectedTask(task);
    handleSelectedTask([task]);

    const details = detailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const handleSelectStack = stack => () => {
    if (selectedStack.includes(stack) || selectedStack.length === 3) {
      const details = detailsRef.current;
      if (details) {
        details.open = false;
      }
      return;
    }
    setSelectedStack(prev => [...prev, stack]);
    handleSelectedStacks(stack);
  };

  const removeSelectedStack = stack => () => {
    setSelectedStack(prev => [...prev].filter(v => v !== stack));
    handleremoveStacks(stack);
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px] rounded-[16px] ">
      <button
        className="absolute top-[14px] left-[14px]"
        onClick={handlePrevChapter}
      >
        <Prev />
      </button>
      <h1 className="text-center font-bold text-[30px] mt-[74px] mb-[32px]">
        <span>직군과 스택을</span> 설정해주세요.
      </h1>
      <div className="flex items-center mb-[40px] ">
        <p className="text-left text-[24px] leading-[30.05px] mr-[26px] text-gray4">
          직군
        </p>
        <div className="flex">
          {filteredTask.map(task => (
            <button
              key={task}
              className={classNames(
                "bg-gray1 text-gray4 mr-[16px] text-[16px] px-[16px] py-[6px] rounded-[20px]",
                {
                  "bg-pink text-white":
                    (selectedTask === task) & (selectedTask === 100),
                },
                {
                  "bg-yellow text-white":
                    (selectedTask === task) & (selectedTask === 200),
                },
                {
                  "bg-coral text-white":
                    (selectedTask === task) & (selectedTask === 300),
                },
                {
                  "lg:bg-blue text-white":
                    (selectedTask === task) & (selectedTask === 400),
                },
              )}
              onClick={handleSelectTask(task)}
            >
              {Task[task]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex stack mb-[40px]">
        <p className="text-left text-[24px] leading-[40px] mr-[26px] text-gray4">
          스택
        </p>
        <div className="flex-1">
          <details
            ref={detailsRef}
            className={classNames("relative", {
              "pointer-events-none":
                selectedTask === 100 ||
                selectedTask === 200 ||
                selectedTask === 0,
            })}
          >
            <summary className="leading-[40px] text-[18px] text-gray4 border border-black pl-[20px] cursor-pointer">
              최소 1개부터 최대 3개까지 선택 해주세요!
            </summary>
            <ul className="absolute z-10 w-full bg-white border border-black ">
              {filteredStackList?.map(stack => (
                <li
                  key={stack}
                  className={classNames(
                    "leading-[40px] text-[18px] pl-[20px] hover:bg-gray2 cursor-pointer",
                    {
                      "bg-coral text-white":
                        (selectedTask === 300) &
                        selectedStack.includes(Stack[stack]),
                    },
                    {
                      "lg:bg-blue text-white":
                        (selectedTask === 400) &
                        selectedStack.includes(Stack[stack]),
                    },
                  )}
                  onClick={handleSelectStack(Stack[stack])}
                >
                  {stack}
                </li>
              ))}
            </ul>
          </details>
          <div className="flex gap-[10px] mt-[10px] flex-wrap">
            {selectedStack.map((stack, idx) => (
              <span
                key={idx}
                className={classNames(
                  "text-[15px] cursor-pointer border px-[14px] py-[6px] rounded-[15px]",
                  {
                    "border-coral text-coral":
                      (selectedTask === 300) & selectedStack.includes(stack),
                  },
                  {
                    "border-blue text-blue":
                      (selectedTask === 400) & selectedStack.includes(stack),
                  },
                )}
                onClick={removeSelectedStack(stack)}
              >
                {Stack[stack]}{" "}
                <Close
                  className={classNames(
                    "inline-block",
                    {
                      "fill-coral":
                        (selectedTask === 300) & selectedStack.includes(stack),
                    },
                    {
                      "fill-blue ":
                        (selectedTask === 400) & selectedStack.includes(stack),
                    },
                  )}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
        onClick={handleNextChapter}
      >
        다음으로
      </button>
    </li>
  );
};

export default SignUpTaskAndStack;
