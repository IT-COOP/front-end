import { useMutation } from "react-query";
import { projectApis } from "../apis/projectApi";

function useCompleteRecruitStartProjectMutation() {
  return useMutation(recruitId =>
    projectApis.completeRecruitStartProject(recruitId),
  );
}

export default useCompleteRecruitStartProjectMutation;
