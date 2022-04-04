import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { More } from "../../assets/icons";

import useGetRecruitingProjectListQuery from "../../hooks/useGetRecruitingProjectListQuery";

import convertDateText from "../../lib/convertDateText";

function RecruitingProjectList({ isCurrentUserPage, userId }) {
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
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
                <div
                  onMouseEnter={() => setIsTooltipHovered(true)}
                  className="pl-[4px] mt-[8px] mb-[31px] flex gap-x-[6px] items-center w-max relative cursor-pointer"
                >
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
                  <div
                    onMouseLeave={() => setIsTooltipHovered(false)}
                    className={classNames(
                      "absolute h-auto top-[125%] left-1/4 w-max bg-white flex justify-center items-center border border-gray5 rounded-[9px] z-50",
                      {
                        hidden: !isTooltipHovered,
                        block: isTooltipHovered,
                      },
                    )}
                  >
                    <div className="absolute bottom-full border-[5px] border-b-[10px] border-t-transparent border-r-transparent border-b-white border-l-transparent z-10"></div>
                    <div className="absolute bottom-[100%] border-[6px] border-b-[12px] border-t-transparent border-r-transparent border-b-gray5 border-l-transparent"></div>
                    <ul>
                      {recruitApplies.map((information, index, { length }) => {
                        const handleNameClick = e => {
                          e.stopPropagation();
                          navigate(`/user/${information.applicant}`);
                        };

                        return (
                          <React.Fragment key={information.applicant}>
                            <li className="px-[20px] py-[13px] my-[9px] min-h-[66px]">
                              <div>
                                <div
                                  onClick={handleNameClick}
                                  className="text-[15px] mb-[5px] cursor-pointer"
                                >
                                  <span className="underline text-blue3">
                                    {information.applicant2.nickname}
                                  </span>
                                  <span> 님이 신청했어요</span>
                                </div>
                                <span className="text-[13px] text-gray4">
                                  {convertDateText(information.createdAt)}
                                </span>
                              </div>
                            </li>
                            {index + 1 === length ? null : (
                              <div className="w-auto mx-[7px] h-px bg-gray3" />
                            )}
                          </React.Fragment>
                        );
                      })}
                      <li
                        role="button"
                        onClick={handleMoreButtonClick(recruitPostId)}
                        className="h-[67px] w-[101%] relative -left-[0.5%] -bottom-[0.5%] flex justify-center items-center bg-blue3 text-white text-[17px] font-bold rounded-b-[8px]"
                      >
                        신청자 명단 보러가기
                      </li>
                    </ul>
                  </div>
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
