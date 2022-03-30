import React from "react";

import { Navigate, useParams } from "react-router-dom";

import Title from "./views/Title";
import KeepItList from "./views/KeepItList";
import UserDetails from "./views/UserDetails";
import UserProjects from "./views/UserProjects";
import UserDashBoard from "./views/UserDashBoard";
import UserProfileSummary from "./views/UserProfileSummary";

function UserPage({
  currentUserId,
  nickname,
  portfolioUrl,
  profileImgUrl,
  selfIntroduction,
  userReputationList,
  task,
  stackList,
}) {
  const { id } = useParams();
  const isCurrentUserPage = currentUserId === id;

  if (!Boolean(id)) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="w-full min-h-screen bg-white3">
      <div className="w-[1224px] mx-auto">
        <Title userId={id} isCurrentUserPage={isCurrentUserPage} />
        <div className="flex gap-[24px]">
          {/* 마이페이지 왼쪽 */}
          <UserProfileSummary
            profileImgUrl={profileImgUrl}
            nickname={nickname}
            stackList={stackList}
            task={task}
            userReputationList={userReputationList}
            isCurrentUser={isCurrentUserPage}
            userId={id}
          />
          <UserDashBoard>
            <UserDetails
              portfolioUrl={portfolioUrl}
              selfIntroduction={selfIntroduction}
            />
            <UserProjects isCurrentUserPage={isCurrentUserPage} userId={id} />
            <KeepItList isCurrentUserPage={isCurrentUserPage} />
          </UserDashBoard>
        </div>
      </div>
    </section>
  );
}

export default UserPage;
