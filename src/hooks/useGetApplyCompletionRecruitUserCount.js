import { useQuery } from "react-query";
import { applyApis } from "../apis/applyApi";

function useGetApplyCompletionRecruitUserCount(recruitId) {
  return useQuery(["applyCompletionUser", recruitId], () =>
    applyApis.getApplyCompletionRecruitUserCount(recruitId),
  );
}

export default useGetApplyCompletionRecruitUserCount;
