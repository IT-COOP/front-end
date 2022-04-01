import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import CancelApplyTooltop from "./CancelApplyTooltip";

import {
  More,
  OverProject,
  RecruitingProject,
  RunningProject,
  AppliedProject,
} from "../../../assets/icons";

import useGetProjectsByEndpoint from "../../../hooks/useGetProjectsByEndpoint";

import convertDateText from "../../../lib/convertDateText";

const DEFAULT_TAB_LIST = [
  { slug: "running", name: "진행중", max: 1 },
  { slug: "applied", name: "신청중", max: 1 },
  { slug: "recruiting", name: "모집중", max: 1 },
  { slug: "over", name: "진행완료", max: 220 },
];

const IconCollectionByName = {
  진행중: RunningProject,
  신청중: AppliedProject,
  모집중: RecruitingProject,
  진행완료: OverProject,
};

function UserProjects({ isCurrentUserPage, userId }) {
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
          const Icon = IconCollectionByName[name];
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
              <Icon className={"ml-[5px] relative top-[1px]"} />
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
              const [applyInformation] = recruitApplies;

              return (
                <li
                  onClick={moveToRecruitDetailPage(post.recruitPostId)}
                  key={post.recruitPostId}
                  className={classNames(
                    "text-[15px] mb-[45px] last:mb-0 cursor-pointer border-b border-b-gray2 h-[100px]",
                    {
                      "flex justify-between": applyInformation !== undefined,
                    },
                  )}
                >
                  <div>
                    <div className="flex items-center">
                      <span className="inline-block mr-[3px]">
                        {post.title}
                      </span>
                      <More />
                    </div>
                    <span className="block mt-[25px] text-[14px] text-gray4">
                      {parsedUpsertText} | {post.author2.nickname}
                    </span>
                  </div>
                  {Boolean(applyInformation) && (
                    <CancelApplyTooltop info={applyInformation} />
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
