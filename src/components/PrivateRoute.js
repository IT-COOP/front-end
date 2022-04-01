import React from "react";

import { Navigate, useParams } from "react-router-dom";
import useGetUserInfoQuery from "../hooks/useGetUserInfoQuery";

function PrivateRoute({ children }) {
  const { id: targetUserId } = useParams();

  // 유저 정보: 객체 또는 null 또는 undefined
  const {
    isLoading: isBaseUserDataLoading,
    isSuccess: isBaseUserDataFetched,
    data: currentUserData,
  } = useGetUserInfoQuery(undefined);

  const {
    isIdle,
    isLoading: isTargetUserDataLoading,
    isError,
    data: targetUserData,
  } = useGetUserInfoQuery(targetUserId, {
    enabled: isBaseUserDataFetched && currentUserData?.userId !== targetUserId,
  });

  if (isBaseUserDataLoading || isTargetUserDataLoading) {
    return null;
  }

  if (currentUserData === null || isError) {
    return <Navigate to="/" replace />;
  }

  console.log(`isBaseUserFetched: ${isBaseUserDataFetched}`);
  console.log(`isCurrentUserData: ${currentUserData}`);
  console.log(`isTargetUserDataLoading: ${isTargetUserDataLoading}`);
  console.log(`isTargetUserIdle: ${isIdle}`);

  const {
    userId,
    nickname,
    portfolioUrl,
    profileImgUrl,
    selfIntroduction,
    technologyStack,
    userReputations2,
    projectCount,
  } = isIdle ? currentUserData : targetUserData;

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
      isCurrentUserPage: isIdle,
    });
  });

  return childrenWithUserProperty;
}

export default PrivateRoute;
