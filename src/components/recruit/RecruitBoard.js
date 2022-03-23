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
  return (
    <>
      <div className="w-full mb-[18px] h-[198px] overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={`${
            thumbImgUrl
              ? thumbImgUrl
              : "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
          }`}
          alt="게시글 사진"
        />
      </div>
      <div className="p-x[18px] overflow-hidden text-[14px]">
        <p className="line-clamp-2 font-bold px-[20px] text-[18px] mb-[30px] ">
          {title}
        </p>
        <ul className="pl-[18px] ">
          <li className="flex mb-[6px] text-[#797979]">
            {Location[recruitLocation]}
            <span className="mx-[6px]">|</span>
            {recruitDurationWeeks}주 예상
          </li>
          <ul className="flex text-[12px] gap-[3%] overflow-x-scroll no-wrap scroll-bar-none">
            {recruitStacks.map(stack => (
              <li
                className={classNames(
                  "py-[4px] px-[10px] mb-[6px] rounded-[11px] shrink-0",
                  {
                    "bg-coral": 100 < stack.recruitStack < 200,
                    "bg-blue": 300 < stack.recruitStack < 400,
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
                  "py-[4px] mb-[6px] px-[10px] rounded-[11px] no-wrap shrink-0",
                  {
                    "bg-yellow": task.recruitTask === 200,
                    "bg-pink": task.recruitTask === 100,
                  },
                )}
                key={task.recruitTaskId}
              >
                {Task[task.recruitTask]}
              </li>
            ))}
          </ul>
        </ul>
        <ul className="flex justify-between px-[20px] text-[14px]">
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
