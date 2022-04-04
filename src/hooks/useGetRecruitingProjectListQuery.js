import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetRecruitingProjectListQuery(userId, isCurrentUserPage = true) {
  return useQuery(
    ["recruitingProjectList", isCurrentUserPage ? "currentUser" : userId],
    userApis.getRecruitingProjects(userId),
    { select: data => data.posts },
  );
}

export default useGetRecruitingProjectListQuery;
