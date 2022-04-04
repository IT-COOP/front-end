import { userApis } from "../apis/userApi";
import { useQuery } from "react-query";

function useGetRunningProjectListQuery(userId, isCurrentUserPage) {
  return useQuery(
    ["runningProjectList", isCurrentUserPage ? "currentUser" : userId],
    userApis.getRunningProjects(userId),
    {
      select: data => data.posts,
    },
  );
}

export default useGetRunningProjectListQuery;
