import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { KeepItActive, KeepIt, Comment, Running } from "../../assets/icons";

import convertDateText from "../../lib/convertDateText";

import { Location, Stack } from "../../constants/enums";

function RecruitBoard({
  recruitPostId,
  title,
  createdAt,
  updatedAt,
  thumbImgUrl,
  nickname,
  recruitCommentCount,
  recruitKeeps,
  recruitLocation,
  recruitTasks,
  recruitStacks,
  recruitKeepCount,
  recruitDurationWeeks,
  recruitDurationDays,
  isKeeps,
  status,
  isLogin,
}) {
  const navigate = useNavigate();

  const filteredTaskList = recruitTasks.filter(
    ({
      recruitStack: taskNumber,
      numberOfPeopleRequired: totalCount,
      numberOfPeopleSet: occupiedCount,
    }) => {
      if (taskNumber > 200) {
        return false;
      }

      return totalCount - occupiedCount !== 0;
    },
  );

  const filteredStackList = recruitStacks.filter(
    ({
      numberOfPeopleRequired: totalCount,
      numberOfPeopleSet: occupiedCount,
    }) => {
      return totalCount - occupiedCount !== 0;
    },
  );

  const isClosed =
    filteredTaskList.length === 0 && filteredStackList.length === 0;
  const lastUpsertedDate =
    !updatedAt || createdAt === updatedAt ? createdAt : updatedAt;

  const parsedUpsertText = convertDateText(lastUpsertedDate);

  const goDetailRecruit = () => {
    navigate(`/recruit/${recruitPostId}`);
  };

  return (
    <>
      {(status === 1 || status === 2) && (
        <div className="absolute top-0 left-0 w-full h-[50%] bg-[rgba(0,0,0,.5)] pointer-events-none">
          <div
            className={classNames(
              "text-white mt-[10px] ml-[10px] inline-block py-[6px]  px-[15px] text-[18px] rounded-[10px]",
              {
                "bg-blue3": status === 1,
                "bg-gray3": status === 2,
              },
            )}
          >
            {status === 1 ? (
              <>
                <Running className="inline-block mr-[5px]" />
                진행중
              </>
            ) : (
              "종료"
            )}
          </div>
        </div>
      )}
      <div className="mb-[18px]" onClick={goDetailRecruit}>
        <img
          className="object-cover w-full h-[198px]"
          src={`${
            thumbImgUrl
              ? thumbImgUrl
              : "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
          }`}
          alt="게시글 사진"
        />
      </div>
      <div className="pl-[13px] pr-[14px]">
        <p className="line-clamp-2 font-medium text-[17px] mb-[14px] h-[44px]">
          {title}
        </p>
        <div className="flex items-center text-[13px]">
          <p className="mr-[15px]">{Location[recruitLocation]}</p>
          <p>
            {recruitDurationWeeks || Math.round(recruitDurationDays / 7)}주 예상
          </p>
        </div>
        <div className="mt-[14px] mb-[28px]">
          {isClosed ? (
            <p className="font-medium text-[15px] text-gray4">정원 마감</p>
          ) : (
            <ul className="flex gap-x-[5px] overflow-x-scroll no-wrap scroll-bar-none text-[13px] text-white font-medium">
              {filteredStackList.map(stack => (
                <li
                  className={classNames(
                    "py-[2px] px-[10px] rounded-[11px] shrink-0",
                    {
                      "bg-coral":
                        100 < stack.recruitStack && stack.recruitStack < 200,
                      "bg-blue":
                        300 < stack.recruitStack && stack.recruitStack < 400,
                    },
                  )}
                  key={stack.recruitStackId}
                >
                  {Stack[stack.recruitStack]}
                </li>
              ))}
              {filteredTaskList.map(task => (
                <li
                  className={classNames(
                    "py-[2px] px-[10px] rounded-[11px] shrink-0",
                    {
                      "bg-yellow": task.recruitTask === 200,
                      "bg-pink": task.recruitTask === 100,
                    },
                  )}
                  key={task.recruitTaskId}
                >
                  {task.recruitTask === 200 ? "디자인" : "기획"}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul className="flex justify-between text-[14px]">
          <li className="flex line-clamp-1 text-gray4 text-[13px]">
            {parsedUpsertText} | {nickname}
          </li>
          <li className="flex grow-1">
            <div className="mr-[10px] flex items-center">
              <Comment className="mr-[2px]" />
              {recruitCommentCount ?? "0"}
            </div>
            <div className="flex items-center">
              {isKeeps ? (
                <KeepItActive className="mr-[2px]" />
              ) : (
                <KeepIt className="mr-[2px]" />
              )}
              {recruitKeepCount ?? "0"}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RecruitBoard;
