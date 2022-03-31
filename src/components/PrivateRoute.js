import React from "react";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import useGetUserInfoQuery from "../hooks/useGetUserInfoQuery";

function PrivateRoute({ children }) {
  const client = useQueryClient();
  const userInfo = client.getQueryData(["userInfo", "currentUser"]);

  const {
    isLoading,
    isError,
    data = {},
  } = useGetUserInfoQuery(undefined, {
    enabled: userInfo === undefined,
  });

  if (isLoading) {
    return null;
  }

  if (isError) {
    alert("알 수 없는 에러가 발생하였습니다.");
    return <Navigate to="/" replace />;
  }

  const {
    nickname,
    portfolioUrl,
    profileImgUrl,
    selfIntroduction,
    technologyStack,
    userReputations2,
  } = data;

  const _stackAndTaskList = technologyStack.split(",").map(Number);
  const currentTask = _stackAndTaskList?.find(v => v % 10 === 0);
  const currentStackList = _stackAndTaskList?.filter(v => v % 10 !== 0);

  const childrenWithUserProperty = React.Children.map(children, child => {
    return React.cloneElement(child, {
      currentUserId: data.userId,
      nickname,
      portfolioUrl,
      profileImgUrl,
      selfIntroduction,
      userReputationList: userReputations2,
      task: currentTask,
      stackList: currentStackList,
    });
  });

  return childrenWithUserProperty;
}

export default PrivateRoute;
