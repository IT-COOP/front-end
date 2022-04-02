import React, { useState } from "react";

import RecruitBoard from "./RecruitBoard";
import RecruitCategoryBar from "./RecruitCategoryBar";
import RecruitFilterBar from "./RecruitFilterBar";
import useRecruitQuery from "../../hooks/useRecruitQuery";

function RecruitBoardList() {
  const [filter, setFilter] = useState({
    loc: "",
    task: "",
    stack: "",
    sort: 0,
    items: 12,
    over: 0,
  });

  const { data } = useRecruitQuery(filter);

  const handleFilterChange = newPayload => {
    setFilter(newPayload);
  };

  return (
    <div className="w-full">
      <RecruitCategoryBar
        config={filter}
        onCategorySelected={handleFilterChange}
      />
      <RecruitFilterBar
        currentSortNumber={filter.sort}
        currentStatusNumber={filter.over}
        onFilterChanged={handleFilterChange}
      />
      <ul className="flex overflow-hidden mb-[20px] flex-wrap w-[1224px] mx-auto  gap-x-[2%] gap-y-[24px] rounded-[8px]">
        {data?.map(board => {
          return (
            <li
              key={board.recruitPostId}
              className="flex flex-col overflow-hidden w-[23.5%] h-[396px] rounded-[11px] bg-white border-[1px] cursor-pointer shadow-md"
            >
              <RecruitBoard
                recruitPostId={board.recruitPostId}
                title={board.title}
                nickname={board.nickname}
                recruitContent={board.recruitContent}
                recruitKeepCount={board.recruitKeepCount}
                recruitCommentCount={board.recruitCommentCount}
                recruitLocation={board.recruitLocation}
                thumbImgUrl={board.thumbImgUrl} //이미지 정보 array
                createdAt={board.createdAt}
                recruitStacks={board.recruitStacks} //직군에 대한 array
                recruitDurationWeeks={board.recruitDurationWeeks}
                recruitTasks={board.recruitTasks}
                isKeeps={board.isKeeps}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecruitBoardList;
