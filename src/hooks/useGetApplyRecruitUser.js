import { useQuery } from "react-query";
import { applyApis } from "../apis/applyApi";

function useGetApplyRecruitUser({ recruitId, isAccepted }) {
  return useQuery(["applyUser", recruitId, isAccepted], () => {
    if (recruitId) {
      return applyApis.getApplyRecruitUser(recruitId, isAccepted);
    }
  });
}

export default useGetApplyRecruitUser;
