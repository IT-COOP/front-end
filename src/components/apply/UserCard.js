import React from "react";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { Task, Stack } from "../../constants/enums";
import useAcceptOrRefuseUserMutation from "../../hooks/useAcceptOrRefuseUserMutation";

function UserCard({
  userTask,
  userProfileImgUrl,
  userNickname,
  applyMessage,
  collaborationCount,
  collaborationRate,
  isAccepted,
  userId,
  recruitId,
}) {
  const queryClient = useQueryClient();
  const userCollaborationRate = Math.trunc(
    (collaborationRate.filter(
      collaborationPoint => collaborationPoint.userReputationPoint !== 0,
    ).length /
      collaborationRate.length) *
      100,
  );

  const { mutateAsync: acceptOrRefuseUser } = useAcceptOrRefuseUserMutation();

  const acceptUserHandler = async () => {
    const { success } = await acceptOrRefuseUser({
      applicant: userId,
      recruitPostId: Number(recruitId),
      isAccepted: Boolean(true),
    });
    if (success) {
      queryClient.invalidateQueries("applyUser");
    }
  };
  const refuseUserHandler = async () => {
    const { success } = await acceptOrRefuseUser({
      applicant: userId,
      recruitPostId: Number(recruitId),
      isAccepted: Boolean(false),
    });

    if (success) {
      queryClient.invalidateQueries("applyUser");
    }
  };

  return (
    <>
      <div className="flex gap-[20px] mb-[15px]">
        <img
          src={userProfileImgUrl}
          alt={`${userNickname}의 프로필이미지`}
          className="w-[90px] h-[90px] overflow-hidden rounded-full"
        />
        <div>
          <p className="font-bold text-[19px] mb-[20px]">{userNickname}</p>
          <div>
            <p className="text-[13px] text-gray4">
              협업 {collaborationCount}회
            </p>
            <p className="text-[13px] text-gray4">
              재협업희망률 {userCollaborationRate}%
            </p>
          </div>
        </div>
      </div>
      <p
        className={classNames(
          "inline-block text-white  py-[3px] px-[10px] text-[14px] rounded-[11px] mb-[20px]",
          {
            "bg-pink": userTask === 100,
            "bg-yellow": userTask === 200,
            "bg-coral": (100 < userTask) & (userTask < 200),
            "bg-blue": 200 < userTask,
          },
        )}
      >
        {userTask % 100 === 0 ? Task[userTask] : Stack[userTask]}
      </p>
      <p
        className={classNames(
          "text-[14px] p-[12px] bg-gray1 rounded-[5px] leading-[20px] h-[70px] ",
          {
            "mb-[40px]": !Boolean(isAccepted),
            "mb-[10px]": Boolean(isAccepted),
          },
        )}
      >
        {applyMessage}
      </p>
      {Boolean(isAccepted) ? null : (
        <div className="flex justify-between">
          <button
            className="w-[110px] leading-[30px] text-[14px] rounded-[5px] bg-blue3 text-white"
            onClick={acceptUserHandler}
          >
            수락
          </button>
          <button
            className="w-[110px] leading-[30px] text-[14px] rounded-[5px] bg-white border border-blue3 text-blue3"
            onClick={refuseUserHandler}
          >
            거절
          </button>
        </div>
      )}
    </>
  );
}

export default UserCard;
