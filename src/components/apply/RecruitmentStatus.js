import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { Task, Stack } from "../../constants/enums";
import useGetApplyRecruitUser from "../../hooks/useGetApplyRecruitUser";
import useCompleteRecruitStartProjectMutation from "../../hooks/useCompleteRecruitStartProjectMutation";

function RecruitmentStatus({ recruitBoard, recruitId }) {
  const navigate = useNavigate();
  const { data: getAppliedUserData } = useGetApplyRecruitUser({
    recruitId,
    isAccepted: 1,
  });

  const { mutateAsync } = useCompleteRecruitStartProjectMutation();

  const completeRecruitStartProject = async () => {
    const { chatRoom } = await mutateAsync(recruitId);
    navigate(`/chat/${chatRoom.chatRoomId}`);
  };

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
      <hr className="w-full my-[40px]" />
      <div>
        <p className="text-[15px] text-center mb-[20px]">
          현재 팀원은{" "}
          <span className="text-blue3">
            {getAppliedUserData?.recruitApplies.length}
          </span>
          명 이에요.
        </p>
        <p className="text-center text-[15px]">
          모집을 마감하고 <br /> 프로젝트 진행을 시작할까요?
        </p>
        <button
          className="text-[14px] rounded-[5px] w-full text-center mt-[45px] bg-black text-white py-[10px]"
          onClick={completeRecruitStartProject}
        >
          모집 마감하기
        </button>
      </div>
    </>
  );
}

export default RecruitmentStatus;
