import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { More } from "../../../assets/icons";
import useGetProjectsByEndpoint from "../../../hooks/useGetProjectsByEndpoint";
import convertDateText from "../../../lib/convertDateText";

const DEFAULT_TAB_LIST = [
  { slug: "running", name: "진행중", max: 3 },
  { slug: "applied", name: "신청중", max: 3 },
  { slug: "recruiting", name: "모집중", max: 1 },
  { slug: "over", name: "진행완료", max: 3 },
];

function UserProjects({ isCurrentUser, userId }) {
  const navigate = useNavigate();
  const tabList = isCurrentUser
    ? DEFAULT_TAB_LIST
    : DEFAULT_TAB_LIST.filter(v => v.name !== "신청중");

  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabClicks = index => () => setActiveIndex(index);
  const headingText = isCurrentUser ? "나의 프로젝트" : "프로젝트";

  const { data: projectList } = useGetProjectsByEndpoint({
    slug: tabList[activeIndex].slug,
    isCurrentUser,
    userId,
  });

  return (
    <div>
      <p className="text-[17px] mb-[29px] font-medium">{headingText}</p>
      <ul className="flex w-full">
        {tabList.map(({ name }, index) => (
          <li
            onClick={handleTabClicks(index)}
            key={name}
            className={classNames(
              "flex-1 text-center text-[17px] pb-[9px] cursor-pointer",
              {
                "border-b-[5px] border-black": index === activeIndex,
              },
            )}
          >
            {name}
          </li>
        ))}
      </ul>
      <ul className="mt-[45px] mb-[38px]">
        {/* projectList 고치기 */}
        {projectList?.slice(0, tabList[activeIndex].max + 1).map(post => {
          const { createdAt, updatedAt } = post;
          const lastUpsertedDate =
            !updatedAt || createdAt === updatedAt ? createdAt : updatedAt;

          const parsedUpsertText = convertDateText(lastUpsertedDate);
          return (
            <li
              onClick={() => navigate(`/recruit/${post.recruitPostId}`)}
              key={post.recruitPostId}
              className="text-[15px] mb-[38px] cursor-pointer"
            >
              <div className="flex items-center">
                <span className="inline-block mr-[3px]">{post.title}</span>
                <More />
              </div>
              <span className="block mt-[25px] text-[14px] text-gray4">
                {parsedUpsertText} | {post.author2.nickname}
              </span>
            </li>
          );
        })}
      </ul>
      <hr className="border-gray2 mb-[42px]" />
    </div>
  );
}

export default UserProjects;
