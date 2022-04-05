import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useApplyRecruitMutation() {
  return useMutation(applyData => recruitApis.applyRecruit(applyData));
}

export default useApplyRecruitMutation;
