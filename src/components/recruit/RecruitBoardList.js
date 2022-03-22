import React from "react";
import RecruitBoard from "./RecruitBoard";
import { useGetRecruit } from "../../hooks/useRecruitQuery";

function RecruitBoardList() {
  const { data, isFetching } = useGetRecruit();
  console.log(data);
  return (
    <ul className="flex overflow-hidden mb-[20px] flex-wrap w-full px-4 xl:px-[0] gap-x-[2%] gap-y-[24px] rounded-[8px]">
      {!isFetching &&
        data.map(board => (
          <li className="flex flex-col overflow-hidden w-[23.5%] h-[396px] rounded-[11px] bg-[#EBEBEB] cursor-pointer">
            <RecruitBoard
              key={board.recruitPostId}
              recruitPostId={board.recruitPostId}
              title={board.title}
              author={board.author}
              recruitContent={board.recruitContent}
              recruitKeepCount={board.recruitKeepCount}
              recruitCommentCount={board.recruitCommentCount}
              recruitLocation={board.recruitLocation}
              thumbImgUrl={board.thumbImgUrl} //이미지 정보 array
              createdAt={board.createdAt}
              recruitKeeps={board.recruitKeeps} //누가 추가했는지 user의 id값이 담긴 array
              recruitStacks={board.recruitStacks} //직군에 대한 array
              recruitDurationWeeks={board.recruitDurationWeeks}
              recruitTasks={board.recruitTasks}
            />
          </li>
        ))}
    </ul>
  );
}

export default RecruitBoardList;
