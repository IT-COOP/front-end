import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useCancelApplyRecruitMutation() {
  return useMutation(cancelApply =>
    recruitApis.cancelApplyRecruit(cancelApply),
  );
}

export default useCancelApplyRecruitMutation;
