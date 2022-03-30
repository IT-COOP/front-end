import React from "react";
import classNames from "classnames";

import { Task, Stack } from "../../../constants/enums";
import { Close } from "../../../assets/icons";

function ApplyModal({ stack, task, closeApplyModal }) {
  return (
    <div className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden items-center justify-center px-[158px]">
        <Close
          className="top-[20px] right-[20px] absolute cursor-pointer fill-black "
          onClick={closeApplyModal}
        />
        <div>
          <h3 className="text-[23px] font-bold mb-[40px] text-center">
            신청할 카테고리를 선택해주세요!
          </h3>
          <div className="flex flex-wrap gap-[20px] mb-[50px]">
            {task.map(task =>
              task.recruitTask < 300 ? (
                <button
                  className={classNames(
                    "px-[14px] py-[2px] rounded-[11px] text-white text-[23px]",
                    {
                      "bg-pink border-pink": task.recruitTask === 100,
                      "bg-yellow border-yellow": task.recruitTask === 200,
                    },
                  )}
                  key={task.recruitTask}
                >
                  {Task[task.recruitTask]}
                </button>
              ) : null,
            )}
            {stack.map(stack => (
              <button
                className={classNames(
                  "px-[14px] py-[2px] rounded-[11px] text-white text-[23px]",
                  {
                    "bg-coral border-coral":
                      100 < stack.recruitStack && stack.recruitStack < 200,
                    "bg-blue border-blue": 200 < stack.recruitStack,
                  },
                )}
                key={stack.recruitStack}
              >
                {Stack[stack.recruitStack]}
              </button>
            ))}
          </div>
          <div className="mb-[50px]">
            <select className="w-full border-[1px] border-gray2 pl-[16px] text-[15px] h-[40px]">
              <option value="1" disabled={true} className="hidden">
                선택해 주세요!
              </option>
              {task.map(task =>
                task.recruitTask < 300 ? (
                  <option
                    value={task.recruitTask}
                    className={classNames("h-[40px]", {
                      "bg-pink border-pink": task.recruitTask === 100,
                      "bg-yellow border-yellow": task.recruitTask === 200,
                    })}
                    key={task.recruitTask}
                  >
                    {Task[task.recruitTask]}
                  </option>
                ) : null,
              )}
              {stack.map(stack => (
                <option
                  value={stack.recruitStack}
                  className={classNames("h-[40px]", {
                    "bg-coral border-coral":
                      100 < stack.recruitStack && stack.recruitStack < 200,
                    "bg-blue border-blue": 200 < stack.recruitStack,
                  })}
                  key={stack.recruitStack}
                >
                  {Stack[stack.recruitStack]}
                </option>
              ))}
            </select>
          </div>
          <button className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] ">
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyModal;
