import React from "react";
import classNames from "classnames";

import { Task, Stack } from "../../../constants/enums";

function RecruitmentStatus({ recruitBoard }) {
  return (
    <>
      <h3 className="text-19px mb-[20px]">모집 현황</h3>
      <ul className="flex flex-wrap gap-[10px]">
        {recruitBoard?.recruitTasks.map(task =>
          task.recruitTask < 300 ? (
            <li
              className={classNames(
                "  px-[8px] py-[4px] rounded-[11px] text-white text-[15px]",
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
              " px-[8px] py-[4px] rounded-[11px] text-white text-[15px]",
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
    </>
  );
}

export default RecruitmentStatus;
