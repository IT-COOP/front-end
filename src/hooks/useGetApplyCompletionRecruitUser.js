import { useQuery } from "react-query";
import { applyApis } from "../apis/applyApi";

function useGetApplyCompletionRecruitUser(recruitId) {
  return useQuery(["applyCompletionUser", recruitId], () =>
    applyApis.getApplyCompletionRecruitUser(recruitId),
  );
}

export default useGetApplyCompletionRecruitUser;
