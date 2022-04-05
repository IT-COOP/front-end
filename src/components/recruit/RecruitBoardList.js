import React, { useState, useCallback } from "react";

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRecruitQuery(filter);

  const handleFilterChange = newPayload => {
    setFilter(newPayload);
  };

  const targetRef = useCallback(
    node => {
      if (!node) {
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            observer.unobserve(entry.target);
          }
        },
        { root: null, threshold: 0 },
      );
      observer.observe(node);
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage],
  );

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
        {data?.pages?.map(({ posts }, pageIndex, { length: pagesLength }) => {
          return posts?.map((board, BoardIndex, { length: boardLength }) => {
            const isTarget =
              pageIndex + 1 === pagesLength && BoardIndex + 1 === boardLength;
            return (
              <li
                key={board.recruitPostId}
                className="flex flex-col overflow-hidden w-[23.5%] h-[396px] rounded-[11px] bg-white border-[1px] cursor-pointer shadow-md"
                ref={isTarget ? targetRef : null}
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
          });
        })}
      </ul>
    </div>
  );
}

export default RecruitBoardList;
