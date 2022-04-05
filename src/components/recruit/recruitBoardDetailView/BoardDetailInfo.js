import React from "react";
import classNames from "classnames";

import { Location, Task, Stack } from "../../../constants/enums";

function BoardDetailInfo({ recruitBoard }) {
  return (
    <li className="w-[50%]">
      <p className="text-[15px] text-gray4 mb-[9px]">
        {Location[recruitBoard?.recruitLocation]}
      </p>
      <p className="text-[15px] text-gray4 mb-[17px]">
        소요기간 : {recruitBoard?.recruitDurationWeeks}주 예상
      </p>
      <ul className="flex flex-wrap gap-[10px]">
        {recruitBoard?.recruitTasks.map(task =>
          task.recruitTask < 300 ? (
            <li
              className={classNames(
                "  px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
                {
                  "bg-pink border-pink": task.recruitTask === 100,
                  "bg-yellow border-yellow": task.recruitTask === 200,
                },
              )}
              key={task.recruitTask}
            >
              {Task[task.recruitTask]}
              <span className="ml-[7px]">
                {task.numberOfPeopleRequired} / {task.numberOfPeopleSet}
              </span>
            </li>
          ) : null,
        )}
        {recruitBoard?.recruitStacks.map(stack => (
          <li
            className={classNames(
              " px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
              {
                "bg-coral border-coral":
                  100 < stack.recruitStack && stack.recruitStack < 200,
                "bg-blue border-blue": 200 < stack.recruitStack,
              },
            )}
            key={stack.recruitStack}
          >
            {Stack[stack.recruitStack]} {stack.numberOfPeopleRequired} /{" "}
            {stack.numberOfPeopleSet}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default BoardDetailInfo;
