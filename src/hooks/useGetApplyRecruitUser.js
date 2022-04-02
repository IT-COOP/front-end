import { useQuery } from "react-query";
import { applyApis } from "../apis/applyApi";

function useGetApplyRecruitUser(recruitId) {
  return useQuery(["applyUser", recruitId], () =>
    applyApis.getApplyRecruitUser(recruitId),
  );
}

export default useGetApplyRecruitUser;
