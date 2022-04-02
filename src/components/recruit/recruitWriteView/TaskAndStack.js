import React, { useState, useRef } from "react";
import classNames from "classnames";

import { Stack, Task } from "../../../constants/enums";

const TaskAndStack = ({
  handleAddRecruitTask,
  recruitData,
  handleAddRecruitStack,
  handleRemoveRecruitStack,
  handleRemoveRecruitTask,
}) => {
  const [needPeopleNumber, setNeedPeopleNumber] = useState(2);
  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedPeopleNumber, setSelectedPeopleNumber] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(0);
  const [isNotSelectModal, setIsNotSelectModal] = useState(false);

  const stackDetailsRef = useRef(null);
  const peopleDetailsRef = useRef(null);

  const taskList = Object.values(Task).filter(v => !isNaN(v));
  const filteredStackList =
    selectedTask < 300
      ? []
      : Object.values(Stack).filter(stack => {
          const startPoint =
            selectedTask === 300 ? selectedTask - 200 : selectedTask - 100;
          const targetPoint = Stack[stack];
          return startPoint < targetPoint && targetPoint < startPoint + 100;
        });

  const selectTask = task => () => {
    setSelectedStack(0);
    setSelectedPeopleNumber(1);
    setSelectedTask(task);
    if (task === 100 || task === 200) {
      setNeedPeopleNumber(2);
    } else {
      setNeedPeopleNumber(4);
    }
  };

  const setPeopleNumber = number => () => {
    setSelectedPeopleNumber(number);
    const details = peopleDetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const selectStack = stack => () => {
    setSelectedStack(stack);
    const details = stackDetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const addRecruit = () => {
    if (selectedTask === 0) {
      setIsNotSelectModal(true);
      setTimeout(() => {
        setIsNotSelectModal(false);
      }, 700);
      return;
    }

    if (selectedTask > 200) {
      if (selectedStack === 0) {
        setIsNotSelectModal(true);
        setTimeout(() => {
          setIsNotSelectModal(false);
        }, 700);
        return;
      }
    }

    const recruitTaskData = {
      recruitTask: selectedTask,
      numberOfPeopleSet: Number(selectedPeopleNumber),
      numberOfPeopleRequired: 0,
    };

    const recruitStackData = {
      recruitStack: selectedStack,
      numberOfPeopleSet: Number(selectedPeopleNumber),
      numberOfPeopleRequired: 0,
    };

    if (selectedTasks.includes(selectedTask)) {
      const recruitTasksOverwrite = recruitData.recruitTasks.map(task => {
        if (task.recruitTask === recruitTaskData.recruitTask) {
          return recruitTaskData;
        }
        return task;
      });

      const recruitStacksOverwrite = recruitData.recruitStacks.map(stack => {
        if (
          Boolean(stack.recruitStack < 200) ===
          Boolean(recruitStackData.recruitStack < 200)
        ) {
          return recruitStackData;
        }
        return stack;
      });

      if (selectedTask === 100 || selectedTask === 200) {
        handleAddRecruitTask(recruitTasksOverwrite);
      } else {
        handleAddRecruitTask(recruitTasksOverwrite);
        handleAddRecruitStack(recruitStacksOverwrite);
      }
    } else {
      const recruitTasksAdd = [...recruitData.recruitTasks, recruitTaskData];
      const recruitStacksAdd = [...recruitData.recruitStacks, recruitStackData];
      if (selectedTask === 100 || selectedTask === 200) {
        handleAddRecruitTask(recruitTasksAdd);
      } else {
        handleAddRecruitTask(recruitTasksAdd);
        handleAddRecruitStack(recruitStacksAdd);
      }
      setSelectedTasks(prev => [...prev, selectedTask]);
    }

    setSelectedStack(0);
    setNeedPeopleNumber(0);
    setSelectedTask(0);
  };
  const removeRecruit = taskAndStack => () => {
    const filteredRecruitTask = recruitData.recruitTasks.filter(
      task => task.recruitTask !== taskAndStack,
    );

    const filteredRecruitStack = recruitData.recruitTasks.filter(
      stack => stack.recruitTask !== taskAndStack,
    );
    if (taskAndStack === 100 || taskAndStack === 200) {
      handleRemoveRecruitTask(filteredRecruitTask);
    } else {
      if (taskAndStack < 200) {
        const filteredTask = recruitData.recruitTasks.filter(
          task => task.recruitTask !== 300,
        );
        setSelectedTasks(prev => prev.filter(task => task !== 300));
        handleRemoveRecruitTask(filteredTask);
      } else {
        const filteredTask = recruitData.recruitTasks.filter(
          task => task.recruitTask !== 400,
        );
        setSelectedTasks(prev => prev.filter(task => task !== 400));
        handleRemoveRecruitTask(filteredTask);
      }
      handleRemoveRecruitStack(filteredRecruitStack);
    }
    setSelectedTasks(prev => prev.filter(task => task !== taskAndStack));
  };

  return (
    <li className="flex items-start mb-[100px]">
      <p className="w-[208px] text-[17px]">필요 직군</p>
      <ul className="relative">
        <li className="absolute bottom-[100%] mb-[10px] text-gray3">
          최소 하나의 직군이 필요합니다! 각 직군과 스택은 각각 하나씩 선택
          가능합니다!
        </li>
        <li className="mb-[30px]">
          {taskList.map(task => (
            <button
              key={task}
              value={task}
              className={classNames(
                "px-[16px] py-[6px] text-[18px] rounded-[20px] mr-[15px] bg-gray1",
                {
                  "bg-pink text-white":
                    (selectedTask === task) & (selectedTask === 100),
                  "bg-yellow text-white":
                    (selectedTask === task) & (selectedTask === 200),
                  "bg-coral text-white":
                    (selectedTask === task) & (selectedTask === 300),
                  "lg:bg-blue text-white":
                    (selectedTask === task) & (selectedTask === 400),
                },
              )}
              onClick={selectTask(task)}
            >
              {Task[task]}
            </button>
          ))}
        </li>
        <li className="relative flex">
          <div className="flex items-center mr-[24px]">
            <details
              className="border-[1px] border-black  w-[184px] text-[18px] h-[40px]"
              ref={stackDetailsRef}
            >
              <summary
                className={classNames(
                  "pl-[20px] cursor-pointer leading-[40px]",
                  {
                    "pointer-events-none":
                      selectedTask === 100 || selectedTask === 200,
                  },
                )}
              >
                <span>
                  {selectedTask === 0 || selectedStack === 0
                    ? "선택해주세요!"
                    : Stack[selectedStack]}
                </span>
              </summary>
              <ul className="z-10 border border-black">
                {filteredStackList.map(stack => (
                  <li
                    key={Stack[stack]}
                    className="pl-[20px] leading-[40px] cursor-pointer hover:bg-gray1 bg-white"
                    onClick={selectStack(Stack[stack])}
                  >
                    {stack}
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <div className="flex items-center mx-[24px]">
            <p className="text-[17px] mr-[23px]">모집인원</p>
            <details
              className="border-[1px] border-black  w-[250px] text-[18px] h-[40px]"
              onClick={setPeopleNumber}
              ref={peopleDetailsRef}
            >
              <summary className="pl-[20px] leading-[40px] cursor-pointer">
                <span>
                  {selectedTask === 0
                    ? "인원을 선택해주세요!"
                    : `${selectedPeopleNumber} 명`}
                </span>
              </summary>
              <ul className="absolute border w-[250px] border-black leading-[40px]">
                {Array(needPeopleNumber)
                  .fill()
                  .map((arr, idx) => (
                    <li
                      key={idx + 1}
                      className="pl-[20px] leading-[40px] cursor-pointer hover:bg-gray1 bg-white"
                      onClick={setPeopleNumber(idx + 1)}
                    >{`${idx + 1}명`}</li>
                  ))}
              </ul>
            </details>
          </div>
          <button
            className="text-[15px] text-blue3 relative"
            onClick={addRecruit}
          >
            추가하기 +
          </button>
          <div
            className={classNames(
              "absolute top-[100%] mt-[10px] left-0 pointer-events-none text-red duration-500 transition-opacity",
              {
                "opacity-0": !isNotSelectModal,
                "opacity-100": isNotSelectModal,
              },
            )}
          >
            직군 혹은 스택을 선택하지 않으셨습니다!
          </div>
        </li>
        <ul className="flex mt-[40px]">
          {recruitData?.recruitTasks.map(task =>
            task.recruitTask < 300 ? (
              <li
                className={classNames(
                  "mr-[20px]  px-[14px] py-[6px] rounded-[11px] border-[1px]",
                  {
                    "text-pink border-pink": task.recruitTask === 100,
                    "text-yellow border-yellow": task.recruitTask === 200,
                  },
                )}
                key={task.recruitTask}
              >
                {Task[task.recruitTask]} / {task.numberOfPeopleSet}명{" "}
                <button
                  className="ml-[5px]"
                  onClick={removeRecruit(task.recruitTask)}
                >
                  X
                </button>
              </li>
            ) : null,
          )}
          {recruitData?.recruitStacks.map(stack => (
            <li
              className={classNames(
                "mr-[20px] px-[14px] py-[6px] rounded-[11px] border-[1px]",
                {
                  "text-coral border-coral":
                    100 < stack.recruitStack && stack.recruitStack < 200,
                  "text-blue border-blue": 200 < stack.recruitStack,
                },
              )}
              key={stack.recruitStack}
            >
              {Stack[stack.recruitStack]} / {stack.numberOfPeopleSet}명
              <button
                className="ml-[5px]"
                onClick={removeRecruit(stack.recruitStack)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </ul>
    </li>
  );
};

export default TaskAndStack;
