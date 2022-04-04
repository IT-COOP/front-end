import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetOveredProjectListQuery(userId, isCurrentUserPage) {
  return useQuery(
    ["overedProjectList", isCurrentUserPage ? "currentUser" : userId],
    () => userApis.getOveredProjects(userId),
    { select: data => data.posts },
  );
}

export default useGetOveredProjectListQuery;
