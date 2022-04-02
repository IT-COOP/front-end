import { useMutation } from "react-query";
import { applyApis } from "../apis/applyApi";

function useCompleteRecruitStartProjectMutation() {
  return useMutation(recruitId =>
    applyApis.completeRecruitStartProject(recruitId),
  );
}

export default useCompleteRecruitStartProjectMutation;
