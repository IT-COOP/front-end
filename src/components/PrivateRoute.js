import React from "react";
import { useQueryClient } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import useGetUserInfoQuery from "../hooks/useGetUserInfoQuery";

function PrivateRoute({ children }) {
  const client = useQueryClient();
  const userInfo = client.getQueryData(["userInfo", "currentUser"]);
  const { id: targetUserId } = useParams();

  const { data: currentUserData } = useGetUserInfoQuery(userInfo?.userId);

  const {
    isIdle: isCurrentUserPage,
    isLoading: isTargetUserDataLoading,
    isError,
    data: targetUserData,
  } = useGetUserInfoQuery(targetUserId, {
    enabled:
      currentUserData !== null && currentUserData?.userId !== targetUserId,
  });

  if (currentUserData === null || isError) {
    return <Navigate to="/" replace />;
  }

  if (isTargetUserDataLoading) {
    return null;
  }

  const {
    userId,
    nickname,
    portfolioUrl,
    profileImgUrl,
    selfIntroduction,
    technologyStack,
    userReputations2,
    projectCount,
  } = isCurrentUserPage ? currentUserData : targetUserData;

  const _stackAndTaskList = technologyStack.split(",").map(Number);
  const currentTask = _stackAndTaskList?.find(v => v % 10 === 0);
  const currentStackList = _stackAndTaskList?.filter(v => v % 10 !== 0);

  const childrenWithUserProperty = React.Children.map(children, child => {
    return React.cloneElement(child, {
      currentUserId: userId,
      nickname,
      portfolioUrl,
      profileImgUrl,
      selfIntroduction,
      userReputationList: userReputations2,
      task: currentTask,
      stackList: currentStackList,
      projectCount: projectCount,
      isCurrentUserPage,
    });
  });

  return childrenWithUserProperty;
}

export default PrivateRoute;
