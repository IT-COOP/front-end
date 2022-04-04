import React from "react";

import UserCard from "./UserCard";

const AppliedUserList = ({ user, isAccepted, recruitId }) => {
  return (
    <>
      {user?.map(user => (
        <UserCard
          key={user.recruitApplyId}
          userTask={user.A_task}
          userProfileImgUrl={user.applicant2.U_profileImgUrl}
          userNickname={user.applicant2.nickname}
          applyMessage={user.applyMessage}
          collaborationCount={user.applicant2.chatMembers.length}
          collaborationRate={user.applicant2.userReputations2}
          isAccepted={isAccepted}
          userId={user.applicant2.userId}
          recruitId={recruitId}
        />
      ))}
    </>
  );
};

export default AppliedUserList;
