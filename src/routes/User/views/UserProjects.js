import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import CancelApplyTooltop from "./CancelApplyTooltip";

import { More } from "../../../assets/icons";

import useGetProjectsByEndpoint from "../../../hooks/useGetProjectsByEndpoint";

import convertDateText from "../../../lib/convertDateText";

const DEFAULT_TAB_LIST = [
  { slug: "running", name: "진행중", max: 1 },
  { slug: "applied", name: "신청중", max: 1 },
  { slug: "recruiting", name: "모집중", max: 1 },
  { slug: "over", name: "진행완료", max: 220 },
];

function UserProjects({ isCurrentUserPage, userId }) {
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const navigate = useNavigate();

  const tabList = isCurrentUserPage
    ? DEFAULT_TAB_LIST
    : DEFAULT_TAB_LIST.filter(v => v.name !== "신청중");

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClicks = index => () => setActiveIndex(index);
  const headingText = isCurrentUserPage ? "나의 프로젝트" : "프로젝트";
  const moveToRecruitDetailPage = id => () => navigate(`/recruit/${id}`);

  const { data: projectList, isLoading } = useGetProjectsByEndpoint({
    slug: tabList[activeIndex].slug,
    userId,
  });

  if (isLoading) {
    return <div className="w-full h-[218px] bg-white2 animate-pulse" />;
  }

  return (
    <div>
      <p className="text-[17px] mb-[29px] font-medium">{headingText}</p>
      <ul className="flex w-full">
        {tabList.map(({ name }, index) => {
          return (
            <li
              key={name}
              onClick={handleTabClicks(index)}
              className={classNames(
                "flex-1 text-center text-[17px] pb-[9px] cursor-pointer flex justify-center",
                {
                  "border-b-[5px] border-black": index === activeIndex,
                },
              )}
            >
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
      {projectList.length === 0 ? (
        <div className="h-[109px] mb-[42px] flex items-center justify-center border-b border-b-gray2">
          <p className="text-[15px] text-gray3">
            아직 {DEFAULT_TAB_LIST[activeIndex]["name"]}
            {activeIndex === 3 ? "된" : "인"} 프로젝트가 없습니다
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-[45px] mb-[42px]">
            {projectList?.slice(0, 1).map(post => {
              const { createdAt, updatedAt, recruitApplies = [] } = post;

              const lastUpsertedDate =
                !updatedAt || createdAt === updatedAt ? createdAt : updatedAt;
              const parsedUpsertText = convertDateText(lastUpsertedDate);

              return (
                <li
                  key={post.recruitPostId}
                  className={classNames(
                    "text-[15px] mb-[45px] last:mb-0  border-b border-b-gray2",
                    {
                      "flex justify-between": recruitApplies.length === 1,
                    },
                  )}
                >
                  <div>
                    <div
                      onClick={moveToRecruitDetailPage(post.recruitPostId)}
                      className="flex items-center"
                    >
                      <span className="inline-block mr-[3px]">
                        {post.title}
                      </span>
                      <More />
                    </div>
                    <span className="block mt-[25px] text-[14px] text-gray4">
                      {parsedUpsertText} | {post.author2.nickname}
                    </span>
                  </div>
                  {DEFAULT_TAB_LIST[activeIndex].name === "모집중" &&
                    projectList?.length > 0 && (
                      <div
                        onMouseEnter={() => setIsTooltipHovered(true)}
                        className="pl-[4px] mt-[8px] mb-[31px] flex gap-x-[6px] items-center w-max relative"
                      >
                        <div>
                          {recruitApplies?.map(information => (
                            <img
                              className="w-[25px] h-[25px] rounded-full inline-block mr-[3px]"
                              src={information?.applicant2.profileImgUrl}
                              alt={`${information?.applicant2.nickname}'s profile`}
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
                            "absolute h-auto top-[125%] left-1/4 w-max bg-white flex justify-center items-center border border-gray5 rounded-[9px]",
                            {
                              hidden: !isTooltipHovered,
                              block: isTooltipHovered,
                            },
                          )}
                        >
                          <div className="absolute bottom-full border-[5px] border-b-[10px] border-t-transparent border-r-transparent border-b-white border-l-transparent z-10"></div>
                          <div className="absolute bottom-[100%] border-[6px] border-b-[12px] border-t-transparent border-r-transparent border-b-gray5 border-l-transparent"></div>
                          <ul>
                            {recruitApplies.map(
                              (information, index, { length }) => {
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
                                          {convertDateText(
                                            information.createdAt,
                                          )}
                                        </span>
                                      </div>
                                    </li>
                                    {index + 1 === length ? null : (
                                      <div className="w-auto mx-[7px] h-px bg-gray3" />
                                    )}
                                  </React.Fragment>
                                );
                              },
                            )}
                            <li
                              role="button"
                              className="h-[67px] w-[101%] relative -left-[0.5%] -bottom-[0.5%] flex justify-center items-center bg-blue3 text-white text-[17px] font-bold rounded-b-[8px]"
                            >
                              신청자 명단 보러가기
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  {DEFAULT_TAB_LIST[activeIndex].name === "신청중" &&
                    recruitApplies?.length > 0 && (
                      <CancelApplyTooltop info={recruitApplies[0]} />
                    )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserProjects;
