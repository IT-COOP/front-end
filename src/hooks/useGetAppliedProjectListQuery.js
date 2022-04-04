import { useQuery } from "react-query";
import { userApis } from "../apis/userApi";

function useGetAppliedProjectListQuery() {
  return useQuery(
    ["appliedProjectList", "currentUser"],
    userApis.getAppliedProjects,
    { select: data => data.posts },
  );
}

export default useGetAppliedProjectListQuery;
