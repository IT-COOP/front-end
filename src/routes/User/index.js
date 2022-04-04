import React from "react";

import { Navigate, useParams } from "react-router-dom";

import Title from "../../components/user/Title";
import KeepItList from "../../components/user/KeepItList";
import UserDetails from "../../components/user/UserDetails";
import UserProjects from "../../components/user/UserProjects";
import ProjectCount from "../../components/user/ProjectCount";
import UserDashBoard from "../../components/user/UserDashBoard";
import UserProfileSummary from "../../components/user/UserProfileSummary";
import ScrollTopButton from "../../components/user/ScrollTopButton";
import RunningProjectSummary from "../../components/user/RunningProjectSummary";

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
