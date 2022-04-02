import React, { useState } from "react";
import classNames from "classnames";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { Task, Stack } from "../../../constants/enums";
import { Close, Mascot } from "../../../assets/icons";

import useApplyRecruitMutation from "../../../hooks/useApplyRecruitMutation";

function ApplyModal({ stack, task, closeApplyModal, recruitId }) {
  const [applyData, setApplyData] = useState({
    task: "",
    applyMessage: "잘 부탁드립니다!",
  });

  const [isCompleteApply, setIsCompleteApply] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: recruitApply } = useApplyRecruitMutation();

  const filteredTaskList = task.filter(
    task => task.numberOfPeopleRequired !== task.numberOfPeopleSet,
  );
  const filteredStackList = stack.filter(
    stack => stack.numberOfPeopleRequired !== stack.numberOfPeopleSet,
  );

  const handleApplyMessage = e => {
    setApplyData(prev => ({ ...prev, applyMessage: e.target.value }));
  };

  const selectTaskHandler = e => {
    setApplyData(prev => ({ ...prev, task: e.target.value }));
  };

  const sendApplyData = async () => {
    const sendData = {
      applyData,
      recruitId,
    };
    const { success } = await recruitApply(sendData);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
      setIsCompleteApply(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <div className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden items-center justify-center px-[158px]">
        <Close
          className="top-[20px] right-[20px] absolute cursor-pointer fill-black "
          onClick={closeApplyModal}
        />
        {!isCompleteApply ? (
          <div>
            <h3 className="text-[23px] font-bold text-center mb-[20px]">
              신청할 카테고리를 선택해주세요!
            </h3>
            <div className="flex flex-wrap gap-[20px] mb-[30px]">
              {filteredTaskList.map(task =>
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
              {filteredStackList.map(stack => (
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
            <div className="mb-[20px]">
              <select
                className="w-full border-[1px] border-gray2 pl-[16px] text-[15px] h-[40px]"
                onChange={selectTaskHandler}
              >
                <option value="1">선택해 주세요!</option>
                {filteredTaskList.map(task =>
                  task.recruitTask < 300 ? (
                    <option
                      value={task.recruitTask}
                      className={classNames("h-[40px]", {})}
                      key={task.recruitTask}
                    >
                      {Task[task.recruitTask]}
                    </option>
                  ) : null,
                )}
                {filteredStackList.map(stack => (
                  <option
                    value={stack.recruitStack}
                    className={classNames("h-[40px]", {})}
                    key={stack.recruitStack}
                  >
                    {Stack[stack.recruitStack]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-[30px]">
              <input
                type="text"
                placeholder="20자 까지 입력가능합니다!"
                className="w-full text-[18px] border-b-[1px] py-[2px] mb-[9px]"
                maxLength={20}
                onChange={handleApplyMessage}
              />
              <p className="text-gray3 text-[15px]">
                당부를 입력해주세요! 20자 까지 작성 가능합니다.
              </p>
            </div>
            <button
              className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] "
              onClick={sendApplyData}
            >
              신청하기
            </button>
          </div>
        ) : (
          <div className="items-center justify-center">
            <div>
              <h3 className="text-[23px] font-bold mb-[40px] text-center">
                협업 신청이 완료되었습니다!
              </h3>
              <Mascot className="mx-auto mb-[50px]" />
              <button
                className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] "
                onClick={closeApplyModal}
              >
                게시글로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyModal;
