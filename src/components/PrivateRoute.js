import React from "react";

import { Navigate, useParams } from "react-router-dom";
import useGetUserInfoQuery from "../hooks/useGetUserInfoQuery";

function PrivateRoute({ children }) {
  const { id: targetUserId } = useParams();

  const { isFetching: isBaseUserDataLoading, data: currentUserData } =
    useGetUserInfoQuery(undefined);

  const {
    isFetching: isTargetUserDataLoading,
    isError,
    data: targetUserData,
  } = useGetUserInfoQuery(targetUserId, {});

  if (isBaseUserDataLoading || isTargetUserDataLoading) {
    return null;
  }

  if (currentUserData === null || isError) {
    return <Navigate to="/recruit" replace />;
  }
  const isCurrentUserPage = targetUserData.userId === currentUserData.userId;

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
