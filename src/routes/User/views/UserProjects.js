import React, { useState } from "react";

import AppliedProjectList from "./AppliedProjectList";
import RunningProjectList from "./RunningProjectList";
import OveredProjectList from "./OveredProjectList";
import RecruitingProjectList from "./RecruitingProjectList";

import UserProjectCategoryList from "./UserProjectCategoryList";

function UserProjects({ isCurrentUserPage, userId }) {
  const [activeSlug, setActiveSlug] = useState(() =>
    isCurrentUserPage ? "applied" : "running",
  );

  const handleSlugChange = nextSlug => () => setActiveSlug(nextSlug);

  const headingText = isCurrentUserPage ? "나의 프로젝트" : "프로젝트";

  const componentBySlug = {
    applied: AppliedProjectList,
    recruiting: RecruitingProjectList,
    over: OveredProjectList,
    running: RunningProjectList,
  };

  const TargetList = componentBySlug[activeSlug];

  return (
    <div>
      <p className="text-[17px] mb-[29px] font-medium">{headingText}</p>
      <UserProjectCategoryList
        isCurrentUserPage={isCurrentUserPage}
        onCategorySelected={handleSlugChange}
        activeSlug={activeSlug}
      />
      <TargetList isCurrentUserPage={isCurrentUserPage} userId={userId} />
    </div>
  );
}

export default UserProjects;
