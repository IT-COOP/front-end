import React from "react";
import { useNavigate } from "react-router-dom";
import RecruitBoard from "../../../components/recruit/RecruitBoard";
import useGetKeepItList from "../../../hooks/useGetKeepItList";

function KeepItList({ isCurrentUser }) {
  const navigate = useNavigate();
  const { data, isIdle, isLoading } = useGetKeepItList({
    enabled: isCurrentUser,
  });

  console.log(data);

  if (isIdle || isLoading) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-[34px] text-[17px] font-bold">
        내가 Keep It 한 게시물
      </h3>
      <ul className="flex overflow-hidden w-full mb-[20px] flex-wrap mx-auto  gap-x-[2%] gap-y-[24px] rounded-[8px]">
        {data?.map(board => (
          <li
            key={board.recruitPostId}
            onClick={() => navigate(`/recruit/${board.recruitPostId}`)}
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeepItList;
