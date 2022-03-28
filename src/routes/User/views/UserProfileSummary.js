import React from "react";
import classNames from "classnames";

import useGetUserDetailsQuery from "../../../hooks/useGetUserDetailsQuery";

import { Heart } from "../../../assets/icons";

import { Stack, Task } from "../../../constants/enums";

function UserProfileSummary({ isCurrentUser, userId }) {
  const { data: userData } = useGetUserDetailsQuery(userId, isCurrentUser);

  const _stackAndTaskList = userData?.technologyStack.split(",").map(Number);
  const currentTask = _stackAndTaskList?.find(v => v % 10 === 0);
  const currentStackList = _stackAndTaskList?.filter(v => v % 10 !== 0);

  const totalVoteCount = userData?.userReputations2.length;
  const upvoteCount = userData?.userReputations2.filter(
    ({ userReputationPoint }) => Boolean(userReputationPoint),
  ).length;

  const reputationRatio =
    totalVoteCount !== 0
      ? Math.round((upvoteCount / userData?.userReputations2.length) * 100)
      : 0;

  return (
    <aside>
      <div className="w-[288px] h-max bg-white border-[1px] border-gray2 rounded-[8px] px-[20px]">
        <div className="flex flex-col w-full mt-[45px] mb-[23px]">
          <img
            alt="유저 프로필"
            src={userData?.profileImgUrl}
            className="mx-auto rounded-full overflow-hidden w-[140px] h-[140px] bg-[#c0c0c0] mb-[20px]"
          />
          <div className="flex flex-col justify-center ">
            <div className="flex mx-auto gap-x-[17px] mb-[17px]">
              <p className=" text-19px">{userData?.nickname}</p>
              <p className="text-gray4 text-[15px]">{Task[currentTask]}</p>
            </div>
            <div className="mb-[24px] flex flex-wrap gap-[5px] justify-center">
              {currentStackList?.map(stackNumber => (
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
        {false && (
          <>
            <hr className="w-[278px] block border-gray2 -ml-[16px] mt-[19px] mb-[24px]"></hr>
            <div>
              <p className="mb-[9px] text-[17px]">
                팀 채팅방
                <span className="text-[11px] rounded-[8.5px] px-[6px] text-white bg-gray4">
                  OFF
                </span>
                <span className="text-[11px] rounded-[8.5px] px-[6px] text-white bg-blue">
                  ON
                </span>
              </p>
              <p className="text-[#999] text-[15px]">
                아직 진행중인 프로젝트가 없습니다.
              </p>
            </div>
          </>
        )}
      </div>
      {false && (
        <div className="w-[288px] h-max p-[20px] bg-white border-[1px] border-gray2 rounded-[8px] pt-[20px] px-[20px] mt-[24px]">
          <div className="flex justify-between">
            <p className="text-[17px]">협업한 횟수</p>
            <p className="text-[17px] text-blue3">{totalVoteCount}회</p>
          </div>
          <div>
            <div className="mt-[17px] mb-[14px]">
              <span className="block w-[212px] h-[8px] bg-[#F8F9FD] rounded-[4px] overflow-hidden">
                <span className="block w-[70%] h-[8px] bg-blue2"></span>
              </span>
            </div>
          </div>
          <div className="text-[#999]">
            <span className="text-blue3">1번</span> 더 협업하면
            <br />
            실버 왕관을 얻을 수 있어요!
          </div>
        </div>
      )}
    </aside>
  );
}

export default UserProfileSummary;
