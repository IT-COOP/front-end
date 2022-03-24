import React from "react";
import { Location, Task, Stack } from "../../constants/enums";
import { KeepIt, Comment } from "../../assets/icons";
import classNames from "classnames";
function RecruitBoard({
  title,
  createdAt,
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
  const filterTask = recruitTasks.filter(task => task.recruitTask <= 200);
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
      <div className="pl-[13px] pr-[14px] text-[14px]">
        <p className="line-clamp-2 font-bold text-[18px] mb-[14px]">{title}</p>
        <div className="flex items-center text-[13px]">
          <p className="mr-[15px]">{Location[recruitLocation]}</p>
          <p>{recruitDurationWeeks}주 예상</p>
        </div>
        <div className="mt-[14px] mb-[28px]">
          {isClosed ? (
            <p className="font-medium text-[15px] text-gray4">정원 마감</p>
          ) : (
            <ul className="flex gap-x-[5px] overflow-x-scroll no-wrap scroll-bar-none text-[13px] text-white font-medium">
              {recruitStacks.map(stack => (
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
              {filterTask.map(task => (
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
                  {Task[task.recruitTask] === 200 ? "디자인" : "기획"}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul className="flex justify-between text-[14px]">
          <li className="flex w-[62%] line-clamp-1">
            {createdAt}
            <span className="mx-[8px] text-[#797979]">|</span>
            {author}
          </li>
          <li className="flex">
            <div className="mr-[10px] flex items-center">
              <Comment className="mr-[2px]" />
              {recruitCommentCount}
            </div>
            <div className="flex items-center ">
              <KeepIt className="mr-[2px]" />
              {recruitKeepCount}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RecruitBoard;
