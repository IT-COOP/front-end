import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useCompleteWriteMutation() {
  return useMutation(data => {
    return recruitApis.addRecruitBoard(data);
  });
}

export default useCompleteWriteMutation;
