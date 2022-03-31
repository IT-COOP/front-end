import React from "react";
import classNames from "classnames";

import { Heart } from "../../../assets/icons";

import { Stack, Task } from "../../../constants/enums";

function UserProfileSummary({
  profileImgUrl,
  nickname,
  userReputationList,
  stackList,
  task,
  currentProjectList,
  children,
}) {
  const totalVoteCount = userReputationList.length;
  const upvoteCount = userReputationList.filter(({ userReputationPoint }) =>
    Boolean(userReputationPoint),
  ).length;

  const reputationRatio =
    totalVoteCount !== 0 ? Math.round((upvoteCount / totalVoteCount) * 100) : 0;

  return (
    <aside>
      <div className="w-[288px] h-max bg-white border-[1px] border-gray2 rounded-[8px] ">
        <div className="flex flex-col w-full px-[20px] mt-[45px] mb-[23px]">
          <img
            alt="유저 프로필"
            src={profileImgUrl}
            className="mx-auto rounded-full overflow-hidden w-[140px] h-[140px] bg-[#c0c0c0] mb-[20px]"
          />
          <div className="flex flex-col justify-center ">
            <div className="flex mx-auto gap-x-[17px] mb-[17px]">
              <p className=" text-19px">{nickname}</p>
              <p className="text-gray4 text-[15px]">{Task[task]}</p>
            </div>
            <div className="mb-[24px] flex flex-wrap gap-[5px] justify-center">
              {stackList?.map(stackNumber => (
                <p
                  key={stackNumber}
                  className={classNames(
                    "px-[14px] py-[2px] text-[15px] rounded-[11px] text-white",
                    {
                      "bg-coral": 100 < stackNumber && stackNumber < 200,
                      "bg-blue": 300 < stackNumber && stackNumber < 400,
                    },
                  )}
                >
                  {Stack[stackNumber]}
                </p>
              ))}
            </div>
            <div className="text-[15px]">
              <div className="mb-[9px] flex items-center">
                <Heart className="inline-block mr-[10px]" />{" "}
                <p className="relative top-[1px]">
                  재협업희망률 {reputationRatio}%
                </p>
              </div>
              <p className="ml-[15px] text-gray4">
                {" "}
                {totalVoteCount}명 중 {upvoteCount}명이 만족
              </p>
            </div>
          </div>
        </div>
        {currentProjectList}
      </div>
      {children}
    </aside>
  );
}

export default UserProfileSummary;
