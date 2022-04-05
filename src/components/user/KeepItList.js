import React, { useCallback } from "react";

import RecruitBoard from "../../components/recruit/RecruitBoard";
import useGetKeepItList from "../../hooks/useGetKeepItList";

function KeepItList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetKeepItList();

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

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-[34px] text-[17px] font-bold">
        내가 Keep It 한 게시물
      </h3>
      <ul className="flex overflow-hidden w-full mb-[20px] flex-wrap mx-auto  gap-x-[2%] gap-y-[24px] rounded-[8px]">
        {data?.pages?.map(({ posts }, pageIndex, { length: pagesLength }) => {
          return posts?.map((board, itemIndex, { length: itemLength }) => {
            const isTarget =
              pageIndex + 1 === pagesLength && itemIndex + 1 === itemLength;
            return (
              <li
                key={board.recruitPostId}
                ref={isTarget ? targetRef : null}
                className="flex flex-col overflow-hidden w-[32%] h-[396px] rounded-[11px] bg-white border-[1px] cursor-pointer shadow-md"
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
                  recruitDurationDays={board.recruitDurationDays}
                  recruitTasks={board.recruitTasks}
                  isKeeps={true}
                />
              </li>
            );
          });
        })}
      </ul>
    </div>
  );
}

export default KeepItList;
