import React from "react";

import { Navigate, useParams } from "react-router-dom";

import Title from "./views/Title";
import KeepItList from "./views/KeepItList";
import UserDetails from "./views/UserDetails";
import UserProjects from "./views/UserProjects";
import ProjectCount from "./views/ProjectCount";
import UserDashBoard from "./views/UserDashBoard";
import UserProfileSummary from "./views/UserProfileSummary";
import ScrollTopButton from "./views/ScrollTopButton";
import RunningProjectSummary from "./views/RunningProjectSummary";

function UserPage({
  currentUserId,
  nickname,
  portfolioUrl,
  profileImgUrl,
  selfIntroduction,
  userReputationList,
  task,
  stackList,
  projectCount,
  isCurrentUserPage,
}) {
  const { id } = useParams();

  if (!Boolean(id)) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="w-full min-h-screen bg-white3">
      <div className="w-[1224px] mx-auto relative">
        <Title userId={id} isCurrentUserPage={isCurrentUserPage} />
        <div className="flex gap-[24px]">
          <UserProfileSummary
            profileImgUrl={profileImgUrl}
            nickname={nickname}
            stackList={stackList}
            task={task}
            userReputationList={userReputationList}
            isCurrentUser={isCurrentUserPage}
            userId={id}
            currentProjectList={
              isCurrentUserPage ? (
                <RunningProjectSummary userId={currentUserId} />
              ) : null
            }
          >
            <ProjectCount
              projectCount={projectCount}
              isCurrentUserPage={isCurrentUserPage}
            />
          </UserProfileSummary>
          <UserDashBoard>
            <UserDetails
              portfolioUrl={portfolioUrl}
              selfIntroduction={selfIntroduction}
            />
            <UserProjects isCurrentUserPage={isCurrentUserPage} userId={id} />
            {isCurrentUserPage ? <KeepItList /> : null}
          </UserDashBoard>
        </div>
      </div>
      <ScrollTopButton />
    </section>
  );
}

export default UserPage;
