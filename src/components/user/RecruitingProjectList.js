import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { More } from "../../assets/icons";

import useGetRecruitingProjectListQuery from "../../hooks/useGetRecruitingProjectListQuery";

import convertDateText from "../../lib/convertDateText";

function RecruitingProjectList({ isCurrentUserPage, userId }) {
  const { isLoading, data: list } = useGetRecruitingProjectListQuery(
    userId,
    isCurrentUserPage,
  );

  const navigate = useNavigate();
  const moveToRecruitDetailPage = id => () => navigate(`/recruit/${id}`);
  const handleMoreButtonClick = postId => e => {
    e.stopPropagation();
    navigate(`/apply/${postId}`);
  };

  if (isLoading) {
    return <div className="w-full h-[218px] bg-white2 animate-pulse" />;
  }

  return (
    <ul className="mt-[45px] mb-[42px]">
      {list.length > 0 ? (
        list.map(post => {
          const {
            recruitPostId,
            createdAt,
            updatedAt,
            recruitApplies = [],
          } = post;
          const lastUpsertedDate =
            !updatedAt || createdAt === updatedAt ? createdAt : updatedAt;
          const parsedUpsertText = convertDateText(lastUpsertedDate);

          return (
            <li
              key={recruitPostId}
              className={classNames(
                "text-[15px] mb-[45px] last:mb-0  border-b border-b-gray2",
              )}
            >
              <div
                className={classNames({
                  "mb-[38px]": recruitApplies.length === 0,
                })}
              >
                <div
                  onClick={moveToRecruitDetailPage(post.recruitPostId)}
                  className="flex items-center cursor-pointer"
                >
                  <span className="inline-block mr-[3px]">{post.title}</span>
                  <More />
                </div>
                <span className="block mt-[25px] mb-[14px] text-[14px] text-gray4">
                  {parsedUpsertText} | {post.author2.nickname}
                </span>
              </div>
              {!isCurrentUserPage || recruitApplies.length === 0 ? null : (
                <div className="pb-[20px] flex justify-between">
                  <div className="pl-[4px] mt-[8px] mb-[6px] flex gap-x-[6px] items-center w-max ">
                    <div>
                      {recruitApplies?.map(information => (
                        <img
                          className="w-[25px] h-[25px] rounded-full inline-block mr-[3px]"
                          src={information?.applicant2?.profileImgUrl}
                          alt={`${information?.applicant2?.nickname}'s profile`}
                          key={information?.applicant}
                        />
                      ))}
                    </div>
                    <div className="text-[15px]">
                      <span className="text-blue3">
                        {recruitApplies?.length}명
                      </span>
                      <span>의 신청자가 있어요!</span>
                    </div>
                  </div>
                  <button
                    onClick={handleMoreButtonClick(recruitPostId)}
                    className="text-white bg-blue px-[10px] py-[6px] rounded-[10px]"
                  >
                    신청자 명단 보러가기
                  </button>
                </div>
              )}
            </li>
          );
        })
      ) : (
        <div className="h-[109px] mb-[42px] flex items-center justify-center border-b border-b-gray2">
          <p className="text-[15px] text-gray3">
            아직 모집중인 프로젝트가 없습니다.
          </p>
        </div>
      )}
    </ul>
  );
}

export default RecruitingProjectList;
