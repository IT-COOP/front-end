import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import Title from "./views/Title";
import KeepItList from "./views/KeepItList";
import UserDetails from "./views/UserDetails";
import UserProjects from "./views/UserProjects";
import UserDashBoard from "./views/UserDashBoard";
import UserProfileSummary from "./views/UserProfileSummary";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";

function UserPage() {
  const navigate = useNavigate();
  const { isLoading, isError, data: { userInfo } = {} } = useGetUserInfoQuery();
  const { id } = useParams();
  const isCurrentUserPage = userInfo?.userId === id;

  console.log(userInfo);

  if (!Boolean(id) || isError) {
    navigate("/", { replace: true });
  }

  if (isLoading) {
    return null;
  }

  return (
    <section className="w-full min-h-screen bg-white3">
      <div className="w-[1224px] mx-auto">
        <Title isCurrentUserPage={isCurrentUserPage} />
        <div className="flex gap-[24px]">
          {/* 마이페이지 왼쪽 */}
          <UserProfileSummary isCurrentUser={isCurrentUserPage} userId={id} />
          <UserDashBoard>
            <UserDetails isCurrentUser={isCurrentUserPage} userId={id} />
            <UserProjects isCurrentUser={isCurrentUserPage} userId={id} />
            <KeepItList isCurrentUser={isCurrentUserPage} />
          </UserDashBoard>
        </div>
      </div>
    </section>
  );
}

export default UserPage;
