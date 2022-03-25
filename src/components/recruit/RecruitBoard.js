import React from "react";
import classNames from "classnames";

import { KeepItActive, KeepIt, Comment } from "../../assets/icons";

import convertDateText from "../../lib/convertDateText";

import { Location, Stack } from "../../constants/enums";

function RecruitBoard({
  title,
  createdAt,
  updatedAt,
  thumbImgUrl,
  author,
  recruitCommentCount,
  recruitKeeps,
  recruitLocation,
  recruitTasks,
  recruitStacks,
  recruitKeepCount,
  recruitDurationWeeks,
}) {
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

  /**
   * TODO
   * 1. 유저의 아이디가 recruitKeeps에 있는지 판단 후, 있다면 아이콘 fill 채우고, 그렇지 않으면 transparent으로 두어야 함.
   */

  return (
    <>
      <div className="mb-[18px]">
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
          <p>{recruitDurationWeeks}주 예상</p>
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
            {parsedUpsertText} |{" "}
            {author ?? "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"}
          </li>
          <li className="flex grow-1">
            <div className="mr-[10px] flex items-center">
              <Comment className="mr-[2px]" />
              {recruitCommentCount ?? "0"}
            </div>
            <div className="flex items-center">
              {/* 조건부 렌더링 */}
              {true ? (
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
