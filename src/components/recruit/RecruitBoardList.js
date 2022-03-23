import React, { useState } from "react";

import RecruitBoard from "./RecruitBoard";
import RecruitCategoryBar from "./RecruitCategoryBar";
import RecruitFilterBar from "./RecruitFilterBar";
import useRecruitQuery from "../../hooks/useRecruitQuery";

function RecruitBoardList() {
  const [filter, setFilter] = useState();
  const { data } = useRecruitQuery(filter);

  const handleFilter = filter => {
    setFilter(filter);
  };

  const handleCategory = category => {
    console.log(category);
  };

  return (
    <div className="w-full">
      <RecruitCategoryBar handleCategory={handleCategory} />
      <RecruitFilterBar handleFilter={handleFilter} />
      <ul className="flex overflow-hidden mb-[20px] flex-wrap w-[1224px] mx-auto  gap-x-[2%] gap-y-[24px] rounded-[8px]">
        {data?.map(board => (
          <li
            key={board.recruitPostId}
            className="flex flex-col overflow-hidden w-[23.5%] h-[396px] rounded-[11px] bg-white border-[1px] cursor-pointer shadow-md"
          >
            <RecruitBoard
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
    </div>
  );
}

export default RecruitBoardList;
