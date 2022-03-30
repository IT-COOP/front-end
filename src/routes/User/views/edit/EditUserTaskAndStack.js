import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import useGetUserDetailsQuery from "../../../../hooks/useGetUserDetailsQuery";

import { Close, Reset } from "../../../../assets/icons";

import { Task, Stack } from "../../../../constants/enums";
const ALL_TASK = Object.values(Task).filter(Number);
const ALL_STACK = Object.values(Stack).filter(Number);

function EditUserTaskAndStack({
  changedTask,
  changedStack,
  onTaskChange,
  onStackChange,
}) {
  const { id } = useParams();

  const { isLoading, data } = useGetUserDetailsQuery(id, true);

  const technologyStack = data ? data.technologyStack : "";

  const initialUserTask = Number(
    technologyStack.split(",").find(n => n % 10 === 0),
  );

  const initialUserStackList = technologyStack
    .split(",")
    .filter(n => n % 10 !== 0)
    .map(Number);

  const handleButtonClick = taskNumber => () => {
    onTaskChange(taskNumber);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-x-[38px] mb-[27px]">
        <span className="font-medium text-[17px] text-gray4">직군</span>
        <ul className="flex gap-x-4">
          {ALL_TASK.map(taskNumber => (
            <li
              key={taskNumber}
              onClick={handleButtonClick(taskNumber)}
              className={classNames(
                "py-[6px] px-[16px] rounded-[20px] text-[18px] font-medium cursor-pointer transition duration-100 ease-in",
                {
                  "bg-coral text-white":
                    (changedTask || initialUserTask) === taskNumber,
                  "bg-white2 text-gray3":
                    (changedTask || initialUserTask) !== taskNumber,
                },
              )}
            >
              {Task[taskNumber]}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-[38px] mb-[27px]">
        <span className="font-medium text-[17px] text-gray4">스택</span>
        <div>
          <details>
            <summary>태그 열기</summary>
          </details>
          <ul className="flex gap-4">
            {initialUserStackList.map(stackNumber => (
              <li
                key={stackNumber}
                className="flex items-center py-[6px] px-[16px] rounded-[20px] text-[18px] font-medium  text-coral border border-coral"
              >
                <span>{Stack[stackNumber]}</span>
                <Close className="cursor-pointer fill-coral" />
              </li>
            ))}
            <li className="text-[15px] text-gray4 flex items-center">
              <span>선택 초기화</span> <Reset />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default EditUserTaskAndStack;
