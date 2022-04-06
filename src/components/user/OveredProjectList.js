import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useGetOveredProjectListQuery from "../../hooks/useGetOveredProjectListQuery";

import { More } from "../../assets/icons";

import convertDateText from "../../lib/convertDateText";

function OveredProjectList({ isCurrentUserPage, userId }) {
  const { isLoading, data: list } = useGetOveredProjectListQuery(
    userId,
    isCurrentUserPage,
  );

  console.log(list);

  const navigate = useNavigate();
  const moveToRecruitDetailPage = id => () => navigate(`/recruit/${id}`);

  if (isLoading) {
    return <div className="w-full h-[218px] bg-white2 animate-pulse" />;
  }

  return (
    <ul className="mt-[45px] mb-[42px]">
      {list.length > 0 ? (
        list.map(post => {
          const { createdAt, updatedAt } = post;
          const lastUpsertedDate =
            !updatedAt || createdAt === updatedAt ? createdAt : updatedAt;
          const parsedUpsertText = convertDateText(lastUpsertedDate);

          return (
            <li
              key={post.recruitPostId}
              className={classNames(
                "text-[15px] mb-[45px] last:mb-0  border-b border-b-gray2 flex justify-between items-end",
              )}
            >
              <div className="mb-[38px] flex-1 ">
                <div
                  onClick={moveToRecruitDetailPage(post.recruitPostId)}
                  className="flex items-center cursor-pointer"
                >
                  <span className="inline-block mr-[3px]">{post.title}</span>
                  <More />
                </div>
                <span className="block mt-[25px] text-[14px] text-gray4">
                  {parsedUpsertText} | {post.author2.nickname}
                </span>
              </div>
              <button className="text-white bg-blue px-[10px] py-[6px]">
                팀원 리뷰
              </button>
            </li>
          );
        })
      ) : (
        <div className="h-[109px] mb-[42px] flex items-center justify-center border-b border-b-gray2">
          <p className="text-[15px] text-gray3">
            아직 진행완료된 프로젝트가 없습니다.
          </p>
        </div>
      )}
    </ul>
  );
}

export default OveredProjectList;
