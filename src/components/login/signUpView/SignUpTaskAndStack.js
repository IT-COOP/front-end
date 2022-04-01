import React, { useState } from "react";
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
}) => {
  const [selectedTask, setSelectedTask] = useState(0);
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

  const handleSelectTask = task => () => {
    console.log(task);
    if (selectedTask === task) {
      return false;
    }
    if (selectedTask === 100) {
      handleDefaultImg(plDefaultImgUrl);
    }
    if (selectedTask === 200) {
      handleDefaultImg(deDefaultImgUrl);
    }
    if (selectedTask === 300) {
      handleDefaultImg(feDefaultImgUrl);
    }
    if (selectedTask === 400) {
      handleDefaultImg(beDefaultImgUrl);
    }
    setSelectedStack([]);
    setSelectedTask(task);
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px]">
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
        <p className="text-left text-[24px] leading-[50px] mr-[26px] text-gray4">
          스택
        </p>
        <div className="flex-1">
          <details>
            <summary className="leading-[40px] text-[20px] text-gray4">
              최소 1개부터 최대 3개까지 선택 해주세요!
            </summary>
            <select
              className="w-full border-[1px] h-[50px] pl-[15px]"
              // onChange={handleSelectStack}
            >
              <ul></ul>
              {filteredStackList?.map(stack => (
                <li key={stack} onClick={Stack[stack]}>
                  {stack}
                </li>
              ))}
            </select>
          </details>
          <div className="flex gap-x-[10px]">
            {selectedStack.map((stack, idx) => (
              <span
                key={idx}
                className="text-gray4 text-[15px] cursor-pointer"
                // onClick={removeSelectedStack(stack)}
              >
                {Stack[stack]} <Close className="inline-block fill-gray4" />
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
